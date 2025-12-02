'use server'

import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export async function getBooks(filters?: {
  genre?: string[]
  language?: string
  binding?: string
  minPrice?: number
  maxPrice?: number
  signed?: string
  condition?: string
  search?: string
}) {
  try {
    const payload = await getPayload({ config: configPromise })

    const where: any = {}

    // Apply filters
    if (filters?.genre && filters.genre.length > 0) {
      where.genre = { in: filters.genre }
    }

    if (filters?.language) {
      where.language = { equals: filters.language }
    }

    if (filters?.binding) {
      where.binding = { equals: filters.binding }
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
        { title: { contains: filters.search } },
        { author: { contains: filters.search } },
        { description: { contains: filters.search } },
      ]
    }

    const books = await payload.find({
      collection: 'books',
      where,
      limit: 100,
      sort: '-createdAt',
    })

    return books.docs
  } catch (error) {
    console.error('Error fetching books:', error)
    return []
  }
}
