'use client'

import { Package, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getUserOrders } from '@/ACTIONS/GET/getUserOrders'

export function OrdersTab() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      const result = await getUserOrders()
      if (result.success) {
        setOrders(result.orders)
      }
      setLoading(false)
    }
    fetchOrders()
  }, [])

  const getStatusText = (status: string) => {
    const statuses: Record<string, string> = {
      klar_til_henting: 'Klar til henting',
      hentet: 'Hentet',
      behandles: 'Behandles',
      kansellert: 'Kansellert',
    }
    return statuses[status] || status
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      klar_til_henting: 'bg-green-100 text-green-800',
      hentet: 'bg-gray-100 text-gray-800',
      behandles: 'bg-amber-100 text-amber-800',
      kansellert: 'bg-red-100 text-red-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Mine bestillinger</h2>
        <span className="text-sm text-gray-600">{orders.length} bestillinger totalt</span>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Ingen bestillinger ennå</h3>
          <p className="text-gray-600 mb-6">Du har ikke gjort noen kjøp hos oss ennå.</p>
          <button className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition">
            Start shopping
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition"
            >
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-b">
                <div className="flex items-center gap-4">
                  <Package className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Ordre #{order.orderNumber}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {new Date(order.createdAt).toLocaleDateString('nb-NO')}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}
                >
                  {getStatusText(order.status)}
                </span>
              </div>

              <div className="p-6">
                <div className="space-y-3 mb-4">
                  {order.items.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {item.book?.title || 'Ukjent bok'}
                        </p>
                        <p className="text-sm text-gray-600">
                          av {item.book?.author || 'Ukjent forfatter'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-800">
                          {item.quantity} x {item.price},-
                        </p>
                        <p className="text-sm font-semibold text-amber-600">
                          {item.quantity * item.price},-
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200">
                  <span className="text-lg font-bold text-gray-800">Totalt</span>
                  <span className="text-2xl font-bold text-amber-600">{order.totalAmount},-</span>
                </div>

                {order.status === 'klar_til_henting' && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="text-green-800 font-semibold mb-1">
                      ✓ Din bestilling er klar til henting!
                    </p>
                    <p className="text-sm text-green-700">
                      Kom til butikken når det passer deg. Vi holder bøkene til side for deg.
                    </p>
                  </div>
                )}

                {order.status === 'behandles' && (
                  <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                    <p className="text-amber-800 font-semibold mb-1">⏳ Bestillingen behandles</p>
                    <p className="text-sm text-amber-700">
                      Vi klargjør bøkene dine. Du får beskjed når de er klare til henting.
                    </p>
                  </div>
                )}

                {order.status === 'hentet' && (
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      ✓ Hentet{' '}
                      {order.pickedUpAt
                        ? new Date(order.pickedUpAt).toLocaleDateString('nb-NO')
                        : new Date(order.createdAt).toLocaleDateString('nb-NO')}
                    </p>
                    <button className="text-amber-600 hover:text-amber-700 text-sm font-semibold">
                      Kjøp igjen
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
