'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validering
    if (formData.password !== formData.confirmPassword) {
      setError('Passordene matcher ikke')
      setLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError('Passordet må være minst 8 tegn')
      setLoading(false)
      return
    }

    try {
      // Registrer bruker via Payload API
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone,
          role: 'customer',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.errors?.[0]?.message || 'Noe gikk galt ved registrering')
      }

      // Automatisk login etter registrering (using server action to set cookies properly)
      const { loginUser } = await import('@/ACTIONS/POST/loginUser')
      const loginResult = await loginUser(formData.email, formData.password)

      if (loginResult.success) {
        router.push('/dashboard/bruker')
      } else {
        router.push('/auth/login?registered=true')
      }
    } catch (err: any) {
      setError(err.message || 'Noe gikk galt. Prøv igjen.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Opprett konto</h1>
          <p className="text-gray-600">Bli med i BookDragons-fellesskapet</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Navn */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <User className="w-4 h-4" />
              Fullt navn
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Ola Nordmann"
            />
          </div>

          {/* E-post */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Mail className="w-4 h-4" />
              E-postadresse
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="din@epost.no"
            />
          </div>

          {/* Passord */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Lock className="w-4 h-4" />
              Passord
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Minst 8 tegn"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Bekreft passord */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Lock className="w-4 h-4" />
              Bekreft passord
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Gjenta passord"
            />
          </div>

          {/* Telefon (valgfri) */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Phone className="w-4 h-4" />
              Telefonnummer (valgfritt)
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="+47 123 45 678"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-bold text-lg transition shadow-lg"
          >
            {loading ? 'Oppretter konto...' : 'Opprett konto'}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Har du allerede en konto?{' '}
            <Link href="/auth/login" className="text-amber-600 hover:text-amber-700 font-semibold">
              Logg inn her
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
