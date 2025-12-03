import type { CollectionConfig } from 'payload'

export const Books: CollectionConfig = {
  slug: 'books',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    // Alle kan lese bøker (offentlig)
    read: () => true,
    // Kun admins kan opprette bøker
    create: ({ req: { user } }) => user?.role === 'admin',
    // Kun admins kan oppdatere bøker
    update: ({ req: { user } }) => user?.role === 'admin',
    // Kun admins kan slette bøker
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Tittel',
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      label: 'Forfatter',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Pris (NOK)',
      min: 0,
      max: 10000,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beskrivelse',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Bilde',
    },
    {
      name: 'signed',
      type: 'select',
      label: 'Signert',
      options: [
        { label: 'Signert', value: 'signed' },
        { label: 'Usignert', value: 'unsigned' },
      ],
      required: true,
    },
    {
      name: 'binding',
      type: 'select',
      label: 'Innbinding',
      options: [
        { label: 'Pocket', value: 'pocket' },
        { label: 'Innbundet', value: 'hardcover' },
        { label: 'Lydbok', value: 'audiobook' },
        { label: 'E-bok', value: 'ebook' },
      ],
      required: true,
    },
    {
      name: 'language',
      type: 'select',
      label: 'Språk',
      options: [
        { label: 'Norsk', value: 'norwegian' },
        { label: 'Engelsk', value: 'english' },
        { label: 'Annet', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'genre',
      type: 'select',
      label: 'Sjanger',
      hasMany: true,
      options: [
        { label: 'Skjønnlitteratur', value: 'fiction' },
        { label: 'Krim', value: 'crime' },
        { label: 'Fantasy', value: 'fantasy' },
        { label: 'Sci-Fi', value: 'scifi' },
        { label: 'Romantikk', value: 'romance' },
        { label: 'Thriller', value: 'thriller' },
        { label: 'Biografi', value: 'biography' },
        { label: 'Historie', value: 'history' },
        { label: 'Barn', value: 'children' },
        { label: 'Ungdom', value: 'youth' },
      ],
    },
    {
      name: 'isbn',
      type: 'text',
      label: 'ISBN',
    },
    {
      name: 'publishedYear',
      type: 'number',
      label: 'Utgivelsesår',
      min: 1000,
      max: new Date().getFullYear(),
    },
    {
      name: 'condition',
      type: 'select',
      label: 'Tilstand',
      options: [
        { label: 'Som ny', value: 'like-new' },
        { label: 'Meget god', value: 'very-good' },
        { label: 'God', value: 'good' },
        { label: 'Akseptabel', value: 'acceptable' },
      ],
    },
    {
      name: 'stock',
      type: 'number',
      label: 'Antall på lager',
      defaultValue: 1,
      min: 0,
    },
  ],
}
