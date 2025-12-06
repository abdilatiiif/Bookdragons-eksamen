'use server'

import { cookies } from 'next/headers'
import { apiPost } from '@/lib/api'

interface CreateBookData {
  title: string
  author: string
  price: number
  description?: string
  image?: string
  signed: 'signed' | 'unsigned'
  binding: 'pocket' | 'hardcover' | 'audiobook' | 'ebook'
  language: 'norwegian' | 'english' | 'other'
  genre?: string[]
  isbn?: string
  publishedYear?: number
  condition?: 'like-new' | 'very-good' | 'good' | 'acceptable'
  stock?: number
}

export async function createBook(data: CreateBookData) {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('authToken')?.value

    if (!authToken) {
      return {
        success: false,
        error: 'Ikke autorisert',
      }
    }

    const responseData = await apiPost(
      '/api/books',
      {
        title: data.title,
        author: data.author,
        price: data.price,
        description: data.description || '',
        signed: data.signed,
        binding: data.binding,
        language: data.language,
        genre: data.genre || [],
        isbn: data.isbn || '',
        publishedYear: data.publishedYear,
        condition: data.condition,
        stock: data.stock || 1,
        image: data.image || null,
      },
      authToken,
    )

    return {
      success: true,
      data: responseData,
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.error('createBook error:', errorMsg)
    return {
      success: false,
      error: `Feil: ${errorMsg}`,
    }
  }
}
