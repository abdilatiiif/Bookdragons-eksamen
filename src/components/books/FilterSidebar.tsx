'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function FilterSidebar() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [maxPrice, setMaxPrice] = useState(1000)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedBindings, setSelectedBindings] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [isSignedOnly, setIsSignedOnly] = useState(false)

  const [expandedSections, setExpandedSections] = useState({
    sort: true,
    price: true,
    genre: true,
    signed: false,
    binding: false,
    language: false,
  })

  const genres = [
    { id: 'fiction', label: 'Skjønnlitteratur' },
    { id: 'crime', label: 'Krim' },
    { id: 'fantasy', label: 'Fantasy' },
    { id: 'scifi', label: 'Science Fiction' },
    { id: 'romance', label: 'Romantikk' },
    { id: 'thriller', label: 'Thriller' },
    { id: 'biography', label: 'Biografi' },
    { id: 'history', label: 'Historie' },
    { id: 'children', label: 'Barnebøker' },
    { id: 'youth', label: 'Ungdomsbøker' },
    { id: 'skrekk', label: 'Skrekk' },
    { id: 'mythology', label: 'Mytologi' },
  ]

  const bindings = [
    { id: 'pocket', label: 'Pocket' },
    { id: 'hardcover', label: 'Innbundet' },
    { id: 'audiobook', label: 'Lydbok' },
    { id: 'ebook', label: 'E-bok' },
  ]

  const languages = [
    { id: 'norwegian', label: 'Norsk' },
    { id: 'english', label: 'Engelsk' },
    { id: 'other', label: 'Annet språk' },
  ]

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const toggleItem = (item: string, list: string[], setList: (val: string[]) => void) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item])
  }

  const applyFilters = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    if (sortBy) params.set('sort', sortBy)
    if (maxPrice < 1000) params.set('maxPrice', maxPrice.toString())
    if (isSignedOnly) params.set('signed', 'true')
    selectedGenres.forEach((g) => params.append('genre', g))
    selectedBindings.forEach((b) => params.append('binding', b))
    selectedLanguages.forEach((l) => params.append('language', l))
    router.push(`/books?${params.toString()}`)
  }

  const resetFilters = () => {
    setSearchQuery('')
    setSortBy('')
    setMaxPrice(1000)
    setIsSignedOnly(false)
    setSelectedGenres([])
    setSelectedBindings([])
    setSelectedLanguages([])
    router.push('/books')
  }

  const FilterSection = ({
    title,
    sectionKey,
    children,
  }: {
    title: string
    sectionKey: keyof typeof expandedSections
    children: React.ReactNode
  }) => (
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
    <div className="allPages rounded-lg shadow-lg p-4 sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-amber-600" />
          <h2 className="text-xl font-bold text-gray-800">Filtrer bøker</h2>
        </div>
        <button onClick={resetFilters} className="text-sm hover:text-amber-600 transition">
          Nullstill
        </button>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
        <input
          type="text"
          placeholder="Søk etter tittel, forfatter..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-black rounded-lg focus:ring-2 focus:ring-amber-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <X className="w-4 h-4 hover:text-gray-600" />
          </button>
        )}
      </div>

      <FilterSection title="Sortering" sectionKey="sort">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full p-2 border border-black rounded-lg focus:ring-2 focus:ring-amber-500"
        >
          <option value="">Velg sortering</option>
          <option value="price-low">Pris: Lav til høy</option>
          <option value="price-high">Pris: Høy til lav</option>
          <option value="name-asc">A til Å</option>
          <option value="name-desc">Å til A</option>
        </select>
      </FilterSection>

      <FilterSection title="Maksimal pris" sectionKey="price">
        <input
          type="range"
          min="0"
          max="1000"
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-amber-600"
        />
        <p className="text-sm text-amber-600 font-semibold mt-2">{maxPrice} kr</p>
      </FilterSection>

      <FilterSection title="Sjanger" sectionKey="genre">
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
          {genres.map((genre) => (
            <label key={genre.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre.id)}
                onChange={() => toggleItem(genre.id, selectedGenres, setSelectedGenres)}
                className="w-4 h-4 accent-amber-600 rounded"
              />
              <span className="text-sm">{genre.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Signering" sectionKey="signed">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isSignedOnly}
            onChange={(e) => setIsSignedOnly(e.target.checked)}
            className="w-4 h-4 accent-amber-600 rounded"
          />
          <span className="text-sm">Kun signerte bøker</span>
        </label>
      </FilterSection>

      <FilterSection title="Innbinding" sectionKey="binding">
        <div className="space-y-2">
          {bindings.map((binding) => (
            <label key={binding.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBindings.includes(binding.id)}
                onChange={() => toggleItem(binding.id, selectedBindings, setSelectedBindings)}
                className="w-4 h-4 accent-amber-600 rounded"
              />
              <span className="text-sm">{binding.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Språk" sectionKey="language">
        <div className="space-y-2">
          {languages.map((lang) => (
            <label key={lang.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedLanguages.includes(lang.id)}
                onChange={() => toggleItem(lang.id, selectedLanguages, setSelectedLanguages)}
                className="w-4 h-4 accent-amber-600 rounded"
              />
              <span className="text-sm">{lang.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <button
        onClick={applyFilters}
        className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition"
      >
        Bruk filtre
      </button>
    </div>
  )
}
