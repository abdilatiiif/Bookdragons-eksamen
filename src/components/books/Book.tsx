import { Heart, ShoppingCart } from 'lucide-react'

function Book({ book }: { book: any }) {
  // random bilde må hentes fra picsum.photos basert på bok id eller isbn eller tittel

  const seed = encodeURIComponent(book?.id ?? book?.isbn ?? book?.title ?? String(Math.random())) // random generert test
  const imgSrc = `https://picsum.photos/seed/${seed}/400/500`

  function handleClick() {
    console.log(`Book "${book.title}" clicked!`)
    const bookUrl = `/books/${book.id}`
    window.location.href = bookUrl
  }

  return (
    <div
      onClick={() => handleClick()}
      className="w-80 bg-gray-50 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative bg-white p-8 flex justify-center items-center h-96">
        <img src={imgSrc} alt={book.title} className="h-full w-auto object-contain shadow-lg" />

        {/* Signed Badge */}
        {book.signed === 'signed' && (
          <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded text-sm font-semibold">
            Signert
          </div>
        )}

        {/* Stock Status Badge */}
        {book.stock > 0 && book.stock <= 3 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
            Få på lager
          </div>
        )}
      </div>

      {/* Book Info Section */}
      <div className="p-5 bg-gray-50">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-600">{book.author}</p>
          {book.genre && (
            <div className="flex gap-1 flex-wrap">
              {Array.isArray(book.genre) ? (
                book.genre.slice(0, 2).map((g: string) => (
                  <span
                    key={g}
                    className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded font-semibold"
                  >
                    {g}
                  </span>
                ))
              ) : (
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded font-semibold">
                  {book.genre}
                </span>
              )}
            </div>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight">{book.title}</h3>

        <p className="text-xs text-gray-500 mb-3">
          Utgitt: {book.publishedYear} | ISBN: {book.isbn}
        </p>

        <p className="text-3xl font-bold text-gray-900 mb-3">{book.price},-</p>

        <div className="flex gap-2 text-sm text-gray-600 mb-3 flex-wrap">
          <span className="bg-white px-2 py-1 rounded">{book.binding}</span>
          <span className="bg-white px-2 py-1 rounded">{book.language}</span>
          <span className="bg-white px-2 py-1 rounded">{book.condition}</span>
        </div>

        {book.stock > 0 ? (
          <p className="text-green-600 text-sm font-semibold">
            {book.stock} {book.stock === 1 ? 'stk' : 'stk'} på lager
          </p>
        ) : (
          <p className="text-red-600 text-sm font-semibold">Utsolgt</p>
        )}

        {book.description && (
          <p className="text-xs text-gray-600 mt-3 line-clamp-2">{book.description}</p>
        )}
      </div>
    </div>
  )
}
export default Book
