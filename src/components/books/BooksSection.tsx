'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Book from './Book'
import SideBarBtn from './SideBarBtn'
import { SidebarTrigger } from '../ui/sidebar'
import { getBooks } from '@/ACTIONS/GET/getBooks'

function BooksSection() {
  const searchParams = useSearchParams()
  const [books, setBooks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true)

      // Build filters from URL params
      const filters: any = {}

      const search = searchParams.get('search')
      if (search) filters.search = search

      const minPrice = searchParams.get('minPrice')
      const maxPrice = searchParams.get('maxPrice')
      if (minPrice) filters.minPrice = parseInt(minPrice)
      if (maxPrice) filters.maxPrice = parseInt(maxPrice)

      const genres = searchParams.getAll('genre')
      if (genres.length) filters.genre = genres

      const signed = searchParams.get('signed')
      if (signed) filters.signed = signed

      const bindings = searchParams.getAll('binding')
      if (bindings.length === 1) filters.binding = bindings[0]
      else if (bindings.length > 1) filters.binding = bindings

      const languages = searchParams.getAll('language')
      if (languages.length === 1) filters.language = languages[0]
      else if (languages.length > 1) filters.language = languages

      const sort = searchParams.get('sort')
      if (sort) filters.sort = sort

      const result = await getBooks(filters)
      // Client-side sort fallback to ensure correct ordering
      let sorted = result
      switch (filters.sort) {
        case 'price-low':
          sorted = [...result].sort((a: any, b: any) => (a.price ?? 0) - (b.price ?? 0))
          break
        case 'price-high':
          sorted = [...result].sort((a: any, b: any) => (b.price ?? 0) - (a.price ?? 0))
          break
        case 'name-asc':
          sorted = [...result].sort((a: any, b: any) =>
            String(a.title ?? '').localeCompare(String(b.title ?? '')),
          )
          break
        case 'name-desc':
          sorted = [...result].sort((a: any, b: any) =>
            String(b.title ?? '').localeCompare(String(a.title ?? '')),
          )
          break
        case 'newest':
          sorted = [...result].sort(
            (a: any, b: any) =>
              new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime(),
          )
          break
        default:
          sorted = result
      }
      setBooks(sorted)
      setLoading(false)
    }

    fetchBooks()
  }, [searchParams])

  return (
    <div className="py-25 px-10 z-20 flex flex-col w-full">
      <SideBarBtn />
      <SidebarTrigger className="fixed left-6 z-10" />

      {loading ? (
        <div className="w-full flex justify-center items-center py-20">
          <p className="text-gray-600">Laster bøker...</p>
        </div>
      ) : books.length === 0 ? (
        <div className="w-full flex justify-center items-center py-20">
          <p className="text-gray-600">Ingen bøker funnet med disse filtrene.</p>
        </div>
      ) : (
        <div className="w-full flex flex-wrap gap-6 justify-center items-center">
          {books.map((book) => (
            <Book book={book} key={book.id} />
          ))}
        </div>
      )}
    </div>
  )
}
export default BooksSection
