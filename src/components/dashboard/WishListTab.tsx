import { Heart } from 'lucide-react'

export function WishListTab() {
  // Mock wishlist data
  const wishlist = [
    {
      id: 1,
      title: 'Harry Potter og De vises stein',
      author: 'J.K. Rowling',
      price: 299,
      image: 'https://picsum.photos/seed/hp1/300/450',
      stock: 3,
      addedDate: '2025-11-20',
    },
    {
      id: 2,
      title: 'Ringenes Herre: Eventyret om Ringen',
      author: 'J.R.R. Tolkien',
      price: 349,
      image: 'https://picsum.photos/seed/lotr1/300/450',
      stock: 1,
      addedDate: '2025-11-18',
    },
    {
      id: 3,
      title: 'Sofies verden',
      author: 'Jostein Gaarder',
      price: 249,
      image: 'https://picsum.photos/seed/sofie/300/450',
      stock: 0,
      addedDate: '2025-11-10',
    },
    {
      id: 4,
      title: '1984',
      author: 'George Orwell',
      price: 229,
      image: 'https://picsum.photos/seed/1984/300/450',
      stock: 5,
      addedDate: '2025-11-05',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Min ønskeliste</h2>
        <span className="text-sm text-gray-600">{wishlist.length} bøker</span>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Ingen bøker i ønskelisten</h3>
          <p className="text-gray-600 mb-6">Start å legge til bøker du ønsker deg!</p>
          <button className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition">
            Se bøker
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition group"
            >
              <div className="relative">
                <img src={book.image} alt={book.title} className="w-full h-64 object-cover" />
                <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition">
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                </button>
                {book.stock === 0 && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
                    Utsolgt
                  </div>
                )}
                {book.stock > 0 && book.stock <= 3 && (
                  <div className="absolute top-3 left-3 bg-amber-500 text-white px-3 py-1 rounded text-sm font-semibold">
                    Få igjen
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-3">av {book.author}</p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-amber-600">{book.price},-</span>
                  {book.stock > 0 ? (
                    <span className="text-sm text-green-600 font-semibold">
                      {book.stock} på lager
                    </span>
                  ) : (
                    <span className="text-sm text-red-600 font-semibold">Utsolgt</span>
                  )}
                </div>

                <button
                  disabled={book.stock === 0}
                  className={`w-full py-2 rounded-lg font-semibold transition ${
                    book.stock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-amber-600 text-white hover:bg-amber-700'
                  }`}
                >
                  {book.stock === 0 ? 'Ikke tilgjengelig' : 'Legg i kurv'}
                </button>

                <p className="text-xs text-gray-500 mt-2 text-center">
                  Lagt til {new Date(book.addedDate).toLocaleDateString('nb-NO')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
