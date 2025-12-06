'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getAllOrders } from '@/ACTIONS/GET/getOrders'
import { updateOrderStatus } from '@/ACTIONS/PUT/orderStatus'

export default function Bestillinger() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      setError('')

      const result = await getAllOrders()

      if (result.success) {
        console.log('Fetched orders:', result.data)
        if (result.data.length > 0) {
          console.log('First order structure:', result.data[0])
        }
        setOrders(result.data)
      } else {
        setError(result.error || 'Kunne ikke hente bestillinger')
      }

      setLoading(false)
    }

    fetchOrders()
  }, [])

  const statusOptions = ['behandles', 'klar_til_henting', 'hentet', 'kansellert']

  const statusColors = {
    behandles: 'bg-yellow-100 text-yellow-800',
    klar_til_henting: 'bg-blue-100 text-blue-800',
    hentet: 'bg-green-100 text-green-800',
    kansellert: 'bg-red-100 text-red-800',
  }

  const statusLabels = {
    behandles: 'Behandles',
    klar_til_henting: 'Klar til henting',
    hentet: 'Hentet',
    kansellert: 'Kansellert',
  }

  const statusOrder = {
    behandles: 0,
    klar_til_henting: 1,
    hentet: 2,
    kansellert: 3,
  }

  const displayOrders = orders

  const filteredOrders =
    statusFilter === 'all'
      ? displayOrders
      : displayOrders.filter((order: any) => order.status === statusFilter)

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    return (
      statusOrder[a.status as keyof typeof statusOrder] -
      statusOrder[b.status as keyof typeof statusOrder]
    )
  })

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingOrder(orderId)
    setError('')

    console.log('Frontend: Updating order ID:', orderId, 'to status:', newStatus)

    const result = await updateOrderStatus({
      orderId,
      status: newStatus as 'behandles' | 'klar_til_henting' | 'hentet' | 'kansellert',
    })

    console.log('Frontend: Result from updateOrderStatus:', result)

    if (result.success) {
      // Oppdater orders i state
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)),
      )
    } else {
      setError(result.error || 'Kunne ikke oppdatere status')
    }

    setUpdatingOrder(null)
  }

  return (
    <div className="min-h-screen  py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className=" rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Innkommende bestillinger</h1>

          {/* Status Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Filtrer etter status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Alle bestillinger</option>
              <option value="behandles">Behandles</option>
              <option value="klar_til_henting">Klar til henting</option>
              <option value="hentet">Hentet</option>
              <option value="kansellert">Kansellert</option>
            </select>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Laster bestillinger...</p>
            </div>
          ) : sortedOrders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Ingen bestillinger</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div
                    className="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition"
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-bold text-lg text-gray-800">{order.orderNumber}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            statusColors[order.status as keyof typeof statusColors]
                          }`}
                        >
                          {statusLabels[order.status as keyof typeof statusLabels]}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Kunde: {order.customer.name} ({order.customer.email})
                      </p>
                      <p className="text-sm text-gray-600">
                        Bestilt: {new Date(order.createdAt).toLocaleDateString('no-NO')}
                      </p>
                    </div>
                    <div className="text-right mr-4">
                      <p className="font-bold text-lg text-amber-600">{order.totalAmount},-</p>
                      <p className="text-sm text-gray-600">{order.items.length} vare(r)</p>
                    </div>
                    {expandedOrder === order.id ? (
                      <ChevronUp className="w-6 h-6 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-600" />
                    )}
                  </div>

                  {expandedOrder === order.id && (
                    <div className="p-6 border-t border-gray-200 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-gray-800 mb-3">Kundeinfo</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <span className="font-semibold">Navn:</span> {order.customer.name}
                            </p>
                            <p>
                              <span className="font-semibold">E-post:</span> {order.customer.email}
                            </p>
                            <p>
                              <span className="font-semibold">Telefon:</span> {order.customer.phone}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-800 mb-3">Bestillingsdetaljer</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <span className="font-semibold">Bestillingsnummer:</span>{' '}
                              {order.orderNumber}
                            </p>
                            <p>
                              <span className="font-semibold">Dato:</span>{' '}
                              {new Date(order.createdAt).toLocaleDateString('no-NO')}
                            </p>
                            <p>
                              <span className="font-semibold">Tid:</span>{' '}
                              {new Date(order.createdAt).toLocaleTimeString('no-NO')}
                            </p>
                            {order.readyForPickupAt && (
                              <p>
                                <span className="font-semibold">Klar til henting:</span>{' '}
                                {new Date(order.readyForPickupAt).toLocaleDateString('no-NO')}
                              </p>
                            )}
                            {order.pickedUpAt && (
                              <p>
                                <span className="font-semibold">Hentet:</span>{' '}
                                {new Date(order.pickedUpAt).toLocaleDateString('no-NO')}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-800 mb-3">Bestilte bøker</h4>
                        <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                          {order.items.map((item: any) => (
                            <div
                              key={item.id}
                              className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-b-0 last:pb-0"
                            >
                              <div className="flex-1">
                                <p className="font-semibold text-gray-800">{item.book.title}</p>
                                <p className="text-sm text-gray-600">{item.book.author}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-600">
                                  Antall: <span className="font-semibold">{item.quantity}</span>
                                </p>
                                <p className="font-semibold text-amber-600">
                                  {item.price * item.quantity},-
                                </p>
                              </div>
                            </div>
                          ))}
                          <div className="pt-3 border-t border-gray-300 flex justify-between items-center">
                            <span className="font-bold text-gray-800">Totalt:</span>
                            <span className="font-bold text-lg text-amber-600">
                              {order.totalAmount},-
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-800 mb-3">Endre status</h4>
                        <div className="flex gap-2 flex-wrap">
                          {statusOptions.map((status) => (
                            <Button
                              key={status}
                              variant={order.status === status ? 'default' : 'outline'}
                              disabled={updatingOrder === order.id}
                              onClick={() => handleStatusChange(order.id, status)}
                              className={`${
                                order.status === status
                                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                                  : ''
                              }`}
                            >
                              {updatingOrder === order.id
                                ? 'Oppdaterer...'
                                : statusLabels[status as keyof typeof statusLabels]}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
