'use client'

import { getCurrentUser } from '@/ACTIONS/GET/getCurrentUser'

import { useEffect, useState } from 'react'
import { User, Mail, Phone, MapPin, Edit2, Save, X } from 'lucide-react'

export function ProfileTab() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  // Fetch user on mount
  useEffect(() => {
    async function fetchUser() {
      const result = await getCurrentUser()
      console.log('Fetched user:', result)
      if (result.success && result.user) {
        setUser(result.user)
        setUserInfo({
          name: result.user.name ?? result.user.email?.split('@')[0] ?? 'Ukjent',
          email: result.user.email ?? 'ukjent@epost.no',
          phone: result.user.phone ?? '',
          address: result.user.address ?? '',
        })
      }
      setLoading(false)
    }
    fetchUser()
  }, [])

  // Sync incoming user data into local state when it changes (and not editing)
  useEffect(() => {
    if (!isEditing && user) {
      setUserInfo({
        name: user?.name ?? user?.email?.split('@')[0] ?? 'Ukjent',
        email: user?.email ?? 'ukjent@epost.no',
        phone: user?.phone ?? '',
        address: user?.address ?? '',
      })
    }
  }, [user, isEditing])

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-7 w-32 bg-gray-200 rounded" />
          <div className="h-9 w-28 bg-gray-200 rounded" />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b">
            <div className="w-20 h-20 bg-gray-200 rounded-full" />
            <div className="space-y-2">
              <div className="h-6 w-40 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-10 w-full bg-gray-200 rounded" />
            <div className="h-10 w-full bg-gray-200 rounded" />
            <div className="h-10 w-full bg-gray-200 rounded" />
            <div className="h-10 w-full bg-gray-200 rounded" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-28 bg-white rounded-lg border border-gray-200" />
          <div className="h-28 bg-white rounded-lg border border-gray-200" />
          <div className="h-28 bg-white rounded-lg border border-gray-200" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Min profil</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-700 transition"
          >
            <Edit2 className="w-4 h-4" />
            Rediger
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              <X className="w-4 h-4" />
              Avbryt
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              <Save className="w-4 h-4" />
              Lagre
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b">
          <div className="w-20 h-20 bg-linear-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {userInfo.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{userInfo.name}</h3>
            <p className="text-gray-600">
              {user?.createdAt
                ? `Medlem siden ${new Date(user.createdAt).toLocaleDateString('no-NO')}`
                : 'Medlem'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <User className="w-4 h-4" />
              Fullt navn
            </label>
            {isEditing ? (
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800 px-4 py-2 bg-gray-50 rounded-lg">{userInfo.name}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Mail className="w-4 h-4" />
              E-postadresse
            </label>
            {isEditing ? (
              <input
                type="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800 px-4 py-2 bg-gray-50 rounded-lg">{userInfo.email}</p>
            )}
          </div>
        </div>

        {!isEditing && (
          <div className="mt-6 pt-6 border-t">
            <button className="text-red-600 hover:text-red-700 font-semibold text-sm">
              Endre passord
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
