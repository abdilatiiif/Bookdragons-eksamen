import { ArrowRight, BookOpen, Calendar, Clock } from 'lucide-react'

function MainSection() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/meeting.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute z-10 inset-0 bg-black/60 flex items-center justify-center ">
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-6 h-6 text-amber-400" />
                <span className="text-amber-400 font-semibold uppercase text-sm tracking-wider">
                  Neste arrangement
                </span>
              </div>
              <h2 className="text-white text-3xl font-bold mb-3">Forfattermøte med Anna Hansen</h2>
              <p className="text-gray-200 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                20. desember 2025 kl. 18:00
              </p>
              <p className="text-gray-300 mb-6">
                Møt den populære krimforfatteren for signering og samtale om hennes nye bok
                "Mysteriet på slottet"
              </p>
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 group-hover:gap-3">
                Se alle arrangementer
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/sortiment.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute z-10 inset-0 bg-black/60 flex items-center justify-center ">
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-6 h-6 text-amber-400" />
                <span className="text-amber-400 font-semibold uppercase text-sm tracking-wider">
                  Over 500 bøker
                </span>
              </div>
              <h2 className="text-white text-3xl font-bold mb-3">Utforsk vårt sortiment</h2>
              <p className="text-white mb-6">
                Fra fantasy til krim, barnebøker til klassikere. Finn din neste favorittbok blant
                våre nøye utvalgte bruktbøker til fantastiske priser.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  Fantasy
                </span>
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  Krim
                </span>
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  Sci-Fi
                </span>
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  Barnebøker
                </span>
              </div>
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 group-hover:gap-3">
                Bla gjennom bøker
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
export default MainSection
