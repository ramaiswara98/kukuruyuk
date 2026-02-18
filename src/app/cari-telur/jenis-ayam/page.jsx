"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

// 1. Bank Data Pertanyaan (Lebih Banyak)
const bankPertanyaan = [
  {
    tanya: "Pas lagi nongkrong, tiba-tiba tagihan datang. Reaksi kamu?",
    opsi: [
      { teks: "Langsung bayarin semua. Sultan mah bebas!", tipe: "jagoan" },
      { teks: "Pura-pura ke toilet sampai kasirnya pulang.", tipe: "ngumpet" },
      { teks: "Ngitung teliti sampai ke bumbu-bumbunya.", tipe: "itungan" }
    ]
  },
  {
    tanya: "Ada pengumuman mendadak di grup WA. Kamu gimana?",
    opsi: [
      { teks: "Langsung gas kerjain saat itu juga.", tipe: "jagoan" },
      { teks: "Cuma 'read' doang, balasnya pas udah mood.", tipe: "ngumpet" },
      { teks: "Nanya dulu: 'Ada uang bensinnya nggak?'", tipe: "itungan" }
    ]
  },
  {
    tanya: "Gimana gaya tidur idamanmu?",
    opsi: [
      { teks: "Tidur telentang, siap siaga kalau ada maling.", tipe: "jagoan" },
      { teks: "Meringkuk kayak bola, yang penting anget.", tipe: "ngumpet" },
      { teks: "Tidur sambil megang dompet.", tipe: "itungan" }
    ]
  },
  {
    tanya: "Kalau lihat mantan jalan sama gebetan baru, kamu bakal...",
    opsi: [
      { teks: "Sapa dengan gagah: 'Halo Bro/Sist!'", tipe: "jagoan" },
      { teks: "Pura-pura jadi tiang listrik biar gak kelihatan.", tipe: "ngumpet" },
      { teks: "Nghitung berapa harga outfit mereka.", tipe: "itungan" }
    ]
  },
  {
    tanya: "Dikasih uang kaget 10 juta, buat apa?",
    opsi: [
      { teks: "Traktir warga sekampung!", tipe: "jagoan" },
      { teks: "Simpen di bawah kasur, gak bilang siapa-siapa.", tipe: "ngumpet" },
      { teks: "Masukin deposito, itung bunga tiap hari.", tipe: "itungan" }
    ]
  },
  {
    tanya: "Lagi jalan terus kepeleset di depan umum, responmu?",
    opsi: [
      { teks: "Langsung berdiri terus bilang 'Sengaja kok!'", tipe: "jagoan" },
      { teks: "Pindah planet karena malu banget.", tipe: "ngumpet" },
      { teks: "Ngecek sepatu, rusak gak ya? Rugi nih.", tipe: "itungan" }
    ]
  },
  {
    tanya: "Ada kurir paket dateng ke rumah pas kamu lagi mandi, kamu...",
    opsi: [
      { teks: "Teriak kenceng: 'TARO PAGAR AJA BANG!'", tipe: "jagoan" },
      { teks: "Diem mematung sampai kurirnya pergi sendiri.", tipe: "ngumpet" },
      { teks: "Cek aplikasi, udah free ongkir belum ya?", tipe: "itungan" }
    ]
  },
  {
    tanya: "Kalo disuruh milih kekuatan super, kamu mau apa?",
    opsi: [
      { teks: "Kebal peluru dan bacotan netizen.", tipe: "jagoan" },
      { teks: "Menghilang biar gak diajak basa-basi.", tipe: "ngumpet" },
      { teks: "Bisa mencetak uang asli dari telapak tangan.", tipe: "itungan" }
    ]
  },
  {
    tanya: "Lagi makan di resto, eh ada kecoak terbang ke arahmu!",
    opsi: [
      { teks: "Tangkep pakai tangan kosong, buang keluar.", tipe: "jagoan" },
      { teks: "Lari zig-zag sambil jerit histeris.", tipe: "ngumpet" },
      { teks: "Minta ganti rugi atau diskon makan gratis.", tipe: "itungan" }
    ]
  },
  {
    tanya: "Gimana caramu menghadapi Senin pagi?",
    opsi: [
      { teks: "Mandi air es terus teriak: 'I AM READY!'", tipe: "jagoan" },
      { teks: "Narik selimut lagi, nunggu kiamat kecil.", tipe: "ngumpet" },
      { teks: "Mulai bikin rincian pengeluaran seminggu.", tipe: "itungan" }
    ]
  },
  {
    tanya: "Apa yang kamu lakukan kalo salah masuk toilet lawan jenis?",
    opsi: [
      { teks: "Tetap santai sambil benerin rambut di kaca.", tipe: "jagoan" },
      { teks: "Tutup muka pakai tas, lari secepat kilat.", tipe: "ngumpet" },
      { teks: "Mikir: 'Pantesan sabunnya lebih wangi, rugi gak pake.'", tipe: "itungan" }
    ]
  },
  {
    tanya: "Kalo dunia kiamat besok, hari ini kamu ngapain?",
    opsi: [
      { teks: "Party besar-besaran bareng musuh.", tipe: "jagoan" },
      { teks: "Nangis di pojokan kamar mandi.", tipe: "ngumpet" },
      { teks: "Narilin semua utang biar gak dibawa mati.", tipe: "itungan" }
    ]
  },
  {
    tanya: "Ada orang asing minta tolong fotoin di tempat wisata...",
    opsi: [
      { teks: "Fotoin pakai 100 gaya ala fotografer pro.", tipe: "jagoan" },
      { teks: "Pura-pura gak denger atau sibuk telepon.", tipe: "ngumpet" },
      { teks: "Fotoin sekali, terus minta gantian difotoin.", tipe: "itungan" }
    ]
  },
  {
    tanya: "Kamu nemu uang 50 ribu di jalan, tindakanmu?",
    opsi: [
      { teks: "Langsung buat beli gorengan sekantor.", tipe: "jagoan" },
      { teks: "Toleh kiri-kanan, kalo aman masuk saku.", tipe: "ngumpet" },
      { teks: "Injek dulu, tunggu 15 menit, baru ambil pelan.", tipe: "itungan" }
    ]
  },
  {
    tanya: "Beli boba tapi rasanya hambar banget, kamu bakal...",
    opsi: [
      { teks: "Samperin mbaknya, minta tambahin gula 10 sendok.", tipe: "jagoan" },
      { teks: "Diem aja, diminum sambil nahan sedih.", tipe: "ngumpet" },
      { teks: "Kasih rating bintang 1 di Maps biar rugi.", tipe: "itungan" }
    ]
  },
  {
    tanya: "Lagi nonton bioskop, ada orang di belakang berisik banget!",
    opsi: [
      { teks: "Toleh belakang: 'DIEM ATAU GUE TELEN!'", tipe: "jagoan" },
      { teks: "Pindah kursi pelan-pelan pas gelap.", tipe: "ngumpet" },
      { teks: "Mikir: 'Gila, tiket mahal-mahal malah denger curhatan.'", tipe: "itungan" }
    ]
  },
  {
    tanya: "Kamu diundang ke pesta kostum tapi salah kostum sendiri...",
    opsi: [
      { teks: "Tetap pede, ngaku kalau ini tren masa depan.", tipe: "jagoan" },
      { teks: "Sembunyi di balik gorden sampai pesta selesai.", tipe: "ngumpet" },
      { teks: "Nyesel udah beli kostum mahal-mahal.", tipe: "itungan" }
    ]
  },
  {
    tanya: "Apa reaksimu liat diskon 90% tapi barangnya gak butuh?",
    opsi: [
      { teks: "Beli aja buat kado orang yang gue benci.", tipe: "jagoan" },
      { teks: "Ngeliatin doang dari jauh, takut ditawarin SPG.", tipe: "ngumpet" },
      { teks: "Tetap beli! Gak beli berarti rugi bandar.", tipe: "itungan" }
    ]
  },
  {
    tanya: "HP kamu sisa baterai 1% dan gak ada charger...",
    opsi: [
      { teks: "Update status: 'GOODBYE WORLD!'", tipe: "jagoan" },
      { teks: "Langsung matiin HP, pasrah pada takdir.", tipe: "ngumpet" },
      { teks: "Turunin brightness sampai layar gelap gulita.", tipe: "itungan" }
    ]
  },
  {
    tanya: "Gimana caramu mutusin pacar yang toxic?",
    opsi: [
      { teks: "Samperin rumahnya, balikin semua barang depan ortunya.", tipe: "jagoan" },
      { teks: "Ghosting total, ganti nomor, pindah pulau.", tipe: "ngumpet" },
      { teks: "Minta ganti rugi uang bensin selama pacaran.", tipe: "itungan" }
    ]
  }
];

const hasilDeskripsi = {
  jagoan: {
    judul: "Ayam Jago Petarung",
    emoji: "🔥🐓",
    desc: "Kamu adalah pemimpin sejati! Gak kenal takut dan selalu jadi pusat perhatian. Bang Jago bangga!"
  },
  ngumpet: {
    judul: "Anak Ayam Pemalu",
    emoji: "🐣✨",
    desc: "Kamu lebih suka ketenangan. Duniamu penuh imajinasi dan kamu butuh kehangatan ekstra."
  },
  itungan: {
    judul: "Ayam Kalkulator",
    emoji: "🐔🧮",
    desc: "Bagi kamu, hidup adalah soal untung rugi. Sangat teliti dan strategis!"
  }
};

export default function KuisJenisAyam() {
  const [kuisAktif, setKuisAktif] = useState([]);
  const [step, setStep] = useState(0);
  const [skor, setSkor] = useState({ jagoan: 0, ngumpet: 0, itungan: 0 });
  const [showHasil, setShowHasil] = useState(false);

  useEffect(() => {
    // 1. Acak urutan bank pertanyaan dan ambil 3
    const soalDiacak = [...bankPertanyaan]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    // 2. Acak urutan opsi jawaban di dalam tiap soal yang sudah terpilih
    const soalDanOpsiDiacak = soalDiacak.map(soal => ({
      ...soal,
      opsi: [...soal.opsi].sort(() => 0.5 - Math.random())
    }));

    setKuisAktif(soalDanOpsiDiacak);
  }, []);

  const handleJawaban = (tipe) => {
    setSkor(prev => ({ ...prev, [tipe]: prev[tipe] + 1 }));
    
    if (step < kuisAktif.length - 1) {
      setStep(step + 1);
    } else {
      setShowHasil(true);
    }
  };

  const tentukanHasil = () => {
    return Object.keys(skor).reduce((a, b) => skor[a] > skor[b] ? a : b);
  };

  if (kuisAktif.length === 0) return (
    <div className="min-h-screen bg-yellow-400 flex items-center justify-center font-black text-white text-2xl animate-pulse">
      MENGOCOK TELUR... 🥚
    </div>
  );

  if (showHasil) {
    const finalKey = tentukanHasil();
    const data = hasilDeskripsi[finalKey];

    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center p-6 text-center">
        
        <div className="bg-white p-10 rounded-[40px] shadow-2xl border-4 border-orange-500 max-w-md">
          <div className="text-8xl mb-6">{data.emoji}</div>
          <h1 className="text-4xl font-black text-gray-800 my-4 uppercase">{data.judul}</h1>
          <p className="text-gray-600 font-medium leading-relaxed">{data.desc}</p>
          
          <button 
            onClick={() => window.location.reload()} 
            className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl shadow-[0_5px_0_0_rgba(194,65,12,1)] active:shadow-none active:translate-y-1 transition-all"
          >
            MAIN LAGI (SOAL & OPSI BEDA!)
          </button>
          <Link href="/cari-telur" className="block mt-6 text-orange-400 font-bold hover:underline">
            ← Cari Telur Lain
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-400 flex flex-col items-center justify-center p-6">
        {/* TOMBOL KEMBALI (Header) */}
            <div className="absolute top-6 left-6">
            <Link 
                href="/cari-telur" 
                className="flex items-center gap-2 bg-white/30 hover:bg-white/50 text-orange-900 font-black px-4 py-2 rounded-full transition-all backdrop-blur-sm border border-white/20"
            >
                <span>←</span> 
                <span className="text-sm">BALIK KE RAK</span>
            </Link>
            </div>
      <div className="w-full max-w-xl bg-white rounded-[32px] shadow-[0_15px_0_0_rgba(234,88,12,1)] p-8">
        <div className="mb-6 flex justify-between items-center">
            <span className="text-orange-500 font-black tracking-widest uppercase text-sm">Pertanyaan {step + 1} / 3</span>
            <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className={`h-2 w-6 rounded-full ${i <= step ? 'bg-orange-500' : 'bg-gray-200'}`} />
                ))}
            </div>
        </div>

        <h2 className="text-3xl font-black text-gray-800 mb-10 leading-tight">
          "{kuisAktif[step].tanya}"
        </h2>

        <div className="grid gap-4">
          {kuisAktif[step].opsi.map((opsi, idx) => (
            <button
              key={idx}
              onClick={() => handleJawaban(opsi.tipe)}
              className="p-5 text-left bg-white hover:bg-orange-500 border-2 border-orange-100 hover:border-orange-600 group rounded-2xl transition-all duration-200 shadow-sm active:scale-95"
            >
              <span className="text-lg font-bold text-gray-700 group-hover:text-white">
                {opsi.teks}
              </span>
            </button>
          ))}
        </div>
      </div>
      <p className="mt-8 text-orange-900 font-black italic animate-bounce">KUKURUYUK! 🐓</p>
    </div>
  );
}