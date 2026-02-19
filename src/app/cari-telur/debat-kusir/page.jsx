"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function DebatKusir() {
  const [currentKuis, setCurrentKuis] = useState(0);
  const [voted, setVoted] = useState(false);
  const [stats, setStats] = useState({ a: 0, b: 0 });

  const daftarKuis = [
  {
    tanya: "Cara makan bubur ayam yang benar?",
    opsiA: "Diaduk (Sekte Sesat)",
    opsiB: "Gak Diaduk (Sekte Estetik)",
    ikon: "🥣"
  },
  {
    tanya: "Timun di nasi goreng itu...",
    opsiA: "Dimakan (Seger Bos)",
    opsiB: "Disingkirkan (Hiasan Doang)",
    ikon: "🥒"
  },
  {
    tanya: "Mandi sore pas hari libur?",
    opsiA: "Wajib (Biar Seger)",
    opsiB: "Opsional (Sayang Air)",
    ikon: "🚿"
  },
  {
    tanya: "Indomie Goreng pake nasi?",
    opsiA: "Wajib (Kuli Pride)",
    opsiB: "Ilegal (Karbo Overload)",
    ikon: "🍜"
  },
  {
    tanya: "Nasi Padang dibungkus vs makan di tempat?",
    opsiA: "Bungkus (Porsinya Dobel)",
    opsiB: "Makan Sini (Bisa Nambah Kuah)",
    ikon: "🍱"
  },
  {
    tanya: "Martabak itu sebutannya...",
    opsiA: "Martabak Manis",
    opsiB: "Terang Bulan",
    ikon: "🥞"
  },
  {
    tanya: "Makan Bakso pake saos melimpah sampai merah?",
    opsiA: "Wajib (Gak Merah Gak Enak)",
    opsiB: "Dikit Aja (Rusak Rasa Kuah)",
    ikon: "🍡"
  },
  {
    tanya: "Pizza pake topping nanas?",
    opsiA: "Enak (Seger Manis)",
    opsiB: "Kriminal (Gak Masuk Akal)",
    ikon: "🍕"
  },
  {
    tanya: "Telor ceplok dimakan bagian mana dulu?",
    opsiA: "Kuningnya Terakhir (Puncak Nikmat)",
    opsiB: "Kuningnya Dulu (Biar Gak Pecah)",
    ikon: "🍳"
  },
  {
    tanya: "Nambah sambal pas makan itu...",
    opsiA: "Gak Level Kalau Gak Pedes",
    opsiB: "Kasihan Perut Besok Pagi",
    ikon: "🌶️"
  },
  {
    tanya: "Kulit ayam krispi dimakan...",
    opsiA: "Di Awal (Biar Gak Ilfeel)",
    opsiB: "Paling Terakhir (Harta Karun)",
    ikon: "🍗"
  },
  {
    tanya: "Kerupuk itu dimakan...",
    opsiA: "Dicelup ke Kuah (Biar Lembek)",
    opsiB: "Tetap Kering (Wajib KRIUK)",
    ikon: "🍘"
  },
  {
    tanya: "Nunggu balasan chat gebetan seharian?",
    opsiA: "Sabar (Mungkin Dia Sibuk)",
    opsiB: "Blokir (Gak Butuh PHP)",
    ikon: "📱"
  },
  {
    tanya: "Minum Es Teh pas lagi ujan deras?",
    opsiA: "Mantap (Seger Lah)",
    opsiB: "Cari Penyakit (Teh Anget Dong)",
    ikon: "🍹"
  },
  {
    tanya: "Buku itu dibaca...",
    opsiA: "Sampe Abis Baru Beli Lagi",
    opsiB: "Beli Terus, Bacanya Nanti",
    ikon: "📚"
  },
  {
    tanya: "Pake Kaus Kaki pas lagi tidur?",
    opsiA: "Nyaman (Hangat Bos)",
    opsiB: "Aneh (Berasa Lagi Sekolah)",
    ikon: "🧦"
  },
  {
    tanya: "Makan Sate, tusuknya dilepas dulu?",
    opsiA: "Dilepas (Biar Gak Repot)",
    opsiB: "Langsung Tarik (Seni Makan Sate)",
    ikon: "🍢"
  },
  {
    tanya: "Cara buka kulit pisang yang bener?",
    opsiA: "Dari Atas (Tangkainya)",
    opsiB: "Dari Bawah (Buntutnya)",
    ikon: "🍌"
  },
  {
    tanya: "Nonton Film horor di bioskop?",
    opsiA: "Berani (Gak Pake Merem)",
    opsiB: "Tutup Muka Sepanjang Film",
    ikon: "👻"
  },
  {
    tanya: "Kalo sikat gigi, sikatnya dikasih air dulu?",
    opsiA: "Basahin Dulu (Biar Berbusa)",
    opsiB: "Langsung Kasih Pasta Gigi",
    ikon: "🪥"
  },
  {
    tanya: "Makan nasi pake sendok vs tangan kosong?",
    opsiA: "Tangan (Nikmat Tiada Tara)",
    opsiB: "Sendok (Biar Higienis)",
    ikon: "🖐️"
  },
  {
    tanya: "Es krim dimakan pake apa?",
    opsiA: "Dijilat (Seni Menikmati)",
    opsiB: "Digigit (Linu Bodo Amat)",
    ikon: "🍦"
  },
  {
    tanya: "Cara buka bungkus snack/chiki?",
    opsiA: "Ditarik Pinggir (Sesuai Petunjuk)",
    opsiB: "Dirobek Tengah (Gaya Prasmanan)",
    ikon: "🥨"
  },
  {
    tanya: "Liburan pilih ke mana?",
    opsiA: "Gunung (Dingin & Tenang)",
    opsiB: "Pantai (Panas & Asik)",
    ikon: "⛰️"
  },
  {
    tanya: "Nonton TV sambil makan atau makan doang?",
    opsiA: "Sambil Nonton (Wajib)",
    opsiB: "Fokus Makan (Biar Barokah)",
    ikon: "📺"
  }
];

  const handleVote = (opsi) => {
    // Simulasi persentase random biar keliatan ada yang voting
    const fakeA = Math.floor(Math.random() * 100);
    const fakeB = 100 - fakeA;
    
    setStats({ a: fakeA, b: fakeB });
    setVoted(true);
  };

  const nextKuis = () => {
    setVoted(false);
    setCurrentKuis((prev) => (prev + 1) % daftarKuis.length);
  };

  const kuis = daftarKuis[currentKuis];

  return (
    <main className="min-h-screen bg-[#020617] text-white p-6 flex flex-col items-center justify-center">
      {/* Header */}
      <div className="w-full max-w-md mb-10 flex justify-between items-center">
        <Link href="/adu-jago" className="text-slate-500 font-black text-xs hover:text-white transition">← KABUR</Link>
        <span className="bg-red-600 px-3 py-1 rounded-full text-[10px] font-black italic animate-pulse">LIVE DEBAT</span>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <span className="text-7xl mb-4 block">{kuis.ikon}</span>
          <h1 className="text-3xl font-black italic tracking-tighter leading-tight">
            {kuis.tanya}
          </h1>
          <p className="text-slate-500 text-xs mt-2 uppercase tracking-widest font-bold">Pilih nasibmu sekarang!</p>
        </div>

        {!voted ? (
          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={() => handleVote('a')}
              className="group relative overflow-hidden bg-slate-900 border-2 border-slate-800 p-6 rounded-[2rem] text-left hover:border-indigo-500 transition-all active:scale-95"
            >
              <span className="text-slate-500 font-black mr-2">A.</span>
              <span className="font-black text-lg">{kuis.opsiA}</span>
            </button>

            <button 
              onClick={() => handleVote('b')}
              className="group relative overflow-hidden bg-slate-900 border-2 border-slate-800 p-6 rounded-[2rem] text-left hover:border-pink-500 transition-all active:scale-95"
            >
              <span className="text-slate-500 font-black mr-2">B.</span>
              <span className="font-black text-lg">{kuis.opsiB}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in zoom-in duration-300">
            {/* Bar Statistik A */}
            <div className="relative h-20 bg-slate-900 rounded-[2rem] border-2 border-indigo-500 overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-indigo-600 transition-all duration-1000" 
                style={{ width: `${stats.a}%` }}
              />
              <div className="absolute inset-0 flex justify-between items-center px-6 font-black italic">
                <span>{kuis.opsiA}</span>
                <span className="text-2xl">{stats.a}%</span>
              </div>
            </div>

            {/* Bar Statistik B */}
            <div className="relative h-20 bg-slate-900 rounded-[2rem] border-2 border-pink-500 overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-pink-600 transition-all duration-1000" 
                style={{ width: `${stats.b}%` }}
              />
              <div className="absolute inset-0 flex justify-between items-center px-6 font-black italic">
                <span>{kuis.opsiB}</span>
                <span className="text-2xl">{stats.b}%</span>
              </div>
            </div>

            <button 
              onClick={nextKuis}
              className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-yellow-400 transition shadow-[0_6px_0_0_#94a3b8] active:translate-y-1 active:shadow-none"
            >
              DEBAT SELANJUTNYA →
            </button>
          </div>
        )}
      </div>

      <footer className="mt-20 text-slate-700 text-[10px] font-black tracking-[0.3em] uppercase">
        Hasil voting tidak menentukan kualitas hidup anda
      </footer>
    </main>
  );
}