"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PatokKecepatan() {
  const [skor, setSkor] = useState(0);
  const [waktu, setWaktu] = useState(10);
  const [gameStart, setGameStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [posisi, setPosisi] = useState({ top: '50%', left: '50%' });
  const [feedback, setFeedback] = useState("");

  // Acak posisi Bang Jago
  const acakPosisi = () => {
    const t = Math.floor(Math.random() * 70) + 15;
    const l = Math.floor(Math.random() * 70) + 15;
    setPosisi({ top: `${t}%`, left: `${l}%` });
  };

  const mulaiGame = () => {
    setSkor(0);
    setWaktu(10);
    setGameStart(true);
    setGameOver(false);
    setFeedback("GAS!");
    acakPosisi();
  };

  const patokAyam = (e) => {
    e.stopPropagation(); // Biar gak kena klik background
    if (gameStart && !gameOver) {
      setSkor(s => s + 1);
      setFeedback("POW! 💥");
      acakPosisi();
      // Hilangkan feedback setelah 300ms
      setTimeout(() => setFeedback(""), 300);
    }
  };

  const klikMeleset = () => {
    if (gameStart && !gameOver) {
      setFeedback("MISS! 💨");
      setTimeout(() => setFeedback(""), 300);
    }
  };

  useEffect(() => {
    let timer;
    if (gameStart && waktu > 0) {
      timer = setInterval(() => setWaktu(w => w - 1), 1000);
    } else if (waktu === 0) {
      setGameOver(true);
      setGameStart(false);
      setFeedback("WAKTU HABIS!");
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [gameStart, waktu]);

  const dapatGelar = () => {
    if (skor > 40) return { nama: "Dewa Patok", desk: "Jari kamu terbuat dari mesin jet ya?" };
    if (skor > 25) return { nama: "Jagoan Pro", desk: "Bang Jago sampai kewalahan kaburnya!" };
    if (skor > 10) return { nama: "Ayam Sayur", desk: "Lumayan, tapi masih kurang gesit." };
    return { nama: "Telor Asin", desk: "Lemas amat, ayo sarapan jagung dulu!" };
  };

  return (
    <main 
      className="min-h-screen bg-red-600 flex flex-col items-center justify-center p-6 relative overflow-hidden cursor-crosshair"
      onClick={klikMeleset}
    >
      {/* HUD (Heads-Up Display) */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-start z-20 pointer-events-none">
        <Link href="/adu-jago" className="bg-white text-red-600 font-black px-6 py-3 rounded-2xl shadow-[0_4px_0_0_#991b1b] pointer-events-auto active:translate-y-1 active:shadow-none transition-all">
          ← ARENA
        </Link>
        <div className="flex gap-4">
          <div className="bg-yellow-400 p-4 rounded-2xl shadow-xl border-b-4 border-yellow-600 text-center min-w-[100px]">
            <p className="text-[10px] font-black uppercase text-yellow-800">Skor</p>
            <p className="text-3xl font-black text-white">{skor}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-xl border-b-4 border-gray-200 text-center min-w-[100px]">
            <p className="text-[10px] font-black uppercase text-gray-400">Waktu</p>
            <p className="text-3xl font-black text-red-600">{waktu}s</p>
          </div>
        </div>
      </div>

      {/* Floating Feedback Text */}
      {feedback && (
        <div className="absolute top-1/4 pointer-events-none animate-bounce">
          <span className="text-5xl font-black text-yellow-300 drop-shadow-lg italic uppercase">
            {feedback}
          </span>
        </div>
      )}

      {!gameStart && !gameOver ? (
        <div className="bg-white p-10 rounded-[40px] shadow-2xl text-center max-w-sm border-b-[12px] border-red-800">
          <div className="text-8xl mb-4 animate-bounce">🐓</div>
          <h1 className="text-4xl font-black text-gray-800 mb-2">PATOK KECEPATAN</h1>
          <p className="text-gray-500 font-medium mb-8">Klik Bang Jago sebanyak mungkin dalam 10 detik!</p>
          <button 
            onClick={mulaiGame}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-black py-4 rounded-2xl shadow-[0_8px_0_0_#991b1b] active:translate-y-1 active:shadow-none transition-all text-xl"
          >
            MULAI BERTANDING!
          </button>
        </div>
      ) : gameOver ? (
        <div className="bg-white p-10 rounded-[40px] shadow-2xl text-center max-w-sm border-b-[12px] border-red-800 animate-in zoom-in duration-300">
          <p className="text-red-500 font-black uppercase tracking-widest">Skor Akhir</p>
          <h2 className="text-7xl font-black text-gray-800 mb-6">{skor}</h2>
          <div className="bg-orange-100 p-6 rounded-3xl mb-8 border-2 border-orange-200">
            <p className="text-xs font-bold text-orange-400 uppercase">Gelar Kamu</p>
            <h3 className="text-2xl font-black text-orange-600 mb-1">{dapatGelar().nama}</h3>
            <p className="text-sm text-orange-800 italic">{dapatGelar().desk}</p>
          </div>
          <div className="flex flex-col gap-3">
            <button 
              onClick={mulaiGame}
              className="w-full bg-red-500 text-white font-black py-4 rounded-2xl shadow-lg"
            >
              MAIN LAGI
            </button>
            <Link href="/adu-jago" className="text-gray-400 font-bold hover:text-red-600 transition">
              Balik ke Lobi Arena
            </Link>
          </div>
        </div>
      ) : (
        /* Target Bang Jago */
        <div
          onClick={patokAyam}
          style={{ top: posisi.top, left: posisi.left }}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-75 select-none active:scale-150"
        >
          <div className="text-8xl hover:rotate-12 transition-transform drop-shadow-2xl">
            🐓
          </div>
          {/* Efek Lingkaran Target */}
          <div className="absolute inset-0 border-4 border-yellow-400 rounded-full animate-ping opacity-50"></div>
        </div>
      )}

      {/* Background Decor */}
      <div className="absolute bottom-10 left-10 text-9xl opacity-10 rotate-12 pointer-events-none">🥊</div>
      <div className="absolute top-10 right-10 text-9xl opacity-10 -rotate-12 pointer-events-none">🐓</div>
    </main>
  );
}