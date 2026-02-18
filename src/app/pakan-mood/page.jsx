"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function PakanMood() {
  const [menuAktif, setMenuAktif] = useState('utama'); // utama, mood-booster, konten
  const [loading, setLoading] = useState(false);
  const [hasil, setHasil] = useState(null);

  const database = {
    quotes: [
      "Jangan pernah menyerah, ingat cicilanmu tidak akan lunas dengan menangis.",
      "Masa depanmu tergantung pada impianmu, jadi pergilah tidur sekarang juga.",
      "Pekerjaan seberat apapun akan terasa ringan jika tidak dikerjakan.",
      "Jadilah seperti kopi, sudah hitam, pahit, tapi banyak yang cari. Kamu? Sudah pahit, nggak dicari pula."
    ],
    jokes: [
      "Kenapa zombie kalau nyerang bareng-bareng? Karena kalau sendirian namanya zomblo.",
      "Ikan apa yang berhenti? Ikan 'Pause'.",
      "Sayur apa yang jago nyanyi? 'Kol-play'.",
      "Kenapa superman bajunya pake huruf S? Karena kalau pake M jadinya Suparman."
    ],
    fakta: [
      "Tahukah kamu? Semut tidak punya paru-paru, tapi etos kerjanya lebih tinggi dari kamu.",
      "Kecoak bisa hidup 9 hari tanpa kepala, sedangkan kamu diputusin sehari aja udah mau mati.",
      "Otak manusia lebih aktif saat tidur daripada nonton sinetron.",
      "Udang itu darahnya biru, kayak cintaku padanya yang cuma berakhir jadi memar biru."
    ],
    ramalan: [
      "Nasibmu hari ini: Akan ada bau-bau uang, tapi ternyata itu cuma bau dompet kulit kosong.",
      "Zodiak hari ini: Keuanganmu seperti es krim di siang bolong, cepat habis sebelum dinikmati.",
      "Ramalan Karir: Bosmu akan tersenyum padamu hari ini. Pertanda dia lupa namamu.",
      "Asmara: Akan ada yang mendekat, tapi ternyata cuma mau nawarin asuransi."
    ],
    roasting: {
      senang: "Cie lagi seneng... Paling besok juga saldo ATM sisa 50 ribu langsung meriang.",
      sedih: "Sedih mulu, kamu itu manusia apa lagu galau tahun 2000-an?",
      marah: "Marah-marah mulu, darah tinggi naik, nanti kalau mati yang dapet warisan siapa? Selingkuhan?",
      gabut: "Gabut itu tanda kamu nggak punya tujuan hidup. Mending cuci piring sana!"
    },
    memes: [
      { deskripsi: "Meme Kucing Capek", link: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=500&auto=format&fit=crop" },
      { deskripsi: "Meme Anjing Bingung", link: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=500&auto=format&fit=crop" }
    ]
  };

  const getPakan = (tipe) => {
    setLoading(true);
    setMenuAktif('konten');
    setTimeout(() => {
      const data = database[tipe];
      const random = data[Math.floor(Math.random() * data.length)];
      setHasil({ tipe: tipe.toUpperCase(), isi: random });
      setLoading(false);
    }, 700);
  };

  const getRoasting = (mood) => {
    setLoading(true);
    setMenuAktif('konten');
    setTimeout(() => {
      setHasil({ tipe: 'ROASTING MOOD', isi: database.roasting[mood] });
      setLoading(false);
    }, 700);
  };

  return (
    <main className="min-h-screen bg-[#0a0f1e] text-slate-200 p-4 sm:p-6 flex flex-col items-center font-sans overflow-x-hidden">
      
      {/* Tombol Back ke Lobi */}
      <div className="w-full max-w-md mb-8 flex items-center">
        <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-white font-black transition text-sm">
          <span className="text-xl">←</span> KEMBALI KE LOBI
        </Link>
      </div>

      {/* 1. MENU UTAMA */}
      {menuAktif === 'utama' && (
        <div className="w-full max-w-md animate-in fade-in slide-in-from-top-4 duration-500">
          <h1 className="text-5xl font-black text-white italic mb-2 tracking-tighter">PAKAN MOOD 🍗</h1>
          <p className="text-slate-500 mb-8 font-medium">Asupan mental biar nggak gila-gila banget.</p>
          
          <div className="grid grid-cols-1 gap-4">
            {[
              { id: 'quotes', label: 'Random Quotes', icon: '📜', sub: 'Biar keliatan bijak' },
              { id: 'jokes', label: 'Jokes Bapak-bapak', icon: '🧔', sub: 'Receh tingkat dewa' },
              { id: 'memes', label: 'Random Meme', icon: '🖼️', sub: 'Dopamin instan' },
              { id: 'fakta', label: 'Fakta Unik/Aneh', icon: '🕵️', sub: 'Biar nggak kuper' },
              { id: 'ramalan', label: 'Ramalan Nasib', icon: '🔮', sub: 'Cek keberuntunganmu' },
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => getPakan(item.id)} 
                className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 p-5 rounded-[2rem] transition-all hover:bg-indigo-600 hover:border-indigo-400 group text-left"
              >
                <span className="text-3xl group-hover:scale-125 transition-transform">{item.icon}</span>
                <div>
                  <p className="font-black text-white group-hover:text-white leading-none">{item.label}</p>
                  <p className="text-[10px] text-slate-500 group-hover:text-indigo-200 uppercase mt-1 tracking-widest">{item.sub}</p>
                </div>
              </button>
            ))}

            {/* Tombol Spesial Mood Booster */}
            <button 
              onClick={() => setMenuAktif('mood-booster')} 
              className="flex items-center gap-4 bg-yellow-500 p-6 rounded-[2rem] text-black hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-yellow-500/10"
            >
              <span className="text-4xl">🚀</span>
              <div className="text-left">
                <p className="font-black text-xl leading-none italic">MOOD BOOSTER</p>
                <p className="text-[11px] font-bold opacity-80 uppercase tracking-tighter">Gimana perasaanmu hari ini?</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* 2. MENU PILIH MOOD (ROASTING) */}
      {menuAktif === 'mood-booster' && (
        <div className="w-full max-w-md animate-in zoom-in duration-300">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white italic">LAGI MERASA APA?</h2>
            <p className="text-slate-500 uppercase text-xs tracking-[0.2em]">Pilih satu untuk di-roasting</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => getRoasting('senang')} className="p-8 bg-slate-900 border-2 border-yellow-500 rounded-[2.5rem] text-5xl hover:bg-yellow-500 transition-all active:scale-90">😊</button>
            <button onClick={() => getRoasting('sedih')} className="p-8 bg-slate-900 border-2 border-blue-500 rounded-[2.5rem] text-5xl hover:bg-blue-500 transition-all active:scale-90">😢</button>
            <button onClick={() => getRoasting('marah')} className="p-8 bg-slate-900 border-2 border-red-500 rounded-[2.5rem] text-5xl hover:bg-red-500 transition-all active:scale-90">😡</button>
            <button onClick={() => getRoasting('gabut')} className="p-8 bg-slate-900 border-2 border-slate-500 rounded-[2.5rem] text-5xl hover:bg-slate-500 transition-all active:scale-90">😐</button>
          </div>
          
          <button 
            onClick={() => setMenuAktif('utama')} 
            className="w-full mt-10 text-slate-500 font-bold hover:text-white transition"
          >
            ← Gak jadi, mau menu lain
          </button>
        </div>
      )}

      {/* 3. SCREEN HASIL (CARD) */}
      {menuAktif === 'konten' && (
        <div className="w-full max-w-md flex flex-col items-center">
          {loading ? (
            <div className="mt-32 flex flex-col items-center">
              <div className="text-7xl animate-bounce mb-6">🍗</div>
              <p className="font-black text-yellow-500 tracking-[0.3em] uppercase text-sm animate-pulse">Menyiapkan Pakan...</p>
            </div>
          ) : (
            <div className="w-full animate-in zoom-in slide-in-from-bottom-10 duration-500">
              <div className="bg-white text-black p-10 rounded-[3rem] shadow-[0_20px_0_0_#1e293b] border-x-4 border-t-4 border-black relative">
                
                {/* Badge Tipe */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-1 rounded-full text-[10px] font-black tracking-[0.2em]">
                  {hasil?.tipe}
                </div>

                <div className="mt-4 text-center">
                  {typeof hasil?.isi === 'object' ? (
                    /* Jika Meme (Objek) */
                    <div className="flex flex-col items-center">
                      <img 
                        src={hasil.isi.link} 
                        alt="meme" 
                        className="rounded-3xl mb-6 border-4 border-black shadow-xl w-full object-cover aspect-square" 
                      />
                      <p className="text-lg font-black italic text-slate-500">"{hasil.isi.deskripsi}"</p>
                    </div>
                  ) : (
                    /* Jika Teks Biasa (String) */
                    <p className="text-2xl font-black leading-tight italic py-4">
                      "{hasil?.isi}"
                    </p>
                  )}
                </div>

                <div className="mt-10 pt-6 border-t-2 border-dashed border-slate-200">
                  <button 
                    onClick={() => setMenuAktif('utama')} 
                    className="w-full bg-indigo-600 text-white font-black py-5 rounded-[1.5rem] hover:bg-indigo-700 transition shadow-[0_6px_0_0_#312e81] active:translate-y-1 active:shadow-none"
                  >
                    MINTA JATAH LAGI
                  </button>
                </div>
              </div>
              
              <p className="text-center mt-12 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                Bang Jago • Pakan Mood v1.0
              </p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}