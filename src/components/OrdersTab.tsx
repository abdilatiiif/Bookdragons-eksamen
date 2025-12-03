import { Package, Clock } from 'lucide-react'

export function OrdersTab() {
  // Mock orders data
  const orders = [
    {
      id: 'ORD-001',
      date: '2025-11-28',
      status: 'ready',
      items: [
        { title: 'Batman', author: 'Latif HH', price: 3000, quantity: 1 },
        { title: 'Mysteriet på slottet', author: 'Anna Hansen', price: 299, quantity: 2 },
      ],
      total: 3598,
    },
    {
      id: 'ORD-002',
      date: '2025-11-15',
      status: 'picked-up',
      items: [{ title: 'Dragens hemmelighet', author: 'Erik Nordmann', price: 349, quantity: 1 }],
      total: 349,
    },
    {
      id: 'ORD-003',
      date: '2025-11-01',
      status: 'picked-up',
      items: [
        { title: 'Sommerens eventyr', author: 'Lisa Berg', price: 279, quantity: 1 },
        { title: 'Stjernenes barn', author: 'Maria Svendsen', price: 399, quantity: 1 },
      ],
      total: 678,
    },
    {
      id: 'ORD-004',
      date: '2025-10-20',
      status: 'processing',
      items: [
        { title: 'Koden', author: 'Dan Brown', price: 329, quantity: 1 },
      ],
      total: 329,
    },
  ]

  const getStatusText = (status: string) => {
    const statuses: Record<string, string> = {
      ready: 'Klar til henting',
      'picked-up': 'Hentet',
      processing: 'Behandles',
    }
    return statuses[status] || status
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      ready: 'bg-green-100 text-green-800',
      'picked-up': 'bg-gray-100 text-gray-800',
      processing: 'bg-amber-100 text-amber-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
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
                    <p className="font-semibold text-gray-800">Ordre #{order.id}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {new Date(order.date).toLocaleDateString('nb-NO')}
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
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{item.title}</p>
                        <p className="text-sm text-gray-600">av {item.author}</p>
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
                  <span className="text-2xl font-bold text-amber-600">{order.total},-</span>
                </div>

                {order.status === 'ready' && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="text-green-800 font-semibold mb-1">
                      ✓ Din bestilling er klar til henting!
                    </p>
                    <p className="text-sm text-green-700">
                      Kom til butikken når det passer deg. Vi holder bøkene til side for deg.
                    </p>
                  </div>
                )}

                {order.status === 'processing' && (
                  <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                    <p className="text-amber-800 font-semibold mb-1">
                      ⏳ Bestillingen behandles
                    </p>
                    <p className="text-sm text-amber-700">
                      Vi klargjør bøkene dine. Du får beskjed når de er klare til henting.
                    </p>
                  </div>
                )}

                {order.status === 'picked-up' && (
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      ✓ Hentet {new Date(order.date).toLocaleDateString('nb-NO')}
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
