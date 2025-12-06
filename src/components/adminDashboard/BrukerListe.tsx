'use client'

import { useState, useEffect } from 'react'
import { Search, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getAllUsers } from '@/ACTIONS/GET/getAllUsers'
import { deleteUser } from '@/ACTIONS/DELETE/deleteUser'

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: string
  createdAt: string
}

export default function BrukerListe() {
  const [searchTerm, setSearchTerm] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Fetch alle brukere on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const result = await getAllUsers()
        if (result.success) {
          setUsers(result.users)
          setError(null)
        } else {
          setError(result.error || 'Kunne ikke hente brukere')
        }
      } catch (err) {
        setError('Feil ved henting av brukere')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleDeleteUser = async (email: string, userId: string) => {
    if (!confirm(`Er du sikker på at du vil slette bruker med e-post ${email}?`)) {
      return
    }

    try {
      setDeletingId(userId)
      const result = await deleteUser(email)

      if (result.success) {
        setUsers(users.filter((u) => u.id !== userId))
        setError(null)
      } else {
        setError(result.error || 'Kunne ikke slette bruker')
      }
    } catch (err) {
      setError('Feil ved sletting av bruker')
    } finally {
      setDeletingId(null)
    }
  }

  const filteredUsers = users
    .filter((user) => user.role === 'customer')
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm),
    )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('no-NO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Laster brukere...</div>
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Søk etter navn, e-post eller telefon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full">
          <thead className="bg-green-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Navn</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">E-post</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Telefon</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Registrert
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Handlinger
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{formatDate(user.createdAt)}</td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => handleDeleteUser(user.email, user.id)}
                    disabled={deletingId === user.id}
                    className="inline-flex items-center gap-2 px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                    title="Slett kunde"
                  >
                    <Trash2 className="w-4 h-4" />
                    {deletingId === user.id ? 'Sletter...' : 'Slett'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          <p>
            {users.length === 0
              ? 'Ingen brukere funnet i systemet'
              : `Ingen brukere funnet for søket "${searchTerm}"`}
          </p>
        </div>
      )}

      <div className="text-sm text-gray-600">
        Viser {filteredUsers.length} av {users.length} brukere
      </div>
    </div>
  )
}
