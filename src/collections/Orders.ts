import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'customer', 'status', 'totalAmount', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      // Customers can only read their own orders
      return {
        customer: {
          equals: user?.id,
        },
      }
    },
    create: () => true, // Allow customers to create orders
    update: ({ req: { user } }) => user?.role === 'admin', // Only admin can update
    delete: ({ req: { user } }) => user?.role === 'admin', // Only admin can delete
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      label: 'Ordrenummer',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ operation, value }) => {
            if (operation === 'create' && !value) {
              // Generate order number: ORD-XXX
              const timestamp = Date.now().toString().slice(-6)
              return `ORD-${timestamp}`
            }
            return value
          },
        ],
      },
    },
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Kunde',
      hasMany: false,
    },
    {
      name: 'items',
      type: 'array',
      label: 'Bestilte bøker',
      required: true,
      minRows: 1,
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
          required: true,
          defaultValue: 1,
          min: 1,
        },
        {
          name: 'price',
          type: 'number',
          label: 'Pris per stk (NOK)',
          required: true,
          min: 0,
        },
      ],
    },
    {
      name: 'totalAmount',
      type: 'number',
      label: 'Totalt beløp (NOK)',
      required: true,
      min: 0,
      admin: {
        description: 'Beregnes automatisk fra bestilte bøker',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      required: true,
      defaultValue: 'behandles',
      options: [
        { label: 'Behandles', value: 'behandles' },
        { label: 'Klar til henting', value: 'klar_til_henting' },
        { label: 'Hentet', value: 'hentet' },
        { label: 'Kansellert', value: 'kansellert' },
      ],
      access: {
        read: () => true,
        create: ({ req: { user } }) => user?.role === 'admin',
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
    {
      name: 'readyForPickupAt',
      type: 'date',
      label: 'Klar til henting – tidspunkt',
      admin: {
        description: 'Settes automatisk når status endres til "Klar til henting"',
      },
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
      admin: {
        description: 'Settes automatisk når status endres til "Hentet"',
      },
      access: {
        read: () => true,
        create: ({ req: { user } }) => user?.role === 'admin',
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Interne notater',
      admin: {
        description: 'Kun synlig for admin',
      },
      access: {
        read: ({ req: { user } }) => user?.role === 'admin',
        create: ({ req: { user } }) => user?.role === 'admin',
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // Calculate total amount from items
        if (data.items && Array.isArray(data.items)) {
          data.totalAmount = data.items.reduce((sum: number, item: any) => {
            return sum + (item.quantity || 0) * (item.price || 0)
          }, 0)
        }

        // Set timestamps when status changes
        if (data.status === 'klar_til_henting' && !data.readyForPickupAt) {
          data.readyForPickupAt = new Date().toISOString()
        }
        if (data.status === 'hentet' && !data.pickedUpAt) {
          data.pickedUpAt = new Date().toISOString()
        }

        return data
      },
    ],
  },
}
