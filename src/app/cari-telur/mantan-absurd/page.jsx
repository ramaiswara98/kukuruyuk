"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

const bankPertanyaan = [
  {
    tanya: "Nemu foto mantan pas lagi beresin galeri HP, kamu...",
    opsi: [
      { teks: "Hapus permanen sambil baca doa pengusir setan.", tipe: "tuntas" },
      { teks: "Pindahin ke folder tersembunyi ber-password.", tipe: "stuck" },
      { teks: "Diliatin 2 jam sambil dengerin lagu galau.", tipe: "akut" }
    ]
  },
  {
    tanya: "Mantan tiba-tiba nge-view Story IG kamu setelah setahun!",
    opsi: [
      { teks: "Biasa aja, emang gue menarik.", tipe: "tuntas" },
      { teks: "Langsung cek profil dia, siapa tau dia khilaf.", tipe: "stuck" },
      { teks: "Bikin Story baru biar dia makin panas.", tipe: "akut" }
    ]
  },
  {
    tanya: "Lagi jalan di mall, eh mencium bau parfum yang mirip banget punya mantan.",
    opsi: [
      { teks: "Oalah, parfum pasaran ternyata.", tipe: "tuntas" },
      { teks: "Noleh kiri-kanan nyari orangnya.", tipe: "stuck" },
      { teks: "Langsung lemes, pengen pulang terus tidur.", tipe: "akut" }
    ]
  },
  {
    tanya: "Mantan posting foto sama pacar barunya yang (menurutmu) gak seberapa...",
    opsi: [
      { teks: "Alhamdulillah, akhirnya ada yang mau.", tipe: "tuntas" },
      { teks: "Zoom fotonya, cari kekurangan pacar barunya.", tipe: "stuck" },
      { teks: "Nangis di pojokan: 'Selera dia kok turun banget?'", tipe: "akut" }
    ]
  },
  {
    tanya: "Gimana kabar barang-barang pemberian mantan?",
    opsi: [
      { teks: "Udah dijual di pre-loved atau dikasih panti asuhan.", tipe: "tuntas" },
      { teks: "Masih dipake, sayang kan barangnya bagus.", tipe: "stuck" },
      { teks: "Disimpen di kotak rahasia bawah kasur.", tipe: "akut" }
    ]
  },
  {
    tanya: "Kalo gak sengaja ketemu mantan di jalan, kamu bakal...",
    opsi: [
      { teks: "Sapa ramah terus lanjut jalan.", tipe: "tuntas" },
      { teks: "Pura-pura gak liat tapi jantung mau copot.", tipe: "stuck" },
      { teks: "Sembunyi di balik tong sampah atau pohon.", tipe: "akut" }
    ]
  },
  {
    tanya: "Seberapa sering kamu ngecek akun LinkedIn mantan?",
    opsi: [
      { teks: "Gak pernah, gak penting amat.", tipe: "tuntas" },
      { teks: "Sesekali kalo lagi kepo dia kerja di mana.", tipe: "stuck" },
      { teks: "Tiap malem, mastiin dia belum promosi jabatan.", tipe: "akut" }
    ]
  },
  {
    tanya: "Ada undangan nikahan mantan di atas meja...",
    opsi: [
      { teks: "Dateng dong, lumayan makan gratis.", tipe: "tuntas" },
      { teks: "Kasih amplop kosong lewat titipan temen.", tipe: "stuck" },
      { teks: "Robek undangannya, bakar abu-nya.", tipe: "akut" }
    ]
  },
  {
    tanya: "Lagu 'kita dulu' tiba-tiba keputar di radio cafe...",
    opsi: [
      { teks: "Tetap asik makan, lagunya emang enak.", tipe: "tuntas" },
      { teks: "Langsung skip atau minta mas-nya ganti lagu.", tipe: "stuck" },
      { teks: "Tiba-tiba mata berkaca-kaca padahal lagi makan soto.", tipe: "akut" }
    ]
  },
  {
    tanya: "Mantan nge-chat: 'P' jam 12 malem. Balasanmu?",
    opsi: [
      { teks: "Block tanpa baca.", tipe: "tuntas" },
      { teks: "Bales singkat: 'Kenapa?'.", tipe: "stuck" },
      { teks: "Langsung ngetik panjang lebar nanya kabar.", tipe: "akut" }
    ]
  },
  {
    tanya: "Kamu masih hapal gak nomor HP atau plat motor dia?",
    opsi: [
      { teks: "Udah lupa total, nama tengahnya aja lupa.", tipe: "tuntas" },
      { teks: "Nomor dihapus, tapi otak masih inget.", tipe: "stuck" },
      { teks: "Masih, bahkan hapal jadwal dia ganti oli motor.", tipe: "akut" }
    ]
  },
  {
    tanya: "Kalo temenmu nyebut nama mantan secara gak sengaja...",
    opsi: [
      { teks: "Biasa aja, kayak nyebut nama tukang bakso.", tipe: "tuntas" },
      { teks: "Langsung ganti topik pembicaraan.", tipe: "stuck" },
      { teks: "Curhat 3 jam tentang kenangan pahit.", tipe: "akut" }
    ]
  },
  {
    tanya: "Kamu masih berteman gak sama keluarga mantan?",
    opsi: [
      { teks: "Gak, mending jaga jarak aman.", tipe: "tuntas" },
      { teks: "Cuma kalo lewat depan rumahnya doang.", tipe: "stuck" },
      { teks: "Masih sering bantuin emaknya belanja ke pasar.", tipe: "akut" }
    ]
  },
  {
    tanya: "Apa cita-citamu buat mantan?",
    opsi: [
      { teks: "Semoga dia bahagia sama hidupnya.", tipe: "tuntas" },
      { teks: "Semoga dia dapet karma dikit aja.", tipe: "stuck" },
      { teks: "Semoga dia nyesel tujuh turunan mutusin gue.", tipe: "akut" }
    ]
  },
  {
    tanya: "Mantan tiba-tiba tag kamu di postingan lama...",
    opsi: [
      { teks: "Untag, terus hapus komentar.", tipe: "tuntas" },
      { teks: "Tanya lewat DM: 'Maksudnya apa ya?'.", tipe: "stuck" },
      { teks: "Senyum-senyum sendiri, dikira kode balikan.", tipe: "akut" }
    ]
  },
  {
    tanya: "Kalo kamu dapet lotre 1 Milyar, apa kabar mantan?",
    opsi: [
      { teks: "Gak kepikiran, mau keliling dunia aja.", tipe: "tuntas" },
      { teks: "Pamer lewat Story biar dia tau gue kaya.", tipe: "stuck" },
      { teks: "Beli rumah di depan rumahnya biar dia panas.", tipe: "akut" }
    ]
  },
  {
    tanya: "Kamu masih sering stalking akun 'Fake Account' buat mantau dia?",
    opsi: [
      { teks: "Gak punya waktu buat hal receh.", tipe: "tuntas" },
      { teks: "Pernah sekali-dua kali pas gabut parah.", tipe: "stuck" },
      { teks: "Tiap jam, folder search IG isinya nama dia semua.", tipe: "akut" }
    ]
  },
  {
    tanya: "Mantan nikah hari ini, cuaca lagi hujan...",
    opsi: [
      { teks: "Cuma mikir: 'Jemuran gue belum diangkat'.", tipe: "tuntas" },
      { teks: "Berharap tendanya terbang kena angin.", tipe: "stuck" },
      { teks: "Nangis di bawah shower biar gak kelihatan nangis.", tipe: "akut" }
    ]
  },
  {
    tanya: "Kamu masih nyimpen screenshot percakapan manis dulu?",
    opsi: [
      { teks: "Udah di-format factory reset.", tipe: "tuntas" },
      { teks: "Masih di Google Drive, buat kenang-kenangan.", tipe: "stuck" },
      { teks: "Sering dibaca ulang sebelum tidur.", tipe: "akut" }
    ]
  },
  {
    tanya: "Gimana perasaanmu pas ngerjain kuis ini?",
    opsi: [
      { teks: "Lempeng aja, lucu soalnya.", tipe: "tuntas" },
      { teks: "Dikit-dikit kerasa perih di ulu hati.", tipe: "stuck" },
      { teks: "Tolong, Bang Jago! Gue mau pingsan!", tipe: "akut" }
    ]
  }
];

const hasilDeskripsi = {
  tuntas: {
    judul: "Sang Legenda Move On",
    emoji: "🦅",
    desc: "Selamat! Hatimu sudah bersih, kinclong, dan siap menerima penghuni baru. Mantan hanyalah sejarah kuno bagimu."
  },
  stuck: {
    judul: "Pasukan Gagal Fokus",
    emoji: "🐢",
    desc: "Kamu sudah setengah jalan, tapi kakimu masih sering keserimpung bayangan masa lalu. Ayo dikit lagi, jangan nengok belakang terus!"
  },
  akut: {
    judul: "Duta Galau Abadi",
    emoji: "😭",
    desc: "Gawat! Kamu bukan cuma gagal move on, tapi kamu sudah bangun candi buat mantan di hatimu. Bang Jago saranin: mending makan jagung yang banyak biar kuat menghadapi kenyataan."
  }
};

export default function KuisGorengan() {
  const [kuisAktif, setKuisAktif] = useState([]);
  const [step, setStep] = useState(0);
  const [skor, setSkor] = useState({ mendoan: 0, bakwan: 0, tahu: 0 });
  const [showHasil, setShowHasil] = useState(false);

  useEffect(() => {
    const soalDiacak = [...bankPertanyaan]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(soal => ({
        ...soal,
        opsi: [...soal.opsi].sort(() => 0.5 - Math.random())
      }));
    setKuisAktif(soalDanOpsiDiacak);
  }, []);

  // Helper agar tidak crash saat render pertama
  const soalDanOpsiDiacak = [...bankPertanyaan]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map(soal => ({
      ...soal,
      opsi: [...soal.opsi].sort(() => 0.5 - Math.random())
    }));

  const handleJawaban = (tipe) => {
    setSkor(prev => ({ ...prev, [tipe]: prev[tipe] + 1 }));
    if (step < kuisAktif.length - 1) {
      setStep(step + 1);
    } else {
      setShowHasil(true);
    }
  };

  if (kuisAktif.length === 0) return <div className="min-h-screen bg-orange-400 flex items-center justify-center font-black text-white italic text-2xl animate-pulse">LAGI GORENG PERTANYAAN... 🍳</div>;

  if (showHasil) {
    const finalKey = Object.keys(skor).reduce((a, b) => skor[a] > skor[b] ? a : b);
    const data = hasilDeskripsi[finalKey];

    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center p-6 text-center font-sans">
        <div className="bg-white p-10 rounded-[40px] shadow-2xl border-4 border-yellow-600 max-w-md">
          <div className="text-8xl mb-6">{data.emoji}</div>
          <h1 className="text-4xl font-black text-yellow-700 my-4 uppercase tracking-tighter">KAMU ADALAH {data.judul}</h1>
          <p className="text-gray-600 font-medium italic mb-8">"{data.desc}"</p>
          <button onClick={() => window.location.reload()} className="w-full bg-purple-500 hover:bg-purple-600 text-white font-black py-4 rounded-2xl shadow-[0_5px_0_0_rgba(161,98,7,1)] active:shadow-none active:translate-y-1 transition-all uppercase">
            Goreng Ulang (Main Lagi)
          </button>
          <Link href="/cari-telur" className="block mt-6 text-yellow-600 font-bold hover:underline">Balik ke Rak Telur</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-400 flex flex-col items-center justify-center p-6 relative">
      <div className="absolute top-6 left-6">
        <Link href="/cari-telur" className="bg-white/20 hover:bg-white/40 text-white font-black px-5 py-2 rounded-full transition-all border border-white/30 text-sm">
          ← BALIK
        </Link>
      </div>

      <div className="w-full max-w-xl bg-white rounded-[40px] shadow-[0_15px_0_0_rgba(154,52,18,1)] p-8">
        <div className="flex justify-between items-center mb-10">
          <span className="text-orange-500 font-black italic">STEP {step + 1}/3</span>
          <div className="flex gap-2">
            {[0, 1, 2].map(i => (
              <div key={i} className={`h-3 w-3 rounded-full ${i <= step ? 'bg-orange-500' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>

        <h2 className="text-3xl font-black text-gray-800 mb-8 leading-tight">
          "{kuisAktif[step].tanya}"
        </h2>

        <div className="grid gap-3">
          {kuisAktif[step].opsi.map((opsi, idx) => (
            <button
              key={idx}
              onClick={() => handleJawaban(opsi.tipe)}
              className="p-5 text-left bg-purple-50 hover:bg-purple-500 border-2 border-yellow-100 hover:border-yellow-600 group rounded-3xl transition-all shadow-sm active:scale-95"
            >
              <span className="text-lg font-bold text-yellow-900 group-hover:text-white">
                {opsi.teks}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}