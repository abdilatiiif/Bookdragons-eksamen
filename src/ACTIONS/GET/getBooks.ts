'use server'

import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export async function getBooks(filters?: {
  genre?: string[]
  language?: string | string[]
  binding?: string | string[]
  minPrice?: number
  maxPrice?: number
  signed?: string
  condition?: string
  search?: string
  sort?: string
}) {
  try {
    const payload = await getPayload({ config: configPromise })

    const where: any = {}

    // Apply filters
    if (filters?.genre && filters.genre.length > 0) {
      where.genre = { in: filters.genre }
    }

    if (filters?.language) {
      if (Array.isArray(filters.language)) {
        where.language = { in: filters.language }
      } else {
        where.language = { equals: filters.language }
      }
    }

    if (filters?.binding) {
      if (Array.isArray(filters.binding)) {
        where.binding = { in: filters.binding }
      } else {
        where.binding = { equals: filters.binding }
      }
    }

    if (filters?.signed) {
      where.signed = { equals: filters.signed }
    }

    if (filters?.condition) {
      where.condition = { equals: filters.condition }
    }

    if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
      where.price = {}
      if (filters.minPrice !== undefined) where.price.greater_than_equal = filters.minPrice
      if (filters.maxPrice !== undefined) where.price.less_than_equal = filters.maxPrice
    }

    if (filters?.search) {
      where.or = [
        { title: { like: filters.search } },
        { author: { like: filters.search } },
        { description: { like: filters.search } },
      ]
    }

    // Handle sorting
    let sortField = '-createdAt'
    if (filters?.sort) {
      switch (filters.sort) {
        case 'price-low':
          sortField = 'price'
          break
        case 'price-high':
          sortField = '-price'
          break
        case 'name-asc':
          sortField = 'title'
          break
        case 'name-desc':
          sortField = '-title'
          break
        case 'newest':
          sortField = '-createdAt'
          break
      }
    }

    const books = await payload.find({
      collection: 'books',
      where,
      limit: 100,
      sort: sortField,
    })

    return books.docs
  } catch (error) {
    console.error('Error fetching books:', error)
    return []
  }
}
