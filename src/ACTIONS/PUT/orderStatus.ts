'use server'

import { cookies } from 'next/headers'
import { apiPatch } from '@/lib/api'

type OrderStatus = 'behandles' | 'klar_til_henting' | 'hentet' | 'kansellert'

interface UpdateOrderStatusData {
  orderId: string
  status: OrderStatus
}

export async function updateOrderStatus(data: UpdateOrderStatusData) {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('authToken')?.value

    if (!authToken) {
      return {
        success: false,
        error: 'Ikke autorisert',
      }
    }

    const responseData = await apiPatch(
      `/api/orders/${data.orderId}`,
      { status: data.status },
      authToken,
    )

    return {
      success: true,
      data: responseData,
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    return {
      success: false,
      error: `Feil: ${errorMsg}`,
    }
  }
}
