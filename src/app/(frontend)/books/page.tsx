import BooksSection from '@/components/books/BooksSection'
import { SidebarProvider } from '@/components/ui/sidebar'

function pages() {
  return (
    <SidebarProvider>
      <div className="min-h-screen p-10">
        <BooksSection />
      </div>
    </SidebarProvider>
  )
}

export default pages
