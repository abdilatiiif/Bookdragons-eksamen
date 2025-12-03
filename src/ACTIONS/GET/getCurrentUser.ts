'use server'

import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function getCurrentUser() {
  try {
    const store = await cookies()
    const token = store.get('authToken')?.value

    if (!token) {
      console.log('getCurrentUser - No token found')
      return { success: false, user: null }
    }

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

    const res = await fetch(`${baseUrl}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
      cache: 'no-store',
    })

    console.log('getCurrentUser - Status:', res.status, 'URL:', `${baseUrl}/api/users/me`)

    if (!res.ok) {
      const text = await res.text()
      console.log('getCurrentUser - Failed:', text)
      return { success: false, user: null }
    }

    const data = await res.json()
    console.log('getCurrentUser - Success:', data.user)
    return { success: true, user: data.user }
  } catch (e: any) {
    console.log('getCurrentUser - Error:', e.message)
    return { success: false, user: null }
  }
}
