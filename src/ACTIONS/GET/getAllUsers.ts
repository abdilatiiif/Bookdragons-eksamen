'use server'

import { cookies } from 'next/headers'
import { apiGet } from '@/lib/api'

export async function getAllUsers() {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('authToken')?.value

    if (!authToken) {
      return {
        success: false,
        error: 'Ikke autorisert',
        users: [],
      }
    }

    const response = await apiGet('/api/users', authToken)

    return {
      success: true,
      users: (response as any).docs || [],
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    return {
      success: false,
      error: `Feil: ${errorMsg}`,
      users: [],
    }
  }
}
