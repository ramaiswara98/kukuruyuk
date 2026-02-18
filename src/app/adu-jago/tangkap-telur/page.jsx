"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function TangkapTelur() {
  const [skor, setSkor] = useState(0);
  const [waktu, setWaktu] = useState(30); // Mode 30 Detik
  const [gameStart, setGameStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [basketPos, setBasketPos] = useState(50);
  const [telur, setTelur] = useState([]);
  
  const gameAreaRef = useRef(null);
  const requestRef = useRef();
  const lastTimeRef = useRef();

  const mulaiGame = () => {
    setSkor(0);
    setWaktu(30);
    setTelur([]);
    setGameStart(true);
    setGameOver(false);
  };

  const handleMouseMove = (e) => {
    if (!gameStart || gameOver) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setBasketPos(Math.max(5, Math.min(95, x))); // Biar gak terlalu ke pinggir
  };

  // Timer Countdown
  useEffect(() => {
    let timer;
    if (gameStart && waktu > 0) {
      timer = setInterval(() => setWaktu(w => w - 1), 1000);
    } else if (waktu === 0) {
      setGameOver(true);
      setGameStart(false);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [gameStart, waktu]);

  // Game Loop untuk Animasi Telur Jatuh
  const updateGame = (time) => {
    if (lastTimeRef.current !== undefined) {
      setTelur((prevTelur) => {
        let newTelur = prevTelur.map(t => ({ ...t, y: t.y + 1.2 })); // Kecepatan sedikit ditambah
        let filteredTelur = [];

        for (let t of newTelur) {
          // Cek kalau kena keranjang
          if (t.y >= 82 && t.y <= 88 && Math.abs(t.x - basketPos) < 10) {
            setSkor(s => s + 1);
            continue;
          }
          // Hapus kalau sudah lewat layar bawah
          if (t.y > 105) continue;

          filteredTelur.push(t);
        }

        // Munculkan telur baru (probabilitas ditambah biar rame)
        if (Math.random() < 0.05) {
          filteredTelur.push({ id: Math.random(), x: Math.random() * 90 + 5, y: -5 });
        }

        return filteredTelur;
      });
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(updateGame);
  };

  useEffect(() => {
    if (gameStart && !gameOver) {
      requestRef.current = requestAnimationFrame(updateGame);
    } else {
      cancelAnimationFrame(requestRef.current);
      lastTimeRef.current = undefined;
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameStart, gameOver, basketPos]);

  return (
    <main 
      className="min-h-screen bg-sky-400 flex flex-col items-center justify-center p-6 relative overflow-hidden touch-none select-none"
      onMouseMove={handleMouseMove}
      ref={gameAreaRef}
    >
      {/* Header Info */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-start z-20">
        <Link href="/adu-jago" className="bg-white text-sky-600 font-black px-6 py-2 rounded-2xl shadow-[0_4px_0_0_#e2e8f0]">
          ← ARENA
        </Link>
        <div className="flex gap-3">
          <div className="bg-white px-5 py-3 rounded-2xl shadow-xl border-b-4 border-gray-100 text-center min-w-[90px]">
            <p className="text-[10px] font-black text-gray-400 uppercase">Waktu</p>
            <p className={`text-2xl font-black ${waktu <= 5 ? 'text-red-500 animate-pulse' : 'text-sky-600'}`}>{waktu}s</p>
          </div>
          <div className="bg-yellow-400 px-5 py-3 rounded-2xl shadow-xl border-b-4 border-yellow-600 text-center min-w-[90px]">
            <p className="text-[10px] font-black text-yellow-800 uppercase">Skor</p>
            <p className="text-2xl font-black text-white">{skor}</p>
          </div>
        </div>
      </div>

      {!gameStart && !gameOver ? (
        <div className="bg-white p-10 rounded-[40px] shadow-2xl text-center max-w-sm border-b-[12px] border-sky-700 z-30">
          <div className="text-8xl mb-4 animate-bounce">🧺</div>
          <h1 className="text-4xl font-black text-gray-800 mb-2">EGG RUSH</h1>
          <p className="text-gray-500 font-medium mb-8">Tangkap telur sebanyak-banyaknya dalam <span className="text-sky-500 font-bold">30 detik!</span></p>
          <button onClick={mulaiGame} className="w-full bg-sky-500 hover:bg-sky-600 text-white font-black py-4 rounded-2xl shadow-[0_6px_0_0_#0369a1] active:translate-y-1 active:shadow-none transition-all">
            GAS TANGKAP!
          </button>
        </div>
      ) : gameOver ? (
        <div className="bg-white p-10 rounded-[40px] shadow-2xl text-center max-w-sm border-b-[12px] border-sky-700 z-30 animate-in zoom-in">
          <p className="text-sky-500 font-black uppercase">Waktu Habis!</p>
          <h2 className="text-6xl font-black text-gray-800 my-4">{skor}</h2>
          <div className="bg-sky-50 p-4 rounded-2xl mb-6 border-2 border-sky-100 italic font-bold text-sky-700">
            {skor > 40 ? "Gila! Kamu Magnet Telur! 🧲" : skor > 20 ? "Lumayan, Kandang Aman! 👍" : "Kurang gercep nih! 🍳"}
          </div>
          <button onClick={mulaiGame} className="w-full bg-sky-500 text-white font-black py-4 rounded-2xl shadow-lg mb-4">
            MAIN LAGI
          </button>
          <Link href="/adu-jago" className="text-gray-400 font-bold hover:text-sky-600">Balik ke Arena</Link>
        </div>
      ) : (
        <>
          {telur.map(t => (
            <div 
              key={t.id}
              className="absolute text-5xl pointer-events-none"
              style={{ top: `${t.y}%`, left: `${t.x}%`, transform: 'translateX(-50%)' }}
            >
              🥚
            </div>
          ))}
          <div 
            className="absolute bottom-12 text-8xl pointer-events-none transition-all duration-75"
            style={{ left: `${basketPos}%`, transform: 'translateX(-50%)' }}
          >
            🧺
          </div>
          <div className="absolute bottom-0 w-full h-12 bg-green-500 border-t-8 border-green-600"></div>
        </>
      )}
    </main>
  );
}