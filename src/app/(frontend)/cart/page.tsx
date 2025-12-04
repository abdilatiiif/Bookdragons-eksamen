'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { putOrder } from '@/ACTIONS/POST/putOrder'

interface CartItem {
  bookId: string
  title: string
  author: string
  price: number
  quantity: number
  stock: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const router = useRouter()

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e)
        setCartItems([])
      }
    }
    setIsHydrated(true)
  }, [])

  // Save cart to localStorage (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('cart', JSON.stringify(cartItems))
    }
  }, [cartItems, isHydrated])

  // Listen for cart updates from other components
  useEffect(() => {
    const handleCartUpdate = (event: any) => {
      const updatedCart = event.detail
      setCartItems(updatedCart)
    }

    window.addEventListener('cartUpdated', handleCartUpdate)
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate)
    }
  }, [])

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(bookId)
      return
    }

    // Find the item to get its stock limit
    const item = cartItems.find((i) => i.bookId === bookId)
    if (item && quantity > item.stock) {
      // Prevent quantity exceeding available stock
      setCartItems(cartItems.map((i) => (i.bookId === bookId ? { ...i, quantity: item.stock } : i)))
      return
    }

    setCartItems(cartItems.map((item) => (item.bookId === bookId ? { ...item, quantity } : item)))
  }

  const removeItem = (bookId: string) => {
    setCartItems(cartItems.filter((item) => item.bookId !== bookId))
  }

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const handleCheckout = async () => {
    setLoading(true)
    try {
      // Get current user
      const cookies = document.cookie.split(';')
      const userCookie = cookies.find((c) => c.trim().startsWith('currentUser='))
      if (!userCookie) {
        router.push('/auth/login')
        return
      }

      const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]))
      const userId = userData.id

      // Create order with cart items using server action
      const orderData = {
        customer: userId,
        items: cartItems.map((item) => ({
          book: item.bookId,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: calculateTotal(),
        status: 'behandles',
      }

      const result = await putOrder(orderData)

      if (result.success) {
        // Clear cart and redirect
        setCartItems([])
        localStorage.removeItem('cart')
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: [] }))
        router.push('/dashboard/bruker?tab=orders')
      } else {
        alert(result.error || 'Feil ved opprettelse av ordre. Prøv igjen.')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Noe gikk galt. Prøv igjen.')
    } finally {
      setLoading(false)
    }
  }

  const total = calculateTotal()

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50  py-25">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Kurven din er tom</h1>
            <p className="text-gray-600 mb-8">Du har ikke lagt til noen bøker ennå.</p>
            <Link href="/books">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3">
                Fortsett shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50 py-25">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Handlekurv</h1>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {cartItems.map((item) => (
                <div
                  key={item.bookId}
                  className="border-b border-gray-200 p-6 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-600">av {item.author}</p>
                    <p className="text-amber-600 font-bold mt-2">{item.price},-</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.bookId, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 transition"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-semibold text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right min-w-20">
                      <p className="text-sm text-gray-600">Totalt</p>
                      <p className="text-lg font-bold text-amber-600">
                        {item.price * item.quantity},-
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.bookId)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/books" className="mt-6 text-amber-600 hover:text-amber-700 font-semibold">
              ← Fortsett shopping
            </Link>
          </div>

         
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Oppsummering</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Antall varer:</span>
                  <span className="font-semibold">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Antall bøker:</span>
                  <span className="font-semibold">{cartItems.length}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">Totalt:</span>
                  <span className="text-3xl font-bold text-amber-600">{total},-</span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={loading || cartItems.length === 0}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-bold text-lg rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Behandler...' : 'Gå til betaling'}
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Du vil bli omdirigert for å fullføre ordren
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
