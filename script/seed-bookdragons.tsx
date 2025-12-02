// scripts/import-books-from-csv.ts
import { getPayload } from 'payload'
import path from 'path'
import fs from 'fs'
import csv from 'csv-parser'
import dotenv from 'dotenv'
import https from 'https'
import http from 'http'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

interface CSVBook {
  title: string
  author: string
  price: string
  description?: string
  signed?: string
  binding?: string
  language?: string
  genre?: string
  isbn?: string
  publishedYear?: string
  condition?: string
  stock?: string
  imageUrl?: string
}

async function importBooksFromCSV() {
  console.log('📚 Starter import av bøker fra CSV fil...')

  try {
    // Initialiser Payload
    const configPromise = import('../src/payload.config.js')
    const { default: config } = await configPromise
    const payload = await getPayload({ config })

    console.log('✅ Payload initialisert')

    // Definer CSV-filbane (endre denne til din filbane)
    const csvFilePath = path.resolve(__dirname, '../data/books.csv')

    if (!fs.existsSync(csvFilePath)) {
      console.error(`❌ CSV-fil ikke funnet: ${csvFilePath}`)
      console.log('📝 Opprett en CSV-fil med denne strukturen:')
      console.log(`
        title,author,price,description,signed,binding,language,genre,isbn,publishedYear,condition,stock
        "Snømannen","Jo Nesbø",199,"En krimroman...","unsigned","pocket","norwegian","crime","9788203190195",2007,"very-good",8
        "Harry Potter og De vises stein","J.K. Rowling",249,"Fantasy-bok...","signed","hardcover","norwegian","fantasy",9788202401239,1997,"like-new",12
      `)
      process.exit(1)
    }

    console.log(`📂 Leser CSV-fil: ${csvFilePath}`)

    const books: CSVBook[] = []

    // Les CSV-filen
    await new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data: CSVBook) => {
          books.push(data)
        })
        .on('end', () => {
          console.log(`📊 Fant ${books.length} bøker i CSV-filen`)
          resolve(books)
        })
        .on('error', (error) => {
          reject(error)
        })
    })

    // Mapp genre fra CSV til dine valg
    const genreMapping: Record<string, string> = {
      Skjønnlitteratur: 'fiction',
      Krim: 'crime',
      Fantasy: 'fantasy',
      'Sci-Fi': 'scifi',
      'Science Fiction': 'scifi',
      Romantikk: 'romance',
      Thriller: 'thriller',
      Biografi: 'biography',
      Historie: 'history',
      Barn: 'children',
      Ungdom: 'youth',
    }

    // Mapp tilstand fra CSV til dine valg
    const conditionMapping: Record<string, string> = {
      'Som ny': 'like-new',
      'Meget god': 'very-good',
      God: 'good',
      Akseptabel: 'acceptable',
      Bra: 'good',
      Ok: 'acceptable',
    }

    // Mapp språk
    const languageMapping: Record<string, string> = {
      Norsk: 'norwegian',
      Norwegian: 'norwegian',
      Engelsk: 'english',
      English: 'english',
      Annet: 'other',
      Other: 'other',
    }

    // Mapp innbinding
    const bindingMapping: Record<string, string> = {
      Pocket: 'pocket',
      Innbundet: 'hardcover',
      Hardcover: 'hardcover',
      Lydbok: 'audiobook',
      Audiobook: 'audiobook',
      'E-bok': 'ebook',
      Ebook: 'ebook',
    }

    // Mapp signert
    const signedMapping: Record<string, string> = {
      Signert: 'signed',
      Signed: 'signed',
      Usignert: 'unsigned',
      Unsigned: 'unsigned',
      Ja: 'signed',
      Yes: 'signed',
      Nei: 'unsigned',
      No: 'unsigned',
    }

    let booksCreated = 0
    let booksUpdated = 0
    let booksSkipped = 0
    let booksFailed = 0

    // Prosesser hver bok
    for (let i = 0; i < books.length; i++) {
      const csvBook = books[i]

      try {
        console.log(`\n📖 Prosesserer bok ${i + 1}/${books.length}: ${csvBook.title}`)

        // Forbered data for Payload
        const bookData: any = {
          title: csvBook.title.trim(),
          author: csvBook.author.trim(),
          price: parseFloat(csvBook.price) || 0,
          stock: parseInt(csvBook.stock || '1') || 1,
        }

        // Legg til valgfrie felt hvis de finnes
        if (csvBook.description) bookData.description = csvBook.description.trim()
        if (csvBook.isbn) bookData.isbn = csvBook.isbn.trim()
        if (csvBook.publishedYear) bookData.publishedYear = parseInt(csvBook.publishedYear)

        // Mapp enum-verdier
        if (csvBook.signed) {
          bookData.signed = signedMapping[csvBook.signed] || 'unsigned'
        }

        if (csvBook.binding) {
          bookData.binding = bindingMapping[csvBook.binding] || 'pocket'
        }

        if (csvBook.language) {
          bookData.language = languageMapping[csvBook.language] || 'norwegian'
        }

        if (csvBook.condition) {
          bookData.condition = conditionMapping[csvBook.condition] || 'good'
        }

        // Håndter genre (kan være flere, separert med komma)
        if (csvBook.genre) {
          const genreStrings = csvBook.genre.split(',').map((g) => g.trim())
          const genreValues = genreStrings
            .map((g) => genreMapping[g])
            .filter((g) => g !== undefined)

          if (genreValues.length > 0) {
            bookData.genre = genreValues
          }
        }

        // Håndter bilde fra URL
        if (csvBook.imageUrl) {
          try {
            console.log(`   🖼️  Laster ned bilde fra: ${csvBook.imageUrl}`)

            const imageBuffer = await new Promise<Buffer>((resolve, reject) => {
              const client = csvBook.imageUrl!.startsWith('https') ? https : http
              client
                .get(csvBook.imageUrl!, (res) => {
                  const chunks: Buffer[] = []
                  res.on('data', (chunk) => chunks.push(chunk))
                  res.on('end', () => resolve(Buffer.concat(chunks)))
                  res.on('error', reject)
                })
                .on('error', reject)
            })

            const fileName = `${csvBook.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`

            const mediaDoc = await payload.create({
              collection: 'media',
              data: {
                alt: csvBook.title,
              },
              file: {
                data: imageBuffer,
                mimetype: 'image/jpeg',
                name: fileName,
                size: imageBuffer.length,
              },
            })

            bookData.image = mediaDoc.id
            console.log(`   ✅ Bilde lastet opp`)
          } catch (imageError) {
            console.warn(`   ⚠️  Kunne ikke laste ned bilde: ${imageError}`)
          }
        }

        // Sjekk om boken allerede finnes (basert på ISBN eller tittel + forfatter)
        let existingBook = null

        if (bookData.isbn) {
          const result = await payload.find({
            collection: 'books',
            where: { isbn: { equals: bookData.isbn } },
          })
          existingBook = result.docs[0]
        }

        if (!existingBook) {
          // Sjekk med tittel og forfatter
          const result = await payload.find({
            collection: 'books',
            where: {
              and: [{ title: { equals: bookData.title } }, { author: { equals: bookData.author } }],
            },
          })
          existingBook = result.docs[0]
        }

        if (existingBook) {
          // Oppdater eksisterende bok
          await payload.update({
            collection: 'books',
            id: existingBook.id,
            data: bookData,
          })
          booksUpdated++
          console.log(`   🔄 Oppdaterte eksisterende bok: ${csvBook.title}`)
        } else {
          // Lag ny bok
          await payload.create({
            collection: 'books',
            data: bookData,
          })
          booksCreated++
          console.log(`   ✅ La til ny bok: ${csvBook.title}`)
        }
      } catch (error) {
        booksFailed++
        console.error(
          `   ❌ Feil med bok "${csvBook.title}":`,
          error instanceof Error ? error.message : error,
        )
      }
    }

    // Oppsummering
    console.log('\n🎉 IMPORT FULLFØRT!')
    console.log('=========================')
    console.log(`📚 Totalt bøker prosessert: ${books.length}`)
    console.log(`✅ Nye bøker lagt til: ${booksCreated}`)
    console.log(`🔄 Eksisterende bøker oppdatert: ${booksUpdated}`)
    console.log(`⏭️  Bøker hoppet over: ${booksSkipped}`)
    console.log(`❌ Bøker som feilet: ${booksFailed}`)
    console.log('\n💡 Tips:')
    console.log('  - Sjekk admin panelet på http://localhost:3000/admin')
    console.log('  - Alle bøkene skal nå være tilgjengelige')

    // Lukk forbindelsen
    if (payload.db?.destroy) {
      await payload.db.destroy()
    }
    process.exit(0)
  } catch (error) {
    console.error('❌ FEIL UNDER IMPORT:', error)
    process.exit(1)
  }
}

// Kjør importen
importBooksFromCSV()
