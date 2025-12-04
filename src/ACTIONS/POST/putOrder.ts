'use server'

import { cookies } from 'next/headers'

interface OrderItem {
  book: string
  quantity: number
  price: number
}

interface CreateOrderData {
  customer: string
  items: OrderItem[]
  totalAmount: number
  status: string
}

export async function putOrder(orderData: CreateOrderData) {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('authToken')?.value

    if (!authToken) {
      return {
        success: false,
        error: 'Ikke autentisert. Logg inn igjen.',
      }
    }

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

    const response = await fetch(`${baseUrl}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return {
        success: false,
        error: errorData.message || 'Feil ved opprettelse av ordre',
      }
    }

    const result = await response.json()
    return {
      success: true,
      data: result,
    }
  } catch (error) {
    console.error('putOrder error:', error)
    return {
      success: false,
      error: 'Noe gikk galt. Prøv igjen.',
    }
  }
}
