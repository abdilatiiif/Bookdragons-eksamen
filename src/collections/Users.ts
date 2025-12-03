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
    {
      name: 'orderStatus',
      type: 'select',
      label: 'Bestillingsstatus',
      defaultValue: 'under_behandling',
      options: [
        { label: 'Under behandling', value: 'under_behandling' },
        { label: 'Klar for henting', value: 'klar_for_henting' },
        { label: 'Hentet', value: 'hentet' },
      ],
      access: {
        read: () => true,
        create: ({ req: { user } }) => user?.role === 'admin',
        update: ({ req: { user } }) => user?.role === 'admin',
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'pickupReadyAt',
      type: 'date',
      label: 'Klar for henting – tidspunkt',
      admin: { position: 'sidebar' },
      access: {
        read: () => true,
        create: ({ req: { user } }) => user?.role === 'admin',
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
    {
      name: 'pickedUpAt',
      type: 'date',
      label: 'Hentet – tidspunkt',
      admin: { position: 'sidebar' },
      access: {
        read: () => true,
        create: ({ req: { user } }) => user?.role === 'admin',
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
    {
      name: 'orders',
      type: 'array',
      label: 'Bestillinger (bøker)',
      labels: { singular: 'Bestilling', plural: 'Bestillinger' },
      access: {
        read: () => true, // kunde skal kunne se egne bestillinger
        create: () => true, // kunde kan opprette en bestilling-oppføring (status settes via default)
        update: ({ req: { user } }) => !!user, // eier/admin kan oppdatere elementer (felt-nivå låser status)
      },
      fields: [
        {
          name: 'book',
          type: 'relationship',
          relationTo: 'books',
          required: true,
          label: 'Bok',
        },
        {
          name: 'quantity',
          type: 'number',
          label: 'Antall',
          defaultValue: 1,
          min: 1,
        },
        {
          name: 'status',
          type: 'select',
          label: 'Status',
          defaultValue: 'til_godkjenning',
          options: [
            { label: 'Til godkjenning', value: 'til_godkjenning' },
            { label: 'Godkjent', value: 'godkjent' },
            { label: 'Hentet', value: 'hentet' },
          ],
          access: {
            read: () => true,
            create: ({ req: { user } }) => user?.role === 'admin',
            update: ({ req: { user } }) => user?.role === 'admin',
          },
        },
        {
          name: 'note',
          type: 'text',
          label: 'Notat (intern)',
          admin: { description: 'Valgfritt notat fra selger/admin' },
          access: {
            read: ({ req: { user } }) => user?.role === 'admin',
            create: ({ req: { user } }) => user?.role === 'admin',
            update: ({ req: { user } }) => user?.role === 'admin',
          },
        },
        {
          name: 'createdAt',
          type: 'date',
          label: 'Opprettet',
          defaultValue: () => new Date().toISOString(),
          admin: { readOnly: true },
        },
        {
          name: 'updatedAt',
          type: 'date',
          label: 'Oppdatert',
          admin: { readOnly: true },
        },
      ],
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (!data) return data
            const now = new Date().toISOString()
            // Ensure updatedAt is set when array items change
            if (Array.isArray(data.orders)) {
              data.orders = data.orders.map((item: any) => ({
                ...item,
                updatedAt: now,
              }))
            }
            return data
          },
        ],
      },
    },
  ],
}
