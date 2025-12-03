'use client'

import React, { useState, useEffect } from 'react'
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function FilterSidebar() {
  console.log('FilterSidebar component rendered')

  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [signed, setSigned] = useState({ signed: false, unsigned: false })
  const [binding, setBinding] = useState({
    pocket: false,
    hardcover: false,
    audiobook: false,
    ebook: false,
  })
  const [language, setLanguage] = useState({
    norwegian: false,
    english: false,
    other: false,
  })

  const [expandedSections, setExpandedSections] = useState({
    sort: true,
    price: true,
    signed: true,
    binding: true,
    language: true,
  })

  const [genre, setGenre] = useState({
    fiction: false,
    crime: false,
    fantasy: false,
    scifi: false,
    romance: false,
    thriller: false,
    biography: false,
    history: false,
    children: false,
    youth: false,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Initialize from URL params
  useEffect(() => {
    const search = searchParams.get('search')
    const sort = searchParams.get('sort')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')

    if (search) setSearchQuery(search)
    if (sort) setSortBy(sort)
    if (minPrice || maxPrice) {
      setPriceRange([parseInt(minPrice || '0'), parseInt(maxPrice || '1000')])
    }

    // Load genre, signed, binding, language from params
    const genreParams = searchParams.getAll('genre')
    if (genreParams.length) {
      const newGenre = { ...genre }
      genreParams.forEach((g) => {
        if (g in newGenre) newGenre[g as keyof typeof genre] = true
      })
      setGenre(newGenre)
    }

    const signedParam = searchParams.get('signed')
    if (signedParam === 'signed') setSigned({ signed: true, unsigned: false })
    if (signedParam === 'unsigned') setSigned({ signed: false, unsigned: true })

    const bindingParams = searchParams.getAll('binding')
    if (bindingParams.length) {
      const newBinding = { ...binding }
      bindingParams.forEach((b) => {
        if (b in newBinding) newBinding[b as keyof typeof binding] = true
      })
      setBinding(newBinding)
    }

    const langParams = searchParams.getAll('language')
    if (langParams.length) {
      const newLanguage = { ...language }
      langParams.forEach((l) => {
        if (l in newLanguage) newLanguage[l as keyof typeof language] = true
      })
      setLanguage(newLanguage)
    }
  }, [])

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()

    if (searchQuery) params.set('search', searchQuery)
    if (sortBy) params.set('sort', sortBy)
    if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString())
    if (priceRange[1] < 1000) params.set('maxPrice', priceRange[1].toString())

    // Add selected genres
    Object.entries(genre).forEach(([key, value]) => {
      if (value) params.append('genre', key)
    })

    // Add signed filter
    if (signed.signed && !signed.unsigned) params.set('signed', 'signed')
    if (signed.unsigned && !signed.signed) params.set('signed', 'unsigned')

    // Add binding filters
    Object.entries(binding).forEach(([key, value]) => {
      if (value) params.append('binding', key)
    })

    // Add language filters
    Object.entries(language).forEach(([key, value]) => {
      if (value) params.append('language', key)
    })

    router.push(`/books?${params.toString()}`)
  }

  const handleReset = () => {
    setSearchQuery('')
    setSortBy('')
    setPriceRange([0, 1000])
    setSigned({ signed: false, unsigned: false })
    setBinding({ pocket: false, hardcover: false, audiobook: false, ebook: false })
    setLanguage({ norwegian: false, english: false, other: false })
    setGenre({
      fiction: false,
      crime: false,
      fantasy: false,
      scifi: false,
      romance: false,
      thriller: false,
      biography: false,
      history: false,
      children: false,
      youth: false,
    })
    router.push('/books')
  }

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-black pb-4">
      <button
        type="button"
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between text-left font-semibold text-gray-800 mb-3 hover:text-amber-600 transition"
      >
        <span>{title}</span>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
      {expandedSections[sectionKey] && <div>{children}</div>}
    </div>
  )

  return (
    <form onSubmit={handleApplyFilters} className="allPages rounded-lg shadow-lg p-4  sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-amber-600" />
          <h2 className="text-xl font-bold text-gray-800">Filtrer bøker</h2>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="text-sm  hover:text-amber-600 transition"
        >
          Nullstill
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
          <input
            type="text"
            placeholder="Søk etter tittel, forfatter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-black rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <X className="w-4 h-4 hover:text-gray-600" />
            </button>
          )}
        </div>
      </div>

      <FilterSection title="Sortering" sectionKey="sort">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full p-2 border border-black rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="">Velg sortering</option>
          <option value="price-low">Pris: Lavest til høyest</option>
          <option value="price-high">Pris: Høyest til lavest</option>
          <option value="name-asc">Navn: A til Å</option>
          <option value="name-desc">Navn: Å til A</option>
          <option value="newest">Nyeste først</option>
          <option value="popular">Mest populære</option>
        </select>
      </FilterSection>

      <FilterSection title="Prisklasse" sectionKey="price">
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-amber-600"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{priceRange[0]} kr</span>
            <span className="font-semibold text-amber-600">{priceRange[1]} kr</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Sjanger" sectionKey="genre">
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
          <label className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition">
            <input
              type="checkbox"
              checked={genre.fiction}
              onChange={(e) => setGenre({ ...genre, fiction: e.target.checked })}
              className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
            />
            <span className="text-sm">Skjønnlitteratur</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition">
            <input
              type="checkbox"
              checked={genre.crime}
              onChange={(e) => setGenre({ ...genre, crime: e.target.checked })}
              className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
            />
            <span className="text-sm">Krim</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition">
            <input
              type="checkbox"
              checked={genre.fantasy}
              onChange={(e) => setGenre({ ...genre, fantasy: e.target.checked })}
              className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
            />
            <span className="text-sm">Fantasy</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition">
            <input
              type="checkbox"
              checked={genre.scifi}
              onChange={(e) => setGenre({ ...genre, scifi: e.target.checked })}
              className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
            />
            <span className="text-sm">Science Fiction</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition">
            <input
              type="checkbox"
              checked={genre.romance}
              onChange={(e) => setGenre({ ...genre, romance: e.target.checked })}
              className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
            />
            <span className="text-sm">Romantikk</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition">
            <input
              type="checkbox"
              checked={genre.thriller}
              onChange={(e) => setGenre({ ...genre, thriller: e.target.checked })}
              className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
            />
            <span className="text-sm">Thriller</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition">
            <input
              type="checkbox"
              checked={genre.biography}
              onChange={(e) => setGenre({ ...genre, biography: e.target.checked })}
              className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
            />
            <span className="text-sm">Biografi</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition">
            <input
              type="checkbox"
              checked={genre.history}
              onChange={(e) => setGenre({ ...genre, history: e.target.checked })}
              className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
            />
            <span className="text-sm">Historie</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition">
            <input
              type="checkbox"
              checked={genre.children}
              onChange={(e) => setGenre({ ...genre, children: e.target.checked })}
              className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
            />
            <span className="text-sm">Barnebøker</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition">
            <input
              type="checkbox"
              checked={genre.youth}
              onChange={(e) => setGenre({ ...genre, youth: e.target.checked })}
              className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
            />
            <span className="text-sm">Ungdomsbøker</span>
          </label>
        </div>
      </FilterSection>

      <FilterSection title="Signering" sectionKey="signed">
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition">
            <input
              type="checkbox"
              checked={signed.signed}
              onChange={(e) => setSigned({ ...signed, signed: e.target.checked })}
              className="w-4 h-4 text-amber-600 border-black rounded focus:ring-amber-500"
            />
            <span className="text-sm">Signert</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition">
            <input
              type="checkbox"
              checked={signed.unsigned}
              onChange={(e) => setSigned({ ...signed, unsigned: e.target.checked })}
              className="w-4 h-4 text-amber-600 border-black rounded focus:ring-amber-500"
            />
            <span className="text-sm">Ikke signert</span>
          </label>
        </div>
      </FilterSection>

      <FilterSection title="Innbinding" sectionKey="binding">
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition">
            <input
              type="checkbox"
              checked={binding.pocket}
              onChange={(e) => setBinding({ ...binding, pocket: e.target.checked })}
              className="w-4 h-4 text-amber-600 border-black rounded focus:ring-amber-500"
            />
            <span className="text-sm">Pocket</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition">
            <input
              type="checkbox"
              checked={binding.hardcover}
              onChange={(e) => setBinding({ ...binding, hardcover: e.target.checked })}
              className="w-4 h-4 text-amber-600 border-black rounded focus:ring-amber-500"
            />
            <span className="text-sm">Innbundet</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition">
            <input
              type="checkbox"
              checked={binding.audiobook}
              onChange={(e) => setBinding({ ...binding, audiobook: e.target.checked })}
              className="w-4 h-4 text-amber-600 border-black rounded focus:ring-amber-500"
            />
            <span className="text-sm">Lydbok</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition">
            <input
              type="checkbox"
              checked={binding.ebook}
              onChange={(e) => setBinding({ ...binding, ebook: e.target.checked })}
              className="w-4 h-4 text-amber-600 border-black rounded focus:ring-amber-500"
            />
            <span className="text-sm">E-bok</span>
          </label>
        </div>
      </FilterSection>

      <FilterSection title="Språk" sectionKey="language">
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition">
            <input
              type="checkbox"
              checked={language.norwegian}
              onChange={(e) => setLanguage({ ...language, norwegian: e.target.checked })}
              className="w-4 h-4 text-amber-600 border-black rounded focus:ring-amber-500"
            />
            <span className="text-sm">Norsk</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition">
            <input
              type="checkbox"
              checked={language.english}
              onChange={(e) => setLanguage({ ...language, english: e.target.checked })}
              className="w-4 h-4 text-amber-600 border-black rounded focus:ring-amber-500"
            />
            <span className="text-sm">Engelsk</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition">
            <input
              type="checkbox"
              checked={language.other}
              onChange={(e) => setLanguage({ ...language, other: e.target.checked })}
              className="w-4 h-4 text-amber-600 border-black rounded focus:ring-amber-500"
            />
            <span className="text-sm">Annet språk</span>
          </label>
        </div>
      </FilterSection>

      <button
        type="submit"
        className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition"
      >
        Bruk filtre
      </button>
    </form>
  )
}
