'use server'

import { cookies } from 'next/headers'

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

    const baseUrl =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.NEXT_PUBLIC_PAYLOAD_URL ||
      'http://localhost:3000'

    const response = await fetch(`${baseUrl}/api/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('API error response:', errorData)
      return {
        success: false,
        error: errorData.message || 'Kunne ikke hente bestillinger',
      }
    }

    const data = await response.json()

    return {
      success: true,
      data: data.docs || [],
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
