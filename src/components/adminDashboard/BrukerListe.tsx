'use client'

import { useState } from 'react'
import { Search, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function BrukerListe() {
  const [searchTerm, setSearchTerm] = useState('')

  const eksempelBrukere = [
    {
      id: '1',
      name: 'Jon Doe',
      email: 'jon@example.com',
      phone: '98765432',
      role: 'customer',
      createdAt: '2025-11-15T10:30:00Z',
    },
    {
      id: '2',
      name: 'Maria Jensen',
      email: 'maria@example.com',
      phone: '91234567',
      role: 'customer',
      createdAt: '2025-11-20T14:15:00Z',
    },
    {
      id: '3',
      name: 'Lars Eriksen',
      email: 'lars@example.com',
      phone: '90987654',
      role: 'customer',
      createdAt: '2025-11-25T09:45:00Z',
    },
    {
      id: '4',
      name: 'Anne Nilsen',
      email: 'anne@example.com',
      phone: '95555555',
      role: 'customer',
      createdAt: '2025-12-01T11:20:00Z',
    },
    {
      id: '5',
      name: 'Ole Andersen',
      email: 'ole@example.com',
      phone: '92222222',
      role: 'customer',
      createdAt: '2025-12-03T16:00:00Z',
    },
  ]

  const filteredUsers = eksempelBrukere.filter(
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

  return (
    <div className="space-y-4">
      {/* Søkefelt */}
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

      {/* Bruker-tabell */}
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
                    className="inline-flex items-center gap-2 px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Slett kunde"
                  >
                    <Trash2 className="w-4 h-4" />
                    Slett
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tom tilstand */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Ingen brukere funnet for søket "{searchTerm}"</p>
        </div>
      )}

      {/* Tellinger */}
      <div className="text-sm text-gray-600">
        Viser {filteredUsers.length} av {eksempelBrukere.length} brukere
      </div>
    </div>
  )
}
