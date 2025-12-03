'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

interface CreateAccountData {
  name: string
  email: string
  password: string
  phone?: string
  address?: string
}

interface CreateAccountResponse {
  success: boolean
  message?: string
  user?: any
}

export async function createAccount(data: CreateAccountData): Promise<CreateAccountResponse> {
  try {
    const payload = await getPayload({ config })

    const user = await payload.create({
      collection: 'users',
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        phone: data.phone || '',
        address: data.address || '',
        role: 'customer',
      },
    })

    return {
      success: true,
      user: user as any,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Kunne ikke opprette konto',
    }
  }
}
