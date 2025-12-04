'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Bestillinger() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  const eksempelBestillinger = [
    {
      id: 'ORD-001',
      orderNumber: 'ORD-001',
      customer: {
        id: '1',
        email: 'jon@example.com',
        name: 'Jon Doe',
        phone: '98765432',
      },
      items: [
        {
          id: '1',
          book: { title: 'Harry Potter og Halvblodsprins', author: 'J.K. Rowling' },
          quantity: 2,
          price: 249,
        },
        {
          id: '2',
          book: { title: 'Dune', author: 'Frank Herbert' },
          quantity: 1,
          price: 399,
        },
      ],
      totalAmount: 897,
      status: 'behandles',
      createdAt: '2025-12-04T10:30:00Z',
      readyForPickupAt: null,
      pickedUpAt: null,
    },
    {
      id: 'ORD-002',
      orderNumber: 'ORD-002',
      customer: {
        id: '2',
        email: 'maria@example.com',
        name: 'Maria Jensen',
        phone: '91234567',
      },
      items: [
        {
          id: '1',
          book: { title: '1984', author: 'George Orwell' },
          quantity: 1,
          price: 299,
        },
      ],
      totalAmount: 299,
      status: 'klar_til_henting',
      createdAt: '2025-12-03T14:20:00Z',
      readyForPickupAt: '2025-12-04T09:00:00Z',
      pickedUpAt: null,
    },
  ]

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

  const sortedOrders = [...eksempelBestillinger].sort((a, b) => {
    return (
      statusOrder[a.status as keyof typeof statusOrder] -
      statusOrder[b.status as keyof typeof statusOrder]
    )
  })

  return (
    <div className="min-h-screen  py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className=" rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Innkommende bestillinger</h1>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Laster bestillinger...</p>
            </div>
          ) : eksempelBestillinger.length === 0 ? (
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
                          {order.items.map((item) => (
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
                              className={`${
                                order.status === status
                                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                                  : ''
                              }`}
                            >
                              {statusLabels[status as keyof typeof statusLabels]}
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
