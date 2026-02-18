import Image from 'next/image';
import Link from 'next/link';
import BangJago from '../../public/image/bangjago.jpg'

export default function Home() {
  return (
    <main className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center p-6 font-sans">
      
      {/* Header & Maskot Section */}
      <div className="text-center space-y-4 mb-12">
        <div className="relative w-40 h-40 mx-auto group">
          {/* Maskot Bang Jago (Simulasi Emoji, ganti dengan Image component nanti) */}
          <div className="w-full h-full bg-orange-500 rounded-3xl flex items-center justify-center text-7xl shadow-2xl border-4 border-white rotate-3 group-hover:rotate-0 transition-transform duration-300">
            <Image 
              src={BangJago}
              alt="Bang Jago"
              className='rounded-3xl rotate-3'
            />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-red-600 text-white font-black px-4 py-2 rounded-xl shadow-lg -rotate-12">
            BANG JAGO
          </div>
        </div>

        <h1 className="text-6xl mt-7 font-black text-orange-600 tracking-tighter italic">
          KUKURUYUK!
        </h1>
        <p className="text-lg text-orange-900 font-semibold max-w-sm mx-auto leading-tight">
          "Lagi suntuk? Sini masuk kandang, <br/>kita bikin harimu jadi jagoan!"
        </p>
      </div>

      {/* Grid Menu 4 Kolom (Responsive) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
        
        {/* 1. Kuis Absurd */}
        <Link href="/cari-telur" className="group p-6 bg-white rounded-3xl shadow-md border-b-8 border-yellow-400 hover:scale-105 active:scale-95 transition-all">
          <div className="text-4xl mb-2">🥚</div>
          <h3 className="text-xl font-black text-orange-600">Cari Telur</h3>
          <p className="text-sm text-gray-500 font-medium italic">Kuis-kuis random penentu nasib.</p>
        </Link>

        {/* 2. Game Mini */}
        <Link href="/adu-jago" className="group p-6 bg-white rounded-3xl shadow-md border-b-8 border-red-500 hover:scale-105 active:scale-95 transition-all">
          <div className="text-4xl mb-2">🥊</div>
          <h3 className="text-xl font-black text-red-600">Adu Jago</h3>
          <p className="text-sm text-gray-500 font-medium italic">Game receh adu kecepatan tangan.</p>
        </Link>

        {/* 3. Meme/Video Lucu */}
        <Link href="/pakan-mood" className="group p-6 bg-white rounded-3xl shadow-md border-b-8 border-green-500 hover:scale-105 active:scale-95 transition-all">
          <div className="text-4xl mb-2">🌽</div>
          <h3 className="text-xl font-black text-green-600">Pakan Mood</h3>
          <p className="text-sm text-gray-500 font-medium italic">Asupan video & meme bikin ngakak.</p>
        </Link>

        {/* 4. Curhat Anonim */}
        <Link href="/kandang-curhat" className="group p-6 bg-white rounded-3xl shadow-md border-b-8 border-blue-500 hover:scale-105 active:scale-95 transition-all">
          <div className="text-4xl mb-2">🏚️</div>
          <h3 className="text-xl font-black text-blue-600">Kandang Curhat</h3>
          <p className="text-sm text-gray-500 font-medium italic">Buang sedihmu, biar dipatok Bang Jago.</p>
        </Link>

      </div>

      <footer className="mt-20 text-orange-300 text-sm font-bold uppercase tracking-widest text-center">
         <p className='text-xs'>Di Buat dengan males oleh @rama_iswara7 😮‍💨</p>
        Ditenagai oleh Energi Jagung 🌽
      </footer>
    </main>
  );
}