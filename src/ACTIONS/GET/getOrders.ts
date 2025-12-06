'use server'

import { cookies } from 'next/headers'
import { apiGet } from '@/lib/api'

export async function getAllOrders() {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('authToken')?.value

    if (!authToken) {
      return {
        success: false,
        error: 'Ikke autorisert',
      }
    }

    const data = await apiGet('/api/orders', authToken)

    return {
      success: true,
      data: (data as any).docs || [],
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.error('getAllOrders error:', errorMsg)
    return {
      success: false,
      error: `Feil: ${errorMsg}`,
    }
  }
}
