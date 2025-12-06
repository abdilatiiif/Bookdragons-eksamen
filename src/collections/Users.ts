import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    tokenExpiration: 7200, // 2 timer
    verify: false, // Sett til true hvis du vil ha e-postverifikasjon
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 minutter
  },
  access: {
    // Tillat alle å opprette bruker (registrering)
    create: () => true,
    // Kun admins kan lese alle brukere
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      // Brukere kan bare lese sin egen profil
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    // Brukere kan bare oppdatere sin egen profil
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    // Kun admins kan slette brukere
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'customer',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Customer', value: 'customer' },
      ],
      access: {
        create: ({ req: { user } }) => user?.role === 'admin',
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
  ],
}
