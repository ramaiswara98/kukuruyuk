import Link from 'next/link';

const daftarKuis = [
  {
    id: "jenis-ayam",
    judul: "Kamu Jenis Ayam Apa?",
    deskripsi: "Cari tahu kepribadian ayammu di sini!",
    ikon: "🐓",
    warna: "border-orange-400"
  },
  {
    id: "gorengan-life",
    judul: "Takdir Gorenganmu",
    deskripsi: "Kalau jadi gorengan, kamu bakal jadi apa?",
    ikon: "🍤",
    warna: "border-yellow-500"
  },
  {
    id: "mantan-absurd",
    judul: "Level Gagal Move On",
    deskripsi: "Seberapa 'kukuruyuk' kamu soal mantan?",
    ikon: "💔",
    warna: "border-red-400"
  },
  {
    id: "benda-mati",
    judul: "Benda Mati di Kamar",
    deskripsi: "Mungkin kamu sebenarnya adalah remot TV?",
    ikon: "📺",
    warna: "border-blue-400"
  },
  {
    id: "debat-kusir",
    judul: "Debat Kusir",
    deskripsi: "Voting hal - hal yang nggak berfaedah dalam hidup lu",
    ikon: "🗣️",
    warna: "border-gray-400"
  },
  {
    id: "uji-nasib",
    judul: "Uji Nasib",
    deskripsi: "Voting hal - hal yang nggak berfaedah dalam hidup lu",
    ikon: "🔮",
    warna: "border-green-400"
  }
];

export default function LobiKuis() {
  return (
    <main className="min-h-screen bg-yellow-50 p-6 flex flex-col items-center">
      {/* Header Kecil */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-8">
        <Link href="/" className="text-orange-600 font-bold hover:underline">← Balik ke Kandang</Link>
        <h1 className="text-3xl font-black text-orange-600">RAK TELUR KUIS</h1>
      </div>

      <div className="text-center mb-10">
        <p className="text-orange-800 font-medium bg-orange-200 px-4 py-1 rounded-full inline-block">
          Pilih kuis yang paling bikin kamu penasaran!
        </p>
      </div>

      {/* Daftar Kuis dalam Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        {daftarKuis.map((kuis) => (
          <Link 
            key={kuis.id} 
            href={`/cari-telur/${kuis.id}`}
            className={`group bg-white p-6 rounded-3xl shadow-md border-b-8 ${kuis.warna} hover:-translate-y-2 transition-all active:scale-95`}
          >
            <div className="text-5xl mb-4 group-hover:rotate-12 transition-transform italic">
              {kuis.ikon}
            </div>
            <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">
              {kuis.judul}
            </h3>
            <p className="text-sm text-gray-500 mt-1 font-medium italic">
              {kuis.deskripsi}
            </p>
            <div className="mt-4 inline-block bg-gray-100 text-gray-400 text-xs font-bold px-3 py-1 rounded-full group-hover:bg-orange-500 group-hover:text-white">
              MULAI PATOK →
            </div>
          </Link>
        ))}
      </div>

      {/* Info dari Bang Jago */}
      <div className="mt-12 p-4 bg-orange-100 rounded-2xl border-2 border-dashed border-orange-300 max-w-md text-center">
        <p className="text-sm text-orange-700 font-bold">
          "Kuis baru bakal menetas tiap minggu, jadi rajin-rajin cek kandang ya!" <br/>— Bang Jago
        </p>
      </div>
    </main>
  );
}