'use client'

import { useState } from 'react'
import { Heart, ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

function BookDetail({ book }: { book: any }) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const seed = encodeURIComponent(book?.id ?? book?.isbn ?? book?.title ?? 'default')
  const imgSrc = `https://picsum.photos/seed/${seed}/400/600`

  const handleIncrement = () => {
    if (quantity < book.stock) {
      setQuantity(quantity + 1)
    }
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = () => {
    // TODO: Implementer handlekurv-logikk her
    alert(`Lagt til ${quantity} stk i handlekurven!`)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    console.log(`Toggled favorite for "${book.title}"`)
  }

  const totalPrice = book.price * quantity

  return (
    <div className="max-w-7xl mx-auto">
      {/* tilbake Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-amber-600 mb-6 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Tilbake til bøker</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative bg-white rounded-lg p-8 shadow-lg flex justify-center items-center">
          <img src={imgSrc} alt={book.title} className="max-h-[600px] w-auto object-contain" />

          {book.signed === 'signed' && (
            <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md">
              ✍️ Signert
            </div>
          )}

          {book.stock > 0 && book.stock <= 3 && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md">
              ⚠️ Få på lager
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="flex flex-col">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-4">av {book.author}</p>

            <div className="flex gap-2 flex-wrap mb-4">
              {book.genre && Array.isArray(book.genre) ? (
                book.genre.map((g: string) => (
                  <span
                    key={g}
                    className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {g}
                  </span>
                ))
              ) : (
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {book.genre}
                </span>
              )}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-5xl font-bold text-gray-900 mb-2">{book.price},-</p>
            {quantity > 1 && (
              <p className="text-xl text-gray-600">
                Total: <span className="font-bold text-amber-600">{totalPrice},-</span>
              </p>
            )}
          </div>

          <div className="mb-6">
            {book.stock > 0 ? (
              <p className="text-green-600 text-lg font-semibold">
                ✓ {book.stock} {book.stock === 1 ? 'stk' : 'stk'} på lager
              </p>
            ) : (
              <p className="text-red-600 text-lg font-semibold">✗ Utsolgt</p>
            )}
          </div>

          {book.stock > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Antall:</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-lg p-3 transition"
                >
                  <Minus className="w-5 h-5 text-gray-700" />
                </button>
                <span className="text-2xl font-bold text-gray-900 w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  disabled={quantity >= book.stock}
                  className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-lg p-3 transition"
                >
                  <Plus className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={book.stock === 0}
              className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 px-6 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition shadow-lg"
            >
              <ShoppingCart className="w-6 h-6" />
              {book.stock > 0 ? 'Legg i handlekurv' : 'Utsolgt'}
            </button>

            <button
              onClick={toggleFavorite}
              className={`p-4 rounded-lg border-2 transition ${
                isFavorite
                  ? 'bg-red-50 border-red-500 text-red-500'
                  : 'bg-white border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
              }`}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500' : ''}`} />
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Detaljer</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">ISBN:</span>
                <span className="font-semibold text-gray-900">{book.isbn || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Utgitt:</span>
                <span className="font-semibold text-gray-900">{book.publishedYear || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Innbinding:</span>
                <span className="font-semibold text-gray-900">{book.binding || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Språk:</span>
                <span className="font-semibold text-gray-900">{book.language || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tilstand:</span>
                <span className="font-semibold text-gray-900">{book.condition || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          {book.description && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Beskrivelse</h3>
              <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookDetail
