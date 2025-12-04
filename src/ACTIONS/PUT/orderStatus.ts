'use server'

import { cookies } from 'next/headers'

type OrderStatus = 'behandles' | 'klar_til_henting' | 'hentet' | 'kansellert'

interface UpdateOrderStatusData {
  orderId: string
  status: OrderStatus
}

export async function updateOrderStatus(data: UpdateOrderStatusData) {
  try {
    console.log('Updating order:', data.orderId, 'to status:', data.status)

    const cookieStore = await cookies()
    const authToken = cookieStore.get('authToken')?.value

    if (!authToken) {
      console.error('No auth token found')
      return {
        success: false,
        error: 'Ikke autorisert',
      }
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.NEXT_PUBLIC_PAYLOAD_URL ||
      'http://localhost:3000'
    const url = `${baseUrl}/api/orders/${data.orderId}`
    console.log('Making PATCH request to:', url)

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        status: data.status,
      }),
    })

    console.log('Response status:', response.status)

    const responseText = await response.text()
    console.log('Raw response:', responseText)

    let responseData
    try {
      responseData = JSON.parse(responseText)
    } catch {
      responseData = { message: responseText }
    }

    if (!response.ok) {
      console.error('API error response:', JSON.stringify(responseData, null, 2))
      console.error('Full error details:', responseData.errors || responseData.message)
      return {
        success: false,
        error:
          responseData.errors?.[0]?.message ||
          responseData.message ||
          `HTTP ${response.status}: Kunne ikke oppdatere status`,
      }
    }

    return {
      success: true,
      data: responseData,
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.error('updateOrderStatus catch error:', errorMsg)
    console.error('Full error:', error)
    return {
      success: false,
      error: `Feil: ${errorMsg}`,
    }
  }
}
