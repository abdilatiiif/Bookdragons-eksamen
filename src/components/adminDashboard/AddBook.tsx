'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function AddBook() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    price: '',
    stock: '',
    description: '',
    genre: [],
    publishedYear: '',
    binding: '',
    language: '',
    condition: '',
    signed: 'unsigned',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  return (
    <div className="min-h-screen  py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className=" rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Legg til bok</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tittel *</label>
                <input
                  type="text"
                  placeholder="Bok tittel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Forfatter *
                </label>
                <input
                  type="text"
                  placeholder="Forfatternavn"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ISBN *</label>
                <input
                  type="text"
                  placeholder="ISBN"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pris *</label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Lager *</label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Utgitt år</label>
                <input
                  type="number"
                  placeholder="2024"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Innbinding</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                  <option value="">Velg innbinding</option>
                  <option value="hardcover">Hardcover</option>
                  <option value="paperback">Paperback</option>
                  <option value="ebook">E-bok</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Språk</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                  <option value="">Velg språk</option>
                  <option value="Norsk">Norsk</option>
                  <option value="Engelsk">Engelsk</option>
                  <option value="Svensk">Svensk</option>
                  <option value="Dansk">Dansk</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tilstand</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                  <option value="">Velg tilstand</option>
                  <option value="Som ny">Som ny</option>
                  <option value="Brukt">Brukt</option>
                  <option value="Slitt">Slitt</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Signert</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                  <option value="unsigned">Ikke signert</option>
                  <option value="signed">Signert</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sjanger</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  'Fiksjon',
                  'Non-fiksjon',
                  'Barn',
                  'Ungdom',
                  'Krim',
                  'Romantikk',
                  'Skrekk',
                  'Fantasy',
                ].map((genre) => (
                  <label key={genre} className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm text-gray-700">{genre}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Beskrivelse</label>
              <textarea
                placeholder="Bok beskrivelse"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 font-bold text-lg rounded-lg transition disabled:bg-gray-400"
              >
                {loading ? 'Legger til...' : 'Legg til bok'}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 py-3 font-bold text-lg rounded-lg"
              >
                Avbryt
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
