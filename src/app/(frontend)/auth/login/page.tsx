'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { loginUser } from '@/ACTIONS/POST/loginUser'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await loginUser(formData.email, formData.password)

    if (result.success) {
      // Redirect til dashboard
      router.push('/dashboard/bruker')
    } else {
      setError(result.message || 'Noe gikk galt. Prøv igjen.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-25 bg-linear-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <BookOpen className="w-12 h-12 text-amber-600" />
            <h1 className="text-4xl font-bold text-gray-800">BookDragons</h1>
          </div>
          <p className="text-gray-600">Din lokale bruktbokhandel</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Logg inn</h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-post
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="din@epost.no"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Passord
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Logger inn...' : 'Logg inn'}
            </button>
          </form>

          {/* Links */}
          <div className="mt-4 space-y-2 text-center">
            <div>
              <Link
                href="/auth/glemt-passord"
                className="text-sm text-amber-600 hover:text-amber-700 font-semibold"
              >
                Glemt passord?
              </Link>
            </div>
            <div className="text-sm text-gray-600">
              Har du ikke konto?{' '}
              <Link
                href="/auth/registrer"
                className="text-amber-600 hover:text-amber-700 font-semibold"
              >
                Registrer deg her
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Ved å logge inn godtar du våre{' '}
          <button className="text-amber-600 hover:text-amber-700 font-semibold">
            brukervilkår
          </button>
        </p>
      </div>
    </div>
  )
}
