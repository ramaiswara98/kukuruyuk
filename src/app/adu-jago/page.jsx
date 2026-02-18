import Link from 'next/link';

const daftarGame = [
  {
    id: "patok-kecepatan",
    judul: "Patok Kecepatan",
    deskripsi: "Klik Bang Jago yang lari-larian secepat mungkin!",
    ikon: "⚡",
    warna: "border-red-500",
    bg: "bg-red-50"
  },
  {
    id: "tangkap-telur",
    judul: "Tangkap Telur",
    deskripsi: "Jangan sampai telur pecah ke tanah. Geser keranjangmu!",
    ikon: "🥚",
    warna: "border-yellow-500",
    bg: "bg-yellow-50"
  },
  {
    id: "tebak-suara",
    judul: "Tebak Kukuruyuk",
    deskripsi: "Dengerin suara ayamnya, mana yang asli Bang Jago?",
    ikon: "📢",
    warna: "border-orange-500",
    bg: "bg-orange-50"
  },
  {
    id: "adu-panco",
    judul: "Panco Jempol",
    deskripsi: "Adu cepat tekan tombol lawan Bang Jago yang makin kuat.",
    ikon: "💪",
    warna: "border-blue-500",
    bg: "bg-blue-50"
  },
  {
    id: "tuyul-simulator",
    judul: "Tuyul Simulator",
    deskripsi: "Misi rahasia ambil koin warga. Awas kena senter Pak RT!",
    ikon: "👶",
    warna: "border-indigo-600", // Warna ungu gelap biar misterius
    bg: "bg-indigo-50"
  },
  {
    id: "tuyul-simulator-2",
    judul: "Tuyul Simulator 2",
    deskripsi: "Misi rahasia ambil koin warga. Awas kena senter Pak RT!",
    ikon: "👶",
    warna: "border-indigo-600", // Warna ungu gelap biar misterius
    bg: "bg-indigo-50"
  }
];

export default function LobiAduJago() {
  return (
    <main className="min-h-screen bg-red-600 p-6 flex flex-col items-center">
      
      {/* Header Arena */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-12 mt-8">
        <Link href="/" className="bg-white/20 hover:bg-white/30 text-white font-bold px-4 py-2 rounded-full transition-all">
          ← KABUR
        </Link>
        <h1 className="text-3xl font-black text-white italic tracking-tighter">ARENA ADU JAGO</h1>
      </div>

      <div className="text-center mb-10">
        <div className="inline-block bg-yellow-400 text-red-700 font-black px-6 py-2 rounded-full shadow-lg -rotate-2 mb-4">
          TUNJUKKAN NYALIMU!
        </div>
        <p className="text-red-100 font-medium">Pilih pertandinganmu dan jadilah penguasa kandang.</p>
      </div>

      {/* Grid Menu Game */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
        {daftarGame.map((game) => (
          <Link 
            key={game.id} 
            href={`/adu-jago/${game.id}`}
            className={`group ${game.bg} p-6 rounded-[32px] shadow-xl border-b-8 ${game.warna} hover:scale-105 transition-all active:scale-95`}
          >
            <div className="flex items-start justify-between">
              <div className="text-5xl group-hover:animate-bounce">{game.ikon}</div>
              <div className="bg-white/50 text-[10px] font-black px-2 py-1 rounded-full uppercase">Arena Ready</div>
            </div>
            <h3 className="text-xl font-black text-gray-800 mt-6 uppercase leading-tight">
              {game.judul}
            </h3>
            <p className="text-sm text-gray-500 mt-2 font-medium italic">
              {game.deskripsi}
            </p>
            <div className="mt-6 flex items-center gap-2 text-red-600 font-black text-sm group-hover:gap-4 transition-all">
              MASUK ARENA <span>→</span>
            </div>
          </Link>
        ))}
      </div>

      <footer className="mt-16 text-red-200 text-xs font-bold uppercase tracking-widest opacity-70">
        Pelatihan Ketangkasan © 2026 Bang Jago
      </footer>
    </main>
  );
}