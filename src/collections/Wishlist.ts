import type { CollectionConfig } from 'payload'

export const Wishlist: CollectionConfig = {
  slug: 'wishlist',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['user', 'createdAt'],
    description: 'Brukerens ønskeliste for bøker',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      // Users can only read their own wishlist
      return {
        user: {
          equals: user?.id,
        },
      }
    },
    create: () => true, // Allow users to create wishlist entries
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      // Users can only update their own wishlist
      return {
        user: {
          equals: user?.id,
        },
      }
    },
    delete: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      // Users can only delete their own wishlist items
      return {
        user: {
          equals: user?.id,
        },
      }
    },
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Bruker',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'books',
      type: 'relationship',
      relationTo: 'books',
      required: true,
      hasMany: true,
      label: 'Bøker',
      admin: {
        description: 'Bøker som brukeren har lagt til i ønskelisten',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ operation, data, req }) => {
        if (!data) return data
        // Auto-set user on create if not already set
        if (operation === 'create' && !data.user && req.user) {
          data.user = req.user.id
        }
        return data
      },
    ],
  },
}
