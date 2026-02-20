"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function UjiNasib() {
  const [step, setStep] = useState('start');
  const [kuisAktif, setKuisAktif] = useState([]); 
  const [jawaban, setJawaban] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const databaseKuis = [
    { tanya: "Tipe orang seperti apa kamu saat di grup WA?", opsi: [{ teks: "Cuma baca doang (Sider)", poin: "langka" }, { teks: "Tukang kirim stiker gak jelas", poin: "rakus" }, { teks: "Tukang pamer pencapaian", poin: "tuyul" }, { teks: "Tukang lurusin masalah", poin: "baik" }] },
    { tanya: "Apa senjata andalanmu kalau dikejar anjing?", opsi: [{ teks: "Lari sekencang mungkin", poin: "baik" }, { teks: "Pura-pura ambil batu", poin: "tuyul" }, { teks: "Nantangin balik (Ajak duel)", poin: "rakus" }, { teks: "Nangis di tempat", poin: "langka" }] },
    { tanya: "Lagi makan di kondangan, eh ada mantan dateng...", opsi: [{ teks: "Pura-pura gak liat (Sembunyi)", poin: "langka" }, { teks: "Sapa ramah sambil pamer", poin: "tuyul" }, { teks: "Fokus makan mumpung gratis", poin: "rakus" }, { teks: "Doain dia bahagia (Malaikat)", poin: "baik" }] },
    { tanya: "Batre HP sisa 1%, charger gak ada, kamu...", opsi: [{ teks: "Pasrah, HP dimatiin", poin: "baik" }, { teks: "Panik nyari pinjeman ke orang asing", poin: "rakus" }, { teks: "Sebut nama Bang Jago biar ajaib", poin: "langka" }, { teks: "Ngaku-ngaku batre HP orang lain", poin: "tuyul" }] },
    { tanya: "Lagi jalan di mall, eh liat artis tapi gak tau namanya...", opsi: [{ teks: "Minta foto aja dulu buat pamer", poin: "tuyul" }, { teks: "Cuma liatin dari jauh", poin: "langka" }, { teks: "Sapa 'Halo Bos!' sok akrab", poin: "rakus" }, { teks: "Biasa aja, sama-sama manusia", poin: "baik" }] },
    { tanya: "Kalau jadi hantu, kamu mau jadi apa?", opsi: [{ teks: "Tuyul (Jelas, cari cuan)", poin: "tuyul" }, { teks: "Kuntilanak (Biar bisa ketawa terus)", poin: "rakus" }, { teks: "Pocong (Biar irit gerak)", poin: "langka" }, { teks: "Hantu baik hati (Casper)", poin: "baik" }] },
    { tanya: "Beli barang online, eh yang dateng gak sesuai...", opsi: [{ teks: "Ikhlasin aja (Sabar)", poin: "baik" }, { teks: "Bintang 1 & maki-maki kurir", poin: "rakus" }, { teks: "Chat seller minta ganti rugi 10x lipat", poin: "tuyul" }, { teks: "Gak beli online lagi selamanya", poin: "langka" }] },
    { tanya: "Cara kamu ngabisin hari Minggu?", opsi: [{ teks: "Tidur dari pagi sampe malem", poin: "langka" }, { teks: "Wisata kuliner sampe begah", poin: "rakus" }, { teks: "Beres-beres rumah sampe kinclong", poin: "baik" }, { teks: "Cari info loker atau peluang cuan", poin: "tuyul" }] },
    { tanya: "Kalau dapet hadiah umroh, kamu bakal...", opsi: [{ teks: "Alhamdulillah langsung berangkat", poin: "baik" }, { teks: "Tanya 'Bisa diuangkan gak?'", poin: "tuyul" }, { teks: "Nungguin temen biar ada barengannya", poin: "langka" }, { teks: "Jual porsi makanannya", poin: "rakus" }] },
    { tanya: "Pas lagi antri bensin, ada yang nyerobot...", opsi: [{ teks: "Tegur baik-baik", poin: "baik" }, { teks: "Senggol motornya dikit", poin: "tuyul" }, { teks: "Teriak biar dia malu", poin: "rakus" }, { teks: "Diem aja sambil istighfar", poin: "langka" }] },
    { tanya: "Liat temen posting foto makan enak di IG...", opsi: [{ teks: "Kasih like & komen selamat", poin: "baik" }, { teks: "Langsung laper & cari makan", poin: "rakus" }, { teks: "Batin: 'Paling pake kartu kredit'", poin: "tuyul" }, { teks: "Gak peduli, skip aja", poin: "langka" }] },
    { tanya: "Waktu sekolah, kamu tipe yang...", opsi: [{ teks: "Paling rajin di barisan depan", poin: "baik" }, { teks: "Tukang tidur di pojokan", poin: "langka" }, { teks: "Tukang palak bekal temen", poin: "rakus" }, { teks: "Tukang nyontek tapi nilai paling tinggi", poin: "tuyul" }] },
    { tanya: "Kalau disuruh milih kekuatan super...", opsi: [{ teks: "Menghilang (Biar bisa nyolong)", poin: "tuyul" }, { teks: "Gak pernah laper", poin: "rakus" }, { teks: "Terbang (Biar gak macet)", poin: "baik" }, { teks: "Bisa baca pikiran gebetan", poin: "langka" }] },
    { tanya: "Sandal kamu ketuker di masjid...", opsi: [{ teks: "Pulang nyeker", poin: "baik" }, { teks: "Cari yang lebih bagus dari punya kita", poin: "tuyul" }, { teks: "Pakai sandal siapapun yang sisa", poin: "rakus" }, { teks: "Duduk nungguin yang nuker dateng", poin: "langka" }] },
    { tanya: "Cara kamu PDKT sama gebetan?", opsi: [{ teks: "Kasih perhatian tulus", poin: "baik" }, { teks: "Ajak makan terus sampe luluh", poin: "rakus" }, { teks: "Stalking sampe akar-akarnya", poin: "tuyul" }, { teks: "Nunggu dia yang chat duluan", poin: "langka" }] },
    { tanya: "Lihat kecoak terbang di kamar...", opsi: [{ teks: "Lari keluar rumah panggil damkar", poin: "langka" }, { teks: "Ajak duel pake sapu", poin: "rakus" }, { teks: "Pancing pake makanan biar pindah", poin: "baik" }, { teks: "Tunggu dia hinggap baru bantai", poin: "tuyul" }] },
    { tanya: "Kalau kamu dapet warisan triliunan...", opsi: [{ teks: "Bikin yayasan sosial", poin: "baik" }, { teks: "Beli restoran biar makan gratis", poin: "rakus" }, { teks: "Bikin kerajaan tuyul modern", poin: "tuyul" }, { teks: "Investasi biar makin kaya raya", poin: "langka" }] },
    { tanya: "Pas lagi masak Indomie, bumbunya gak ada...", opsi: [{ teks: "Makan hambar aja (Sabar)", poin: "baik" }, { teks: "Pake bumbu nasi goreng (Ngaco)", poin: "rakus" }, { teks: "Tuker sama punya adek diam-diam", poin: "tuyul" }, { teks: "Buang, beli baru lagi", poin: "langka" }] },
    { tanya: "Ketemu hantu beneran di jalan...", opsi: [{ teks: "Pingsan di tempat", poin: "langka" }, { teks: "Ajak konten biar viral", poin: "tuyul" }, { teks: "Lari sambil teriak-teriak", poin: "rakus" }, { teks: "Baca doa sebisa mungkin", poin: "baik" }] },
    { tanya: "Kamu di grup pertemanan adalah si...", opsi: [{ teks: "Pendengar yang baik", poin: "baik" }, { teks: "Seksi konsumsi", poin: "rakus" }, { teks: "Otak rencana jahil", poin: "tuyul" }, { teks: "Yang sering gak diajak", poin: "langka" }] },
    { tanya: "Lihat orang jatuh di depan umum...", opsi: [{ teks: "Langsung bantuin berdiri", poin: "baik" }, { teks: "Ketawa dulu baru bantuin", poin: "rakus" }, { teks: "Pura-pura gak liat biar dia gak malu", poin: "langka" }, { teks: "Videoin buat stok meme", poin: "tuyul" }] },
    { tanya: "Menu sarapan favorit kamu?", opsi: [{ teks: "Bubur ayam lengkap", poin: "rakus" }, { teks: "Cuma kopi/teh doang", poin: "langka" }, { teks: "Nasi uduk sisa semalem", poin: "tuyul" }, { teks: "Roti & susu sehat", poin: "baik" }] },
    { tanya: "Kalau ada pintu ajaib Doraemon...", opsi: [{ teks: "Ke masa depan liat angka togel", poin: "tuyul" }, { teks: "Ke Jepang cari ramen enak", poin: "rakus" }, { teks: "Ke tempat yang tenang (Gak ada orang)", poin: "langka" }, { teks: "Ke rumah orang tua (Bakhti)", poin: "baik" }] },
    { tanya: "Bang Jago minta kamu jagain kandangnya...", opsi: [{ teks: "Jagain beneran (Amanah)", poin: "baik" }, { teks: "Tunggu dia pergi, koinnya ambil dikit", poin: "tuyul" }, { teks: "Ganti jadi warung bakso", poin: "rakus" }, { teks: "Malah ketiduran", poin: "langka" }] }
  ];

  const mulaiKuis = () => {
    const acakSoal = [...databaseKuis]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    
    setKuisAktif(acakSoal);
    setJawaban([]);
    setCurrentQuestion(0);
    setStep('kuis');
  };

  const handleJawaban = (poin) => {
    const newJawaban = [...jawaban, poin];
    setJawaban(newJawaban);

    if (currentQuestion + 1 < kuisAktif.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep('hasil');
    }
  };

  const getHasil = () => {
    const counts = jawaban.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
    
    const dominant = Object.keys(counts).reduce((a, b) => (counts[a] || 0) > (counts[b] || 0) ? a : b);

    const hasilAkhir = {
      tuyul: { gelar: "TUYUL ELITE", desk: "Kamu licik, lincah, dan pinter nyari celah. Cocok jadi tangan kanan Bang Jago." },
      baik: { gelar: "WARGA TELADAN", desk: "Kamu terlalu baik buat dunia ini. Hati-hati sering dimanfaatin tuyul." },
      rakus: { gelar: "PENGUASA GORENGAN", desk: "Hidupmu cuma buat makan. Gak ada koin, gorengan pun jadi." },
      langka: { gelar: "MAKHLUK GAIB", desk: "Keberadaanmu diragukan. Kadang ada, seringnya ngilang tanpa kabar." }
    };

    return hasilAkhir[dominant] || hasilAkhir.langka;
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white p-6 flex flex-col items-center justify-center">
      <Link href="/cari-telur" className="absolute top-6 left-6 text-slate-500 font-bold hover:text-white transition">← KABUR</Link>

      <div className="w-full max-w-md bg-slate-900/50 border-2 border-slate-800 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
        
        {step === 'start' && (
          <div className="text-center">
            <span className="text-8xl mb-6 block">🧬</span>
            <h1 className="text-3xl font-black italic mb-4 tracking-tighter">CEK JATI DIRIMU</h1>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">Cari tahu posisi kamu di ekosistem Bang Jago. Ambil 10 tes acak sekarang.</p>
            <button 
              onClick={mulaiKuis}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl transition shadow-[0_6px_0_0_#312e81]"
            >
              MULAI TES
            </button>
          </div>
        )}

        {step === 'kuis' && kuisAktif.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-black bg-slate-800 px-3 py-1 rounded-full text-indigo-400 uppercase tracking-widest">
                Pertanyaan {currentQuestion + 1} / {kuisAktif.length}
              </span>
            </div>
            <h2 className="text-xl font-black mb-8 leading-tight">"{kuisAktif[currentQuestion].tanya}"</h2>
            <div className="space-y-3">
              {kuisAktif[currentQuestion].opsi.map((o, i) => (
                <button 
                  key={i} 
                  onClick={() => handleJawaban(o.poin)}
                  className="w-full text-left bg-slate-800/50 hover:bg-slate-700 border border-slate-700 p-4 rounded-2xl text-sm font-bold transition-all active:scale-95"
                >
                  {o.teks}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'hasil' && (
          <div className="text-center animate-in zoom-in duration-500">
            <p className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em] mb-2">Hasil Analisis Bang Jago:</p>
            <h2 className="text-4xl font-black text-yellow-500 italic mb-6 tracking-tighter">{getHasil().gelar}</h2>
            <div className="bg-white text-black p-6 rounded-3xl mb-8 border-b-8 border-slate-300">
              <p className="font-bold leading-relaxed">"{getHasil().desk}"</p>
            </div>
            <button 
              onClick={() => setStep('start')}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-4 rounded-2xl transition mb-4"
            >
              COBA LAGI
            </button>
          </div>
        )}
      </div>
    </main>
  );
}