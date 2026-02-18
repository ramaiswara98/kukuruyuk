"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function KandangCurhat() {
  const [pesan, setPesan] = useState('');
  const [chatLog, setChatLog] = useState([
    { role: 'bot', text: 'Sini masuk kandang... Mau curhat apa? Masalah cinta? Masalah duit? Atau masalah otak?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatLog, isTyping]);

  const balasCurhat = (input) => {
    const text = input.toLowerCase();
    
    // Logika Balasan Ngasal Bang Jago
    if (text.includes('cinta') || text.includes('pacar') || text.includes('putus')) {
      return "Cinta itu buta, tapi kamu nggak usah ikutan buta juga kali. Udah diputusin ya cari lagi, atau mending cari duit.";
    }
    if (text.includes('duit') || text.includes('uang') || text.includes('miskin') || text.includes('kerja')) {
      return "Duit nggak dibawa mati, tapi kalau nggak punya duit rasanya kayak mau mati, kan? Makanya kerja, jangan cuma curhat ke bot!";
    }
    if (text.includes('tuyul')) {
      return "Tuyul saya aja kerjanya rajin nyari koin, kamu masa kalah sama bocah botak?";
    }
    if (text.includes('sedih') || text.includes('galau')) {
      return "Sedih secukupnya, ngopi sepuasnya. Ingat, masalahmu itu nggak seberapa dibanding masalah negara.";
    }
    if (text.length < 5) {
      return "Ketik yang bener dong, curhat kok irit banget kayak paketan data mau abis.";
    }
    
    const randomBalas = [
      "Terus? Saya harus bilang 'wow' gitu?",
      "Menarik sekali, tapi sayang saya nggak peduli.",
      "Coba ceritain ke tembok, siapa tau temboknya roboh saking sedihnya.",
      "Oh gitu... Terus makan siang apa hari ini?",
      "Dunia emang keras, yang lembek cuma nasi yang kebanyakan air."
    ];
    return randomBalas[Math.floor(Math.random() * randomBalas.length)];
  };

  const handleKirim = (e) => {
    e.preventDefault();
    if (!pesan.trim()) return;

    const userPesan = { role: 'user', text: pesan };
    setChatLog((prev) => [...prev, userPesan]);
    setPesan('');
    setIsTyping(true);

    // Simulasi Bang Jago lagi mikir (biar dramatis)
    setTimeout(() => {
      const botPesan = { role: 'bot', text: balasCurhat(pesan) };
      setChatLog((prev) => [...prev, botPesan]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white flex flex-col items-center p-4">
      {/* Header */}
      <div className="w-full max-w-lg flex justify-between items-center py-4 border-b border-white/10">
        <Link href="/" className="text-slate-500 font-black hover:text-red-500 transition text-xs">← KABUR</Link>
        <div className="text-right">
          <h1 className="text-xl font-black italic tracking-tighter text-indigo-400">KANDANG CURHAT</h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Tempat Sampah Emosi v1.0</p>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 w-full max-w-lg overflow-y-auto my-4 space-y-4 scroll-smooth pr-2 custom-scrollbar"
      >
        {chatLog.map((chat, index) => (
          <div key={index} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-3xl font-bold text-sm shadow-lg ${
              chat.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5'
            }`}>
              {chat.role === 'bot' && <div className="text-[10px] text-indigo-400 mb-1">BANG JAGO</div>}
              {chat.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start italic text-slate-500 text-xs animate-pulse">
            Bang Jago lagi ngetik hinaan...
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleKirim} className="w-full max-w-lg pb-6">
        <div className="relative">
          <input 
            type="text"
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
            placeholder="Curhat sini..."
            className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl p-4 pr-16 text-white focus:border-indigo-500 outline-none transition-all"
          />
          <button 
            type="submit"
            className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 px-4 rounded-xl transition-all font-black text-xs"
          >
            KIRIM
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-600 mt-3 font-bold uppercase tracking-widest">
          Privasi tidak terjamin • Curhatanmu adalah candaan kami
        </p>
      </form>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `}</style>
    </main>
  );
}