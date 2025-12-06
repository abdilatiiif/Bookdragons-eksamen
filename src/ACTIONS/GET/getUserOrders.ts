'use server'

import { cookies } from 'next/headers'
import { apiGet } from '@/lib/api'

export async function getUserOrders() {
  try {
    const store = await cookies()
    const token = store.get('authToken')?.value

    if (!token) {
      return { success: false, orders: [] }
    }

    const userData = await apiGet('/api/users/me', token)
    const userId = (userData as any).user.id

    const ordersData = await apiGet(`/api/orders?where[customer][equals]=${userId}&depth=2`, token)

    return { success: true, orders: (ordersData as any).docs || [] }
  } catch (e: any) {
    return { success: false, orders: [] }
  }
}
