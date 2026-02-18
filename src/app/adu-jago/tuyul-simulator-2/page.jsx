"use client";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function TuyulSimulator2() {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('menu'); 
  const [skor, setSkor] = useState(0);
  const [level, setLevel] = useState(1);
  const [statusMsg, setStatusMsg] = useState("");

  const gameData = useRef({
    tuyul: { x: 50, y: 50, size: 30, speed: 3.5, isFrozen: false, isSlowed: false, timer: 0 },
    owner: { x: 400, y: 300, angle: 0, patrolPoints: [], currentPatrol: 0, speed: 2 },
    money: [], beans: [], mirrors: [],
    exit: { x: 750, y: 550 },
    pressedKeys: new Set()
  });

  const CONFIG = {
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    FLASHLIGHT_LENGTH: 180,
    FLASHLIGHT_WIDTH: 0.5,
  };

  const initLevel = (lvl) => {
    const data = gameData.current;
    data.pressedKeys.clear();
    data.tuyul = { x: 60, y: 60, size: 30, speed: 4, isFrozen: false, isSlowed: false, timer: 0 };
    setStatusMsg("");

    const speedMultiplier = 1 + (lvl * 0.15);
    data.owner = { 
      x: 400, y: 300, angle: 0, speed: 1.5 * speedMultiplier,
      currentPatrol: 0,
      patrolPoints: [
        {x: 100, y: 100}, {x: 700, y: 100}, {x: 700, y: 500}, {x: 100, y: 500}
      ].sort(() => Math.random() - 0.5)
    };

    data.money = Array.from({ length: 3 + lvl }, () => ({
      x: 100 + Math.random() * 600, y: 100 + Math.random() * 400, collected: false
    }));

    data.beans = Array.from({ length: Math.min(lvl, 4) }, () => ({
      x: 150 + Math.random() * 500, y: 150 + Math.random() * 300
    }));

    data.mirrors = Array.from({ length: lvl > 4 ? 2 : 1 }, () => ({
      x: 100 + Math.random() * 600, y: 100 + Math.random() * 400
    }));

    setSkor(0);
    setLevel(lvl);
    setGameState('playing');
  };

  // Fungsi Helper untuk Kontrol HP
  const handleTouch = (key, active) => {
    if (active) gameData.current.pressedKeys.add(key);
    else gameData.current.pressedKeys.delete(key);
  };

  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const update = () => {
      const data = gameData.current;
      const t = data.tuyul;
      const o = data.owner;

      if (t.timer > 0) {
        t.timer -= 1;
        if (t.timer <= 0) {
          t.isFrozen = false; t.isSlowed = false;
          setStatusMsg("");
        }
      }

      if (!t.isFrozen) {
        let currentSpeed = t.isSlowed ? 1.5 : t.speed;
        if (data.pressedKeys.has('w') || data.pressedKeys.has('arrowup')) t.y -= currentSpeed;
        if (data.pressedKeys.has('s') || data.pressedKeys.has('arrowdown')) t.y += currentSpeed;
        if (data.pressedKeys.has('a') || data.pressedKeys.has('arrowleft')) t.x -= currentSpeed;
        if (data.pressedKeys.has('d') || data.pressedKeys.has('arrowright')) t.x += currentSpeed;
        
        t.x = Math.max(20, Math.min(780, t.x));
        t.y = Math.max(20, Math.min(580, t.y));
      }

      const target = o.patrolPoints[o.currentPatrol];
      const dx = target.x - o.x; const dy = target.y - o.y;
      o.angle = Math.atan2(dy, dx);
      const dist = Math.hypot(dx, dy);
      if (dist > 5) {
        o.x += (dx / dist) * o.speed;
        o.y += (dy / dist) * o.speed;
      } else {
        o.currentPatrol = (o.currentPatrol + 1) % o.patrolPoints.length;
      }

      data.money.forEach(m => {
        if (!m.collected && Math.hypot(t.x - m.x, t.y - m.y) < 30) {
          m.collected = true; setSkor(prev => prev + 1);
        }
      });

      data.beans.forEach(b => {
        if (!t.isSlowed && Math.hypot(t.x - b.x, t.y - b.y) < 35) {
          t.isSlowed = true; t.timer = 100; setStatusMsg("🟢 NGITUNG KACANG...");
        }
      });

      data.mirrors.forEach(mr => {
        if (!t.isFrozen && Math.hypot(t.x - mr.x, t.y - mr.y) < 30) {
          t.isFrozen = true; t.timer = 80; setStatusMsg("🪞 TERPESONA...");
        }
      });

      const dToT = Math.hypot(t.x - o.x, t.y - o.y);
      if (dToT < CONFIG.FLASHLIGHT_LENGTH) {
        const aToT = Math.atan2(t.y - o.y, t.x - o.x);
        let diff = aToT - o.angle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        if (Math.abs(diff) < CONFIG.FLASHLIGHT_WIDTH) setGameState('caught');
      }

      if (data.money.every(m => m.collected) && Math.hypot(t.x - data.exit.x, t.y - data.exit.y) < 40) {
        if (level >= 10) setGameState('finalWin');
        else setGameState('win');
      }
    };

    const draw = () => {
      const d = gameData.current;
      ctx.fillStyle = "#0f172a"; ctx.fillRect(0, 0, 800, 600);
      ctx.save();
      ctx.beginPath(); ctx.moveTo(d.owner.x, d.owner.y);
      ctx.arc(d.owner.x, d.owner.y, CONFIG.FLASHLIGHT_LENGTH, d.owner.angle - 0.5, d.owner.angle + 0.5);
      ctx.lineTo(d.owner.x, d.owner.y); ctx.fillStyle = "rgba(254, 240, 138, 0.2)"; ctx.fill();
      ctx.restore();
      ctx.font = "30px Arial"; ctx.textAlign = "center";
      d.beans.forEach(b => ctx.fillText("🟢", b.x, b.y));
      d.mirrors.forEach(m => ctx.fillText("🪞", m.x, m.y));
      d.money.forEach(m => !m.collected && ctx.fillText("💰", m.x, m.y));
      ctx.fillText("🚪", d.exit.x, d.exit.y);
      ctx.fillText("👨‍🦳", d.owner.x, d.owner.y);
      ctx.fillText(d.tuyul.isFrozen ? "😳" : "👶", d.tuyul.x, d.tuyul.y);
    };

    const render = () => { update(); draw(); animationFrameId = requestAnimationFrame(render); };
    render();

    const down = (e) => gameData.current.pressedKeys.add(e.key.toLowerCase());
    const up = (e) => gameData.current.pressedKeys.delete(e.key.toLowerCase());
    window.addEventListener('keydown', down); window.addEventListener('keyup', up);
    return () => { 
      cancelAnimationFrame(animationFrameId); 
      window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); 
    };
  }, [gameState]);

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-2 sm:p-4 touch-none overflow-hidden">
      {/* Tombol Kembali / Kabur */}
    <div className="absolute top-4 left-4 z-40">
    <Link 
        href="/adu-jago" 
        className="group flex items-center gap-2 bg-black/50 hover:bg-red-600 backdrop-blur-md text-white font-black px-4 py-2 rounded-xl border border-white/20 transition-all active:scale-95"
    >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        <span className="text-xs tracking-widest uppercase">KABUR KE LOBI</span>
    </Link>
    </div>
      <div className="relative border-4 sm:border-[10px] border-slate-800 rounded-2xl sm:rounded-[30px] overflow-hidden w-full max-w-[800px] aspect-[4/3]">
        
        {/* HUD */}
        <div className="absolute top-2 left-4 right-4 flex justify-between items-center z-10 text-[10px] sm:text-base">
          <div className="bg-black/60 px-3 py-1 rounded-lg text-white font-black">💰 {skor}/{gameData.current.money.length}</div>
          <div className="bg-indigo-600 px-3 py-1 rounded-lg text-white font-black uppercase">Level {level}</div>
        </div>

        {statusMsg && (
          <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full font-bold text-xs sm:text-sm animate-pulse z-10">
            {statusMsg}
          </div>
        )}

        <canvas ref={canvasRef} width={800} height={600} className="w-full h-full bg-slate-900" />

        {/* Start / End Screens */}
        {gameState !== 'playing' && (
          <div className="absolute inset-0 bg-slate-900/95 flex flex-col items-center justify-center text-center p-6 z-30">
            {gameState === 'menu' && (
              <><span className="text-6xl sm:text-8xl mb-4">👶</span><h1 className="text-3xl sm:text-5xl font-black text-white mb-6">TUYUL SIMULATOR 2</h1><button onClick={() => initLevel(1)} className="bg-indigo-500 text-white px-8 py-3 rounded-xl font-black text-lg">GASKEUN!</button></>
            )}
            {gameState === 'caught' && (
              <><span className="text-6xl mb-4">🔦😲</span><h1 className="text-2xl font-black text-red-500 mb-6">KETEBAK PAK RT!</h1><button onClick={() => initLevel(level)} className="bg-white text-black px-8 py-3 rounded-xl font-black text-lg">COBA LAGI</button></>
            )}
            {gameState === 'win' && (
              <><span className="text-6xl mb-4">💰😁</span><h1 className="text-2xl font-black text-green-400 mb-6">LEVEL {level} CLEAR!</h1><button onClick={() => initLevel(level + 1)} className="bg-yellow-500 text-black px-8 py-3 rounded-xl font-black text-lg">LANJUT</button></>
            )}
            {gameState === 'finalWin' && (
              <><span className="text-6xl mb-4">👑</span><h1 className="text-3xl font-black text-yellow-400 mb-4">KING OF TUYUL!</h1><Link href="/adu-jago" className="bg-white text-black px-8 py-3 rounded-xl font-black text-lg">TAMAT</Link></>
            )}
          </div>
        )}
      </div>

      {/* MOBILE CONTROLLER (DPAD) */}
      <div className="mt-4 grid grid-cols-3 gap-2 sm:hidden z-20">
        <div></div>
        <button onTouchStart={() => handleTouch('w', true)} onTouchEnd={() => handleTouch('w', false)} className="w-16 h-16 bg-slate-800/80 rounded-full flex items-center justify-center text-2xl active:bg-indigo-600">⬆️</button>
        <div></div>
        <button onTouchStart={() => handleTouch('a', true)} onTouchEnd={() => handleTouch('a', false)} className="w-16 h-16 bg-slate-800/80 rounded-full flex items-center justify-center text-2xl active:bg-indigo-600">⬅️</button>
        <button onTouchStart={() => handleTouch('s', true)} onTouchEnd={() => handleTouch('s', false)} className="w-16 h-16 bg-slate-800/80 rounded-full flex items-center justify-center text-2xl active:bg-indigo-600">⬇️</button>
        <button onTouchStart={() => handleTouch('d', true)} onTouchEnd={() => handleTouch('d', false)} className="w-16 h-16 bg-slate-800/80 rounded-full flex items-center justify-center text-2xl active:bg-indigo-600">➡️</button>
      </div>

      <p className="mt-4 hidden sm:block text-slate-500 font-bold text-xs">WASD: GERAK | AMBIL SEMUA KOIN LALU KE PINTU (🚪)</p>
    </main>
  );
}