'use server'

import { cookies } from 'next/headers'

export async function getUserOrders() {
  try {
    const store = await cookies()
    const token = store.get('authToken')?.value

    if (!token) {
      return { success: false, orders: [] }
    }

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

    // First get current user to get their ID
    const userRes = await fetch(`${baseUrl}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
      cache: 'no-store',
    })

    if (!userRes.ok) {
      return { success: false, orders: [] }
    }

    const userData = await userRes.json()
    const userId = userData.user.id

    // Fetch orders for this user
    const ordersRes = await fetch(
      `${baseUrl}/api/orders?where[customer][equals]=${userId}&depth=2`,
      {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
        cache: 'no-store',
      },
    )

    if (!ordersRes.ok) {
      return { success: false, orders: [] }
    }

    const ordersData = await ordersRes.json()
    return { success: true, orders: ordersData.docs || [] }
  } catch (e: any) {
    console.error('getUserOrders error:', e)
    return { success: false, orders: [] }
  }
}
