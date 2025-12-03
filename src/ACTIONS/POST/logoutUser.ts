'use server'

import { cookies } from 'next/headers'

export async function logoutUser() {
  try {
    const store = await cookies()

    // Delete all auth-related cookies
    store.delete('authToken')
    store.delete('currentUser')
    store.delete('payload-token')

    // Also call Payload's logout endpoint to invalidate the session
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
      await fetch(`${baseUrl}/api/users/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch (e) {
      console.error('Failed to call logout endpoint:', e)
    }

    return { success: true }
  } catch (e: any) {
    return { success: false, message: e?.message || 'Kunne ikke logge ut' }
  }
}
