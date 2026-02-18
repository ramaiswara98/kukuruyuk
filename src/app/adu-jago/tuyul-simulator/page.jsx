"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TuyulSimulator() {
  const [skor, setSkor] = useState(0);
  const [status, setStatus] = useState('idle'); // idle, playing, caught, win
  const [isSenterAktif, setIsSenterAktif] = useState(false);
  const [isGerak, setIsGerak] = useState(false);
  const [waktu, setWaktu] = useState(30);

  // Logika Patroli Senter (Acak)
  useEffect(() => {
    let timeout;
    if (status === 'playing') {
      const loopSenter = () => {
        const jeda = isSenterAktif ? Math.random() * 2000 + 1000 : Math.random() * 3000 + 500;
        timeout = setTimeout(() => {
          setIsSenterAktif(!isSenterAktif);
          loopSenter();
        }, jeda);
      };
      loopSenter();
    }
    return () => clearTimeout(timeout);
  }, [status, isSenterAktif]);

  // Logika Cek Ketangkep
  useEffect(() => {
    if (status === 'playing' && isSenterAktif && isGerak) {
      setStatus('caught');
    }
  }, [isSenterAktif, isGerak, status]);

  // Timer
  useEffect(() => {
    let timer;
    if (status === 'playing' && waktu > 0) {
      timer = setInterval(() => setWaktu(w => w - 1), 1000);
    } else if (waktu === 0 && status === 'playing') {
      setStatus('win');
    }
    return () => clearInterval(timer);
  }, [status, waktu]);

  const mulaiGame = () => {
    setSkor(0);
    setWaktu(30);
    setStatus('playing');
    setIsSenterAktif(false);
  };

  const ambilKoin = () => {
    if (status === 'playing') {
      setSkor(s => s + 100);
      // Efek visual gerak singkat
      setIsGerak(true);
      setTimeout(() => setIsGerak(false), 100);
    }
  };

  return (
    <main className={`min-h-screen transition-colors duration-500 flex flex-col items-center justify-center p-6 relative overflow-hidden ${isSenterAktif ? 'bg-yellow-100' : 'bg-slate-900'}`}>
      
      {/* Header UI */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-start z-20">
        <Link href="/adu-jago" className="bg-white/20 backdrop-blur-md text-white font-black px-6 py-2 rounded-full border border-white/30">
          ← KABUR
        </Link>
        <div className="flex gap-4">
          <div className="bg-black/50 text-white px-4 py-2 rounded-2xl border border-white/20">
            <p className="text-[10px] font-bold uppercase opacity-60">Hasil Curian</p>
            <p className="text-xl font-black text-yellow-400">Rp {skor.toLocaleString()}</p>
          </div>
          <div className="bg-black/50 text-white px-4 py-2 rounded-2xl border border-white/20">
            <p className="text-[10px] font-bold uppercase opacity-60">Sisa Waktu</p>
            <p className="text-xl font-black">{waktu}s</p>
          </div>
        </div>
      </div>

      {/* Area Tengah */}
      {status === 'idle' ? (
        <div className="bg-white p-10 rounded-[40px] shadow-2xl text-center max-w-sm">
          <div className="text-8xl mb-4">👶</div>
          <h1 className="text-3xl font-black text-gray-800 mb-2">TUYUL SIMULATOR</h1>
          <p className="text-gray-500 mb-8">Klik tombol <b>AMBIL KOIN</b> saat gelap. Jangan gerak pas ada senter!</p>
          <button onClick={mulaiGame} className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-lg">BERAKSI!</button>
        </div>
      ) : status === 'caught' ? (
        <div className="bg-white p-10 rounded-[40px] shadow-2xl text-center max-w-sm border-b-[12px] border-red-600 animate-bounce">
          <div className="text-8xl mb-4">🔦😲</div>
          <h2 className="text-3xl font-black text-red-600 mb-2">KETINGANGA!</h2>
          <p className="text-gray-500 mb-6 font-medium text-sm italic text-balance">Kamu ketahuan warga pas lagi mau ambil seribuan.</p>
          <button onClick={mulaiGame} className="w-full bg-slate-800 text-white font-black py-4 rounded-2xl shadow-lg">COBA LAGI</button>
        </div>
      ) : status === 'win' ? (
        <div className="bg-white p-10 rounded-[40px] shadow-2xl text-center max-w-sm border-b-[12px] border-green-600">
          <div className="text-8xl mb-4">💰</div>
          <h2 className="text-3xl font-black text-green-600 mb-2">SUKSES BERAKSI!</h2>
          <p className="text-gray-600 mb-6 font-bold uppercase">Total: Rp {skor.toLocaleString()}</p>
          <button onClick={mulaiGame} className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-lg">MAIN LAGI</button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {/* Karakter Tuyul */}
          <div className={`text-9xl transition-all duration-75 ${isGerak ? 'scale-110 -translate-y-2' : 'scale-100'}`}>
            {isSenterAktif ? '😳' : '👶'}
          </div>
          
          {/* Senter Indikator */}
          {isSenterAktif && (
            <div className="mt-4 bg-yellow-400 text-yellow-900 font-black px-4 py-1 rounded-full animate-pulse text-xs uppercase tracking-tighter">
              ⚠️ ADA SENTER! JANGAN KLIK! ⚠️
            </div>
          )}

          {/* Tombol Aksi */}
          <button 
            onMouseDown={ambilKoin}
            className={`mt-20 w-32 h-32 rounded-full font-black text-white text-xl shadow-2xl transition-all active:scale-90 ${isSenterAktif ? 'bg-slate-700 opacity-50' : 'bg-yellow-500 hover:bg-yellow-400'}`}
          >
            AMBIL<br/>KOIN
          </button>
        </div>
      )}

      {/* Atmosfer Malam */}
      {!isSenterAktif && status === 'playing' && (
        <div className="absolute bottom-10 flex gap-4 opacity-20 pointer-events-none">
          <span className="text-4xl animate-pulse">🦗</span>
          <span className="text-4xl animate-pulse delay-75">🦗</span>
        </div>
      )}
    </main>
  );
}