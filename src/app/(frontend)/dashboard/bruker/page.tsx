'use client'

import { WishListTab } from '@/components/WishListTab'
import { OrdersTab } from '@/components/OrdersTab'
import { ProfileTab } from '@/components/ProfileTab'
import { useState } from 'react'
import Link from 'next/link'

import { BookOpen, ShoppingBag, Heart, User } from 'lucide-react'
import { get } from 'http'
import { getCurrentUser } from '@/ACTIONS/GET/getCurrentUser'

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('orders') // orders, wishlist, profile

  return (
    <div className="py-25 min-h-screen bg-linear-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-linear-to-r from-amber-900 to-orange-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-10 h-10" />
              <div>
                <h1 className="text-3xl font-bold">BookDragons</h1>
              </div>
            </div>
            <button className="hover:text-amber-200 transition">
              <Link href="/books">Tilbake til butikken</Link>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8 p-2 flex gap-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition ${
              activeTab === 'orders'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            Bestillinger
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition ${
              activeTab === 'wishlist'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Heart className="w-5 h-5" />
            Ønskeliste
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition ${
              activeTab === 'profile'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <User className="w-5 h-5" />
            Min profil
          </button>
        </div>

        <div>
          {activeTab === 'orders' && <OrdersTab />}
          {activeTab === 'wishlist' && <WishListTab />}
          {activeTab === 'profile' && <ProfileTab />}
        </div>
      </div>
    </div>
  )
}
