import BooksSection from '@/components/books/BooksSection'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Suspense } from 'react'

export default function BooksPage() {
  return (
    <SidebarProvider>
      <div className="min-h-screen p-10">
        <Suspense fallback={<div className="text-center py-20">Laster bøker...</div>}>
          <BooksSection />
        </Suspense>
      </div>
    </SidebarProvider>
  )
}
