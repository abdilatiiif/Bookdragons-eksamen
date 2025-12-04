import { AdmindashBoardContainer } from '@/components/adminDashboard/AdmindashBoardContainer'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'

function page() {
  return (
    <div className="py-25 min-h-screen bg-linear-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-linear-to-r from-amber-900 to-orange-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-10 h-10" />
              <div>
                <h1 className="md:text-3xl  bg-red-500 p-4 rounded-3xl font-bold">
                  BookDragons - Admin
                </h1>
              </div>
            </div>
            <button className="hover:text-amber-200 transition">
              <Link href="/books">Tilbake til butikken</Link>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div>
          {' '}
          <AdmindashBoardContainer />{' '}
        </div>
      </div>
    </div>
  )
}
export default page
