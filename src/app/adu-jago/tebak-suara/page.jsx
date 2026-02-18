"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

const databaseSuara = [
  { negara: "Indonesia", bunyi: "Kukuruyuk!", bendera: "🇮🇩" },
  { negara: "Amerika (Inggris)", bunyi: "Cock-a-doodle-doo!", bendera: "🇺🇸" },
  { negara: "Jepang", bunyi: "Ko-ke-kok-koo!", bendera: "🇯🇵" },
  { negara: "Perancis", bunyi: "Cocorico!", bendera: "🇫🇷" },
  { negara: "Italia", bunyi: "Chicchirichi!", bendera: "🇮🇹" },
  { negara: "Turki", bunyi: "Ü-ürü-üüü!", bendera: "🇹🇷" },
  { negara: "Korea Selatan", bunyi: "Kko-kki-yo!", bendera: "🇰🇷" },
  { negara: "Belanda", bunyi: "Kukeleku!", bendera: "🇳🇱" },
  { negara: "Jerman", bunyi: "Kikeriki!", bendera: "🇩🇪" },
  { negara: "Thailand", bunyi: "Ek-ee-ek-ek!", bendera: "🇹🇭" },
];

export default function TebakKukuruyukDunia() {
  const [ronde, setRonde] = useState(1);
  const [skor, setSkor] = useState(0);
  const [soal, setSoal] = useState(null);
  const [pilihan, setPilihan] = useState([]);
  const [status, setStatus] = useState('playing'); // playing, result
  const [jawabanUser, setJawabanUser] = useState(null);

  const buatSoal = () => {
    const acak = databaseSuara[Math.floor(Math.random() * databaseSuara.length)];
    // Ambil 3 pilihan salah
    const salah = databaseSuara
      .filter(s => s.negara !== acak.negara)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    const semuaPilihan = [...salah, acak].sort(() => 0.5 - Math.random());
    
    setSoal(acak);
    setPilihan(semuaPilihan);
    setStatus('playing');
    setJawabanUser(null);
  };

  useEffect(() => {
    buatSoal();
  }, []);

  const cekJawaban = (negara) => {
    if (status !== 'playing') return;
    setJawabanUser(negara);
    if (negara === soal.negara) {
      setSkor(s => s + 1);
    }
    setStatus('result');
  };

  if (!soal) return null;

  return (
    <main className="min-h-screen bg-orange-500 flex flex-col items-center justify-center p-6 text-sans">
      
      {/* Tombol Kembali */}
      <div className="absolute top-6 left-6">
        <Link href="/adu-jago" className="bg-white/20 hover:bg-white/40 text-white font-black px-4 py-2 rounded-full border border-white/30 text-sm">
          ← KABUR
        </Link>
      </div>

      {/* Score Board */}
      <div className="mb-8 text-center">
        <div className="bg-white px-6 py-2 rounded-full shadow-lg inline-block">
          <span className="text-orange-600 font-black">SKOR: {skor}</span>
        </div>
      </div>

      <div className="bg-white w-full max-w-xl rounded-[40px] shadow-[0_15px_0_0_rgba(154,52,18,1)] p-8 text-center relative overflow-hidden">
        
        {/* Dekorasi Awan Suara */}
        <div className="mb-6">
          <p className="text-gray-400 font-black uppercase text-xs tracking-widest mb-2">Suara Ayam dari antah berantah:</p>
          <div className="bg-orange-100 p-8 rounded-[32px] border-4 border-dashed border-orange-300 relative">
            <span className="text-4xl sm:text-5xl font-black text-orange-600 animate-pulse">
              "{soal.bunyi}"
            </span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-700 mb-6">Negara mana yang bunyinya begini?</h2>

        {/* Pilihan Jawaban */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {pilihan.map((p, idx) => (
            <button
              key={idx}
              onClick={() => cekJawaban(p.negara)}
              disabled={status === 'result'}
              className={`
                p-4 rounded-2xl font-black text-lg border-b-4 transition-all
                ${status === 'playing' ? 'bg-orange-50 border-orange-200 hover:bg-orange-100 active:translate-y-1' : ''}
                ${status === 'result' && p.negara === soal.negara ? 'bg-green-500 border-green-700 text-white' : ''}
                ${status === 'result' && jawabanUser === p.negara && p.negara !== soal.negara ? 'bg-red-500 border-red-700 text-white' : ''}
                ${status === 'result' && p.negara !== soal.negara && jawabanUser !== p.negara ? 'opacity-50 bg-gray-100 border-gray-200 text-gray-400' : ''}
              `}
            >
              <span className="mr-2">{p.bendera}</span> {p.negara}
            </button>
          ))}
        </div>

        {/* Tombol Lanjut */}
        {status === 'result' && (
          <button 
            onClick={() => {
              setRonde(r => r + 1);
              buatSoal();
            }}
            className="w-full bg-orange-600 text-white font-black py-4 rounded-2xl shadow-[0_6px_0_0_#9a3412] active:translate-y-1 active:shadow-none transition-all"
          >
            RONDE BERIKUTNYA →
          </button>
        )}
      </div>

      <p className="mt-8 text-orange-200 font-medium italic text-center max-w-xs">
        Ternyata ayam Amerika lebih suka "Cock-a-doodle-doo" daripada "Kukuruyuk". Gaya banget ya?
      </p>
    </main>
  );
}