import React, { useState } from 'react'
import { BookOpen, Mail, Lock, Eye, EyeOff, User } from 'lucide-react'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLogin, setIsLogin] = useState(true) // true = login, false = register

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Funksjoner legges til senere
    console.log('Form submitted')
  }

  return (
    <div className="min-h-screen py-25 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <BookOpen className="w-12 h-12 text-amber-600" />
            <h1 className="text-4xl font-bold text-gray-800">BookDragons</h1>
          </div>
          <p className="text-gray-600">Din lokale bruktbokhandel</p>
        </div>

        {/* Login/Register Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Toggle Buttons */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md font-semibold transition ${
                isLogin ? 'bg-amber-600 text-white shadow-md' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Logg inn
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md font-semibold transition ${
                !isLogin ? 'bg-amber-600 text-white shadow-md' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Registrer
            </button>
          </div>

          {/* Form Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {isLogin ? 'Velkommen tilbake!' : 'Opprett konto'}
          </h2>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Name Field (Only for Register) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Fullt navn</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Ola Nordmann"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                E-postadresse
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="din@epost.no"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Passord</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
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

            {/* Confirm Password (Only for Register) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bekreft passord
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  />
                </div>
              </div>
            )}

            {/* Remember Me / Forgot Password */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                  />
                  <span className="text-sm text-gray-600">Husk meg</span>
                </label>
                <button className="text-sm text-amber-600 hover:text-amber-700 font-semibold">
                  Glemt passord?
                </button>
              </div>
            )}

            {/* Terms and Conditions (Only for Register) */}
            {!isLogin && (
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500 mt-1"
                />
                <span className="text-sm text-gray-600">
                  Jeg godtar{' '}
                  <button className="text-amber-600 hover:text-amber-700 font-semibold">
                    vilkårene
                  </button>{' '}
                  og{' '}
                  <button className="text-amber-600 hover:text-amber-700 font-semibold">
                    personvernreglene
                  </button>
                </span>
              </label>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition shadow-md hover:shadow-lg"
            >
              {isLogin ? 'Logg inn' : 'Opprett konto'}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">eller</span>
            </div>
          </div>

          {/* Footer Text */}
          <p className="text-center text-sm text-gray-600 mt-6">
            {isLogin ? (
              <>
                Har du ikke konto?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-amber-600 hover:text-amber-700 font-semibold"
                >
                  Registrer deg her
                </button>
              </>
            ) : (
              <>
                Har du allerede konto?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-amber-600 hover:text-amber-700 font-semibold"
                >
                  Logg inn her
                </button>
              </>
            )}
          </p>
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
