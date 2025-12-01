import { Calendar, Clock, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function NyttIdag() {
  return (
    <section className="bg-[#fcdeb9] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Nytt i dag</h2>
          <p className=" text-lg">Les våre siste artikler og oppdateringer</p>
        </div>

        <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-64 md:h-full">
              <Image
                src="/books.avif"
                alt="Artikkel bilde"
                width={600}
                height={400}
                className="object-cover w-full h-full"
                priority
              />
            </div>

            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  15. november 2025
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />5 min lesing
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  Ola Nordmann
                </span>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Hvorfor bruktbøker er bedre enn nye bøker
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Oppdage magien i bruktbøker. Hver bok har sin egen historie å fortelle, ikke bare
                gjennom ordene på sidene, men også gjennom livene den har berørt. Fra notatene i
                margen til den unike lukten av gamle sider - bruktbøker gir en unik leseopplevelse
                du ikke finner andre steder.
              </p>

              <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition self-start">
                <Link href="/articles/bruktboker-vs-nye">Les hele artikkelen</Link>
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default NyttIdag
