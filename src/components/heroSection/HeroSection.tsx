import { ArrowRight, BookOpen } from 'lucide-react'
import MainSection from './MainSection'
import NyttIdag from './NyttIdag'
import Link from 'next/link'
import Footer from '../Footer'

function HeroSection() {
  return (
    <div className="bg-[#e8c69d] h-screen relative  ">
      <div className="bg-black/60 h-screen ">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute  inset-0 w-full h-full object-cover z-0 brightness-75"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <header className="absolute flex items-center justify-center inset-0 z-10">
          <div className=" inset-0  flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h2 className="text-5xl font-bold mb-4">Velkommen til BookDragons</h2>
              <p className="text-xl mb-6">Din lokale bruktbokhandel med et hav av historier</p>
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2 mx-auto">
                <Link href="/books">Utforsk vårt sortiment</Link>

                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>
      </div>
      <NyttIdag />
      <MainSection />
      <Footer />
    </div>
  )
}
export default HeroSection
