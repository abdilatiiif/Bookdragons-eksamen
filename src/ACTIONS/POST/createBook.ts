'use server'

import { cookies } from 'next/headers'

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

    const baseUrl =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.NEXT_PUBLIC_PAYLOAD_URL ||
      'http://localhost:3000'

    const response = await fetch(`${baseUrl}/api/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
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
      }),
    })

    const responseData = await response.json()

    if (!response.ok) {
      console.error('API error response:', responseData)
      return {
        success: false,
        error: responseData.message || 'Kunne ikke opprette bok',
      }
    }

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
