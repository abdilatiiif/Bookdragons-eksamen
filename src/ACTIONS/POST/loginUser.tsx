'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'

interface LoginResponse {
  success: boolean
  message?: string
  user?: any
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  try {
    const payload = await getPayload({ config })

    const result = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
    })

    // Save JWT as HTTP-only cookie for authenticated requests
    if (result?.token) {
      const store = await cookies()
      store.set('authToken', String(result.token), {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 7200,
        secure: process.env.NODE_ENV === 'production',
      })

      // Also save user info in a readable cookie for UI
      const userInfo = {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        role: result.user.role,
      }
      store.set('currentUser', JSON.stringify(userInfo), {
        httpOnly: false, // Readable by client
        sameSite: 'lax',
        path: '/',
        maxAge: 7200,
        secure: process.env.NODE_ENV === 'production',
      })
    }

    return {
      success: true,
      user: result.user,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Feil e-post eller passord',
    }
  }
}
