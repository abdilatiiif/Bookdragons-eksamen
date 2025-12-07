'use client'

import { useState } from 'react'
import { Heart, ShoppingCart, ArrowLeft, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

function BookDetail({ book }: { book: any }) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const seed = encodeURIComponent(book?.id ?? book?.isbn ?? book?.title ?? 'default')
  const imgSrc = `https://picsum.photos/seed/${seed}/400/600`

  const handleAddToCart = () => {
    const cart = localStorage.getItem('cart')
    const cartItems = cart ? JSON.parse(cart) : []

    const existingItem = cartItems.find((item: any) => item.bookId === book.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cartItems.push({
        bookId: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        quantity: quantity,
        stock: book.stock,
      })
    }

    localStorage.setItem('cart', JSON.stringify(cartItems))

    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cartItems }))

    setAddedToCart(true)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const totalPrice = book.price * quantity

  return (
    <div className="max-w-7xl mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-amber-600 mb-6 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Tilbake til bøker</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="flex justify-center items-start">
          <div className="relative">
            <Image
              src={imgSrc}
              alt={book.title}
              className="w-[300px]  max-w-md h-auto rounded-lg shadow-2xl "
              width={400}
              height={600}
            />
            {book.signed === 'signed' && (
              <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                ✍️ Signert
              </div>
            )}
          </div>
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

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            {addedToCart ? (
              <button
                disabled
                className="flex-1 bg-green-600 text-white py-4 px-6 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition shadow-lg"
              >
                <Check className="w-6 h-6" />
                Lagt i handlekurven!
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={book.stock === 0}
                className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 px-6 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition shadow-lg"
              >
                <ShoppingCart className="w-6 h-6" />
                {book.stock > 0 ? 'Legg i handlekurv' : 'Utsolgt'}
              </button>
            )}

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

          {addedToCart && (
            <Link
              href="/cart"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition shadow-lg mb-8"
            >
              Gå til handlekurv →
            </Link>
          )}

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
