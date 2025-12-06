'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function deleteUser(email: string) {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
    })

    const user = result.docs?.[0]

    if (!user) {
      return {
        success: false,
        error: 'Bruker ikke funnet',
      }
    }

    const orders = await payload.find({
      collection: 'orders',
      where: { customer: { equals: user.id } },
    })

    for (const order of orders.docs) {
      await payload.delete({
        collection: 'orders',
        id: order.id,
        overrideAccess: true,
      })
    }

    await payload.delete({
      collection: 'users',
      id: user.id,
      overrideAccess: true,
    })

    return {
      success: true,
      message: `Bruker med e-post ${email} har blitt slettet`,
      deletedUserId: user.id,
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    return {
      success: false,
      error: `Feil: ${errorMsg}`,
    }
  }
}
