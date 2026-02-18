"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AduPanco() {
  const [posisi, setPosisi] = useState(50); // 0 (User menang) - 100 (Bang Jago menang)
  const [status, setStatus] = useState('idle'); // idle, playing, win, lose
  const [difficulty, setDifficulty] = useState(0.3); // Kekuatan dorong Bang Jago
  
  const requestRef = useRef();

  const mulaiGame = () => {
    setPosisi(50);
    setStatus('playing');
    setDifficulty(0.3);
  };

  const tekanTombol = () => {
    if (status === 'playing') {
      setPosisi(prev => Math.max(0, prev - 4)); // User dorong 4 poin
    }
  };

  const gameLoop = () => {
    if (status === 'playing') {
      setPosisi(prev => {
        const newPos = prev + difficulty; // Bang Jago dorong pelan tapi pasti
        if (newPos >= 100) setStatus('lose');
        if (prev <= 0) setStatus('win');
        return newPos;
      });
      // Makin lama Bang Jago makin kuat (rage mode)
      setDifficulty(d => d + 0.0005);
      requestRef.current = requestAnimationFrame(gameLoop);
    }
  };

  useEffect(() => {
    if (status === 'playing') {
      requestRef.current = requestAnimationFrame(gameLoop);
    } else {
      cancelAnimationFrame(requestRef.current);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [status]);

  return (
    <main className="min-h-screen bg-blue-600 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Tombol Kembali */}
      <div className="absolute top-6 left-6 z-20">
        <Link href="/adu-jago" className="bg-white/20 hover:bg-white/40 text-white font-black px-4 py-2 rounded-full border border-white/30">
          ← KABUR
        </Link>
      </div>

      <div className="bg-white w-full max-w-xl rounded-[40px] shadow-[0_15px_0_0_rgba(30,58,138,1)] p-8 text-center">
        <h1 className="text-3xl font-black text-gray-800 mb-2 italic">PANCO JEMPOL</h1>
        <p className="text-gray-500 font-bold mb-10 uppercase text-xs tracking-widest">Klik secepat mungkin atau terdorong!</p>

        {/* Visual Panco */}
        <div className="relative h-24 bg-gray-100 rounded-full mb-12 flex items-center px-4 border-4 border-gray-200 shadow-inner">
          {/* Garis Tengah */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-red-400 opacity-30 -translate-x-1/2"></div>
          
          {/* Pointer Panco */}
          <div 
            className="absolute transition-all duration-75 flex items-center justify-center"
            style={{ left: `${posisi}%`, transform: 'translateX(-50%)' }}
          >
            <div className="text-6xl filter drop-shadow-md select-none">🤜🤛</div>
            <div className="absolute -top-10 bg-yellow-400 text-white text-[10px] font-black px-2 py-1 rounded rotate-12">LAGI ADU!</div>
          </div>

          {/* Label Sisi */}
          <div className="absolute left-4 font-black text-blue-500 opacity-40 uppercase">KAMU</div>
          <div className="absolute right-4 font-black text-red-500 opacity-40 uppercase text-right">BANG JAGO</div>
        </div>

        {status === 'idle' ? (
          <button 
            onClick={mulaiGame}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black py-6 rounded-3xl shadow-[0_8px_0_0_#1e3a8a] text-2xl transition-all"
          >
            SIAP? PANCO!
          </button>
        ) : status === 'playing' ? (
          <button 
            onMouseDown={tekanTombol}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-black py-10 rounded-[40px] shadow-[0_10px_0_0_#991b1b] text-4xl active:translate-y-2 active:shadow-none transition-all select-none touch-none"
          >
            TEKAN!! 🥊
          </button>
        ) : (
          <div className="animate-in zoom-in duration-300">
            <h2 className={`text-5xl font-black mb-6 ${status === 'win' ? 'text-green-500' : 'text-red-500'}`}>
              {status === 'win' ? 'MENANG! 💪' : 'KALAH! 🍗'}
            </h2>
            <p className="text-gray-500 mb-8 font-medium italic">
              {status === 'win' ? "Otot jempolmu luar biasa, Bosku!" : "Aduh, jempolmu butuh asupan jagung lagi."}
            </p>
            <button 
              onClick={mulaiGame}
              className="w-full bg-blue-500 text-white font-black py-4 rounded-2xl shadow-lg mb-4"
            >
              BALAS DENDAM!
            </button>
            <Link href="/adu-jago" className="block text-gray-400 font-bold hover:text-blue-500">Nyerah, balik ke lobi</Link>
          </div>
        )}
      </div>

      {/* Dekorasi Otot */}
      <div className="mt-12 flex gap-20 opacity-20 text-8xl pointer-events-none select-none">
        <div className="rotate-12">💪</div>
        <div className="-rotate-12">🐓</div>
      </div>
    </main>
  );
}