//get book by id
'use server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export async function getBook(id: string) {
  console.log(id)

  try {
    const payload = await getPayload({ config: configPromise })

    const book = await payload.findByID({
      collection: 'books',
      id,
    })

    return book
  } catch (error) {
    console.error('Error fetching book:', error)
    throw error
  }
}
