'use server'

import { cookies } from 'next/headers'
import { apiPost } from '@/lib/api'

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

    const result = await apiPost('/api/orders', orderData, authToken)

    return {
      success: true,
      data: result,
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.error('putOrder error:', errorMsg)
    return {
      success: false,
      error: `Feil: ${errorMsg}`,
    }
  }
}
