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
    // Email og password er allerede inkludert via auth: true
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Fullt navn',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefonnummer',
    },
    {
      name: 'address',
      type: 'text',
      label: 'Adresse',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'customer',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Kunde', value: 'customer' },
      ],
      label: 'Brukerrolle',
    },
  ],
}
