import React from 'react'
import './styles.css'
import { Navigation } from '@/components/navigation/Navigation'
import { icons } from 'lucide-react'

export const metadata = {
  title: 'Bookdragons',
  description: 'Nettbutikk for Bookdragons, Online bokhandel',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="no">
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
