'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { createBook } from '@/ACTIONS/POST/createBook'

export default function AddBook() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    price: '',
    stock: '',
    description: '',
    genre: [] as string[],
    publishedYear: '',
    binding: '',
    language: '',
    condition: '',
    signed: 'unsigned',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const result = await createBook({
        title: formData.title,
        author: formData.author,
        price: parseInt(formData.price),
        stock: parseInt(formData.stock) || 1,
        description: formData.description,
        genre: formData.genre,
        publishedYear: formData.publishedYear ? parseInt(formData.publishedYear) : undefined,
        binding: formData.binding as 'pocket' | 'hardcover' | 'audiobook' | 'ebook',
        language: formData.language as 'norwegian' | 'english' | 'other',
        condition: formData.condition as 'like-new' | 'very-good' | 'good' | 'acceptable',
        signed: formData.signed as 'signed' | 'unsigned',
        isbn: formData.isbn,
      })

      console.log('createBook result:', result)

      if (result.success) {
        setSuccess('Bok opprettet successfully!')
        // Reset form
        setFormData({
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
      } else {
        setError(result.error || 'Kunne ikke opprette bok')
      }
    } catch (err) {
      setError('En feil oppstod')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

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

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tittel *</label>
                <input
                  type="text"
                  placeholder="Bok tittel"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Forfatter *
                </label>
                <input
                  type="text"
                  placeholder="Forfatternavn"
                  value={formData.author}
                  onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ISBN *</label>
                <input
                  type="text"
                  placeholder="ISBN"
                  value={formData.isbn}
                  onChange={(e) => setFormData((prev) => ({ ...prev, isbn: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pris *</label>
                <input
                  type="number"
                  placeholder="0"
                  value={formData.price}
                  onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Lager *</label>
                <input
                  type="number"
                  placeholder="0"
                  value={formData.stock}
                  onChange={(e) => setFormData((prev) => ({ ...prev, stock: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Utgitt år</label>
                <input
                  type="number"
                  placeholder="2024"
                  value={formData.publishedYear}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, publishedYear: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Innbinding</label>
                <select
                  value={formData.binding}
                  onChange={(e) => setFormData((prev) => ({ ...prev, binding: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                >
                  <option value="">Velg innbinding</option>
                  <option value="pocket">Pocket</option>
                  <option value="hardcover">Innbundet</option>
                  <option value="audiobook">Lydbok</option>
                  <option value="ebook">E-bok</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Språk</label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData((prev) => ({ ...prev, language: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                >
                  <option value="">Velg språk</option>
                  <option value="norwegian">Norsk</option>
                  <option value="english">Engelsk</option>
                  <option value="other">Annet</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tilstand</label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData((prev) => ({ ...prev, condition: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Velg tilstand</option>
                  <option value="like-new">Som ny</option>
                  <option value="very-good">Meget god</option>
                  <option value="good">God</option>
                  <option value="acceptable">Akseptabel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Signert</label>
                <select
                  value={formData.signed}
                  onChange={(e) => setFormData((prev) => ({ ...prev, signed: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                >
                  <option value="unsigned">Ikke signert</option>
                  <option value="signed">Signert</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sjanger *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Skjønnlitteratur', value: 'fiction' },
                  { label: 'Krim', value: 'crime' },
                  { label: 'Fantasy', value: 'fantasy' },
                  { label: 'Sci-Fi', value: 'scifi' },
                  { label: 'Romantikk', value: 'romance' },
                  { label: 'Thriller', value: 'thriller' },
                  { label: 'Biografi', value: 'biography' },
                  { label: 'Historie', value: 'history' },
                  { label: 'Barn', value: 'children' },
                  { label: 'Ungdom', value: 'youth' },
                ].map((genreOption) => (
                  <label key={genreOption.value} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.genre.includes(genreOption.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData((prev) => ({
                            ...prev,
                            genre: [...prev.genre, genreOption.value],
                          }))
                        } else {
                          setFormData((prev) => ({
                            ...prev,
                            genre: prev.genre.filter((g) => g !== genreOption.value),
                          }))
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{genreOption.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Beskrivelse</label>
              <textarea
                placeholder="Bok beskrivelse"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
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
