import { BookOpen } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen py-25 bg-linear-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Optional: Shared header/logo for all auth pages */}
      <div className="absolute top-8 left-8">
        <div className="flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-amber-600" />
          <span className="text-xl font-bold text-gray-800">BookDragons</span>
        </div>
      </div>

      {children}
    </div>
  )
}
