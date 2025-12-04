'use server'

import { cookies } from 'next/headers'
import { apiPost } from '@/lib/api'

export async function logoutUser() {
  try {
    const store = await cookies()

    // Delete all auth-related cookies
    store.delete('authToken')
    store.delete('currentUser')
    store.delete('payload-token')

    // Also call Payload's logout endpoint to invalidate the session
    try {
      await apiPost('/api/users/logout', {})
    } catch (e) {
      console.error('Failed to call logout endpoint:', e)
    }

    return { success: true }
  } catch (e: any) {
    return { success: false, message: e?.message || 'Kunne ikke logge ut' }
  }
}
