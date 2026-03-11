"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function FiturMaut() {
  // State Jodoh
  const [nama1, setNama1] = useState('');
  const [nama2, setNama2] = useState('');
  const [hasilJodoh, setHasilJodoh] = useState(null);



  // Fungsi Cek Jodoh
  const cekJodoh = (e) => {
    e.preventDefault();
    if (!nama1 || !nama2) return;
    
    const persen = Math.floor(Math.random() * 101);
    let komen = "";

    if (persen > 80) komen = "Wah, cocok banget! Tapi biasanya yang cocok banget cepet putus.";
    else if (persen > 50) komen = "Lumayan lah, tapi kayaknya dia sering chat sama mantan.";
    else if (persen > 20) komen = "Mending temenan aja, itu juga kalau dia mau.";
    else komen = "Jauh-jauh deh, kalian itu kayak minyak ama air, gak bakal nyatu!";

    setHasilJodoh({ persen, komen });
  };

 

 

  return (
    <main className="min-h-screen bg-[#020617] text-white p-6 pb-20">
      <Link href="/cari-telur" className="text-slate-500 font-bold hover:text-white transition">← KABUR</Link>

      <div className="max-w-md mx-auto space-y-12 mt-10">
        
        {/* --- SECTION JODOH --- */}
        <section className="bg-slate-900/50 border-2 border-pink-500/30 p-8 rounded-[2.5rem]">
          <div className="text-center mb-6">
            <span className="text-5xl">💖</span>
            <h2 className="text-2xl font-black italic tracking-tighter">LOVE METER</h2>
            <p className="text-slate-500 text-xs">Seberapa hancur hubungan kalian?</p>
          </div>

          <form onSubmit={cekJodoh} className="space-y-4">
            <input 
              type="text" placeholder="Nama Kamu" 
              className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl focus:outline-none focus:border-pink-500 transition"
              value={nama1} onChange={(e) => setNama1(e.target.value)}
            />
            <input 
              type="text" placeholder="Nama Pasangan/Gebetan" 
              className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl focus:outline-none focus:border-pink-500 transition"
              value={nama2} onChange={(e) => setNama2(e.target.value)}
            />
            <button className="w-full bg-pink-600 hover:bg-pink-500 font-black py-4 rounded-2xl transition shadow-[0_4px_0_0_#9d174d]">
              CEK KECOCOKAN →
            </button>
          </form>

          {hasilJodoh && (
            <div className="mt-8 text-center animate-bounce">
              <div className="text-6xl font-black text-pink-500">{hasilJodoh.persen}%</div>
              <p className="mt-2 font-bold italic text-slate-300">"{hasilJodoh.komen}"</p>
            </div>
          )}
        </section>

       
      </div>
    </main>
  );
}