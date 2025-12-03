import { BookOpen } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-[#e8c69d]  mt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpen className="w-8 h-8" />
          <span className="text-2xl font-bold">BookDragons</span>
        </div>
        <p className=" mb-4">Din lokale bruktbokhandel siden 1.Des 2025</p>
        <div className="flex justify-center gap-6 text-sm">
          <a href="#" className="hover:text-amber-400 transition">
            Kontakt oss
          </a>
          <a href="#" className="hover:text-amber-400 transition">
            Om oss
          </a>
          <a href="#" className="hover:text-amber-400 transition">
            Personvern
          </a>
        </div>
      </div>
    </footer>
  )
}
export default Footer
