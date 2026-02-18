"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

const bankPertanyaan = [
  {
    tanya: "Gimana reaksi kamu kalau tiba-tiba diajak nongkrong dadakan?",
    opsi: [
      { teks: "Gas pol! Selalu siap kapanpun.", tipe: "mendoan" },
      { teks: "Banyak alasan, padahal cuma mager.", tipe: "bakwan" },
      { teks: "Tanya dulu: 'Siapa aja yang ikut? Makanannya enak gak?'", tipe: "tahu" }
    ]
  },
  {
    tanya: "Ada orang baru di lingkunganmu, kamu bakal...",
    opsi: [
      { teks: "Langsung kenalan dan sok akrab.", tipe: "mendoan" },
      { teks: "Diem aja, nunggu diajak ngomong duluan.", tipe: "bakwan" },
      { teks: "Ngamatin dari jauh sambil nge-judge dikit.", tipe: "tahu" }
    ]
  },
  {
    tanya: "Lagi jalan, eh liat ada kecelakaan kecil di pinggir jalan...",
    opsi: [
      { teks: "Langsung turun tangan bantuin.", tipe: "mendoan" },
      { teks: "Cuma nontonin sambil bikin status WA.", tipe: "bakwan" },
      { teks: "Mikir: 'Waduh, bakal macet nih jalanan.'", tipe: "tahu" }
    ]
  },
  {
    tanya: "Dompet lagi kering tapi pengen jajan, solusinya?",
    opsi: [
      { teks: "Cari temen yang bisa ditraktir (ngarep).", tipe: "mendoan" },
      { teks: "Tidur aja biar lupa rasa lapar.", tipe: "bakwan" },
      { teks: "Buka tabungan koin yang ada di botol.", tipe: "tahu" }
    ]
  },
  {
    tanya: "Kalau ada tugas kelompok, kamu tipe yang mana?",
    opsi: [
      { teks: "Seksi sibuk yang ngerjain semuanya.", tipe: "mendoan" },
      { teks: "Namanya doang ada, orangnya ilang.", tipe: "bakwan" },
      { teks: "Bagian desain biar kelihatan keren padahal dikit kerjaannya.", tipe: "tahu" }
    ]
  },
  {
    tanya: "Pas lagi antre bensin, ada yang nyerobot di depanmu!",
    opsi: [
      { teks: "Ngalah aja deh, mungkin dia lagi buru-buru.", tipe: "mendoan" },
      { teks: "Ngomel-ngomel sendiri tapi gak berani negur.", tipe: "bakwan" },
      { teks: "Langsung klakson kenceng dan tegor: 'WOI ANTRE!'", tipe: "tahu" }
    ]
  },
  {
    tanya: "Lagi makan sate, terus bajumu kena noda bumbu kacang...",
    opsi: [
      { teks: "Biasa aja, nanti juga dicuci (santuy).", tipe: "mendoan" },
      { teks: "Langsung panik cari tisu tapi malah makin berantakan.", tipe: "bakwan" },
      { teks: "Seharian badmood gara-gara noda itu.", tipe: "tahu" }
    ]
  },
  {
    tanya: "Pas lagi asik scroll HP, eh ada telepon masuk dari nomor gak dikenal!",
    opsi: [
      { teks: "Angkat aja, siapa tahu dapet undian.", tipe: "mendoan" },
      { teks: "Diliatin doang sampai berhenti bunyi.", tipe: "bakwan" },
      { teks: "Reject langsung, palingan sales asuransi.", tipe: "tahu" }
    ]
  },
  {
    tanya: "Reaksimu kalau dapet kado yang kamu gak suka?",
    opsi: [
      { teks: "Tetap bilang 'Makasih banget!' sambil senyum tulus.", tipe: "mendoan" },
      { teks: "Bilang makasih tapi mukanya gak bisa bohong.", tipe: "bakwan" },
      { teks: "Tanya: 'Ini belinya di mana? Bisa tukar gak?'", tipe: "tahu" }
    ]
  },
  {
    tanya: "Gimana caramu ngadepin hari Senin yang berat?",
    opsi: [
      { teks: "Ngalir aja kayak air, sing penting yakin.", tipe: "mendoan" },
      { teks: "Sambat di semua sosmed dari pagi sampai malem.", tipe: "bakwan" },
      { teks: "Bikin list to-do yang ketat biar cepet kelar.", tipe: "tahu" }
    ]
  },
  {
    tanya: "Lagi nonton film sedih di bioskop, kamu...",
    opsi: [
      { teks: "Nangis sesenggukan tanpa malu.", tipe: "mendoan" },
      { teks: "Tahan tangis sampai idung meler.", tipe: "bakwan" },
      { teks: "Mikir: 'Ini aktingnya kurang natural deh.'", tipe: "tahu" }
    ]
  },
  {
    tanya: "Nemu kecoak telentang di tengah jalan kamarmu, kamu bakal...",
    opsi: [
      { teks: "Kasihan, mau dibalik tapi takut.", tipe: "mendoan" },
      { teks: "Terpaku diam, lalu panggil bantuan se-RT.", tipe: "bakwan" },
      { teks: "Ambil sapu, eksekusi dalam satu serangan.", tipe: "tahu" }
    ]
  },
  {
    tanya: "Lagi nunggu jemputan tapi gak dateng-dateng...",
    opsi: [
      { teks: "Sabar nunggu sambil liatin semut lewat.", tipe: "mendoan" },
      { teks: "Spam chat dan telepon tiap 5 detik sekali.", tipe: "bakwan" },
      { teks: "Cari alternatif lain (ojol) biar gak buang waktu.", tipe: "tahu" }
    ]
  },
  {
    tanya: "Kalau kamu jadi bumbu dapur, kamu pilih jadi apa?",
    opsi: [
      { teks: "Kecap manis, biar semua suka.", tipe: "mendoan" },
      { teks: "Garam, kalo gak ada aku, hidup hambar.", tipe: "bakwan" },
      { teks: "Cabe rawit, kecil-kecil bikin nangis.", tipe: "tahu" }
    ]
  },
  {
    tanya: "Dapet undangan nikahan mantan, kamu dateng gak?",
    opsi: [
      { teks: "Dateng dong, jalin silaturahmi.", tipe: "mendoan" },
      { teks: "Dateng kalo ada temen barengannya.", tipe: "bakwan" },
      { teks: "Gak bakal, mending uang kondangan buat jajan boba.", tipe: "tahu" }
    ]
  },
  {
    tanya: "Apa yang kamu lakukan kalau salah kirim chat ke grup kantor?",
    opsi: [
      { teks: "Minta maaf sopan terus unsend.", tipe: "mendoan" },
      { teks: "Panik, gemeteran, pengen resign saat itu juga.", tipe: "bakwan" },
      { teks: "Stay cool, pura-pura HP dibajak adek.", tipe: "tahu" }
    ]
  },
  {
    tanya: "Gimana gaya kamu kalo lagi belanja di mall?",
    opsi: [
      { teks: "Muter-muter dulu, gak beli apa-apa cuma cuci mata.", tipe: "mendoan" },
      { teks: "Beli barang yang gak direncanakan gara-gara laper mata.", tipe: "bakwan" },
      { teks: "Bawa catatan belanja, langsung ke toko yang dituju.", tipe: "tahu" }
    ]
  },
  {
    tanya: "Ada pengamen dateng pas kamu lagi asik makan...",
    opsi: [
      { teks: "Kasih uang kecil sambil bilang 'Maaf ya Bang'.", tipe: "mendoan" },
      { teks: "Gak liat, fokus makan padahal grogi.", tipe: "bakwan" },
      { teks: "Kasih kode tangan 'maaf' dengan tegas tanpa noleh.", tipe: "tahu" }
    ]
  },
  {
    tanya: "Reaksimu kalau liat orang pamer kekayaan di sosmed?",
    opsi: [
      { teks: "Wah hebat ya dia, semoga nular.", tipe: "mendoan" },
      { teks: "Sambil rebahan mikir: 'Kapan ya gue gitu?'", tipe: "bakwan" },
      { teks: "Liatin tagihannya, itu asli apa editan?", tipe: "tahu" }
    ]
  },
  {
    tanya: "Menurutmu, apa hal paling penting dalam hidup?",
    opsi: [
      { teks: "Kedamaian dan kasih sayang.", tipe: "mendoan" },
      { teks: "Keseruan dan pengalaman baru.", tipe: "bakwan" },
      { teks: "Logika dan kemandirian.", tipe: "tahu" }
    ]
  }
];

const hasilDeskripsi = {
  mendoan: {
    judul: "Tempe Mendoan",
    emoji: "🫠",
    desc: "Kamu orangnya fleksibel, lembut hati, dan gampang banget berbaur. Tapi hati-hati, saking lembeknya kamu sering jadi tempat sandaran (dan dimanfaatin) orang lain!"
  },
  bakwan: {
    judul: "Bakwan Sayur (Bala-Bala)",
    emoji: "🥗",
    desc: "Luarannya keras dan tangguh, tapi dalamnya penuh variasi (dan kadang penuh kejutan). Kamu sedikit berantakan tapi semua orang butuh kamu!"
  },
  tahu: {
    judul: "Tahu Isi Pedas",
    emoji: "🌶️",
    desc: "Kelihatannya kalem dan biasa aja dari luar, tapi sekali dikritik atau disenggol, pedasnya keluar semua! Kamu punya prinsip yang kuat."
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
      <div className="min-h-screen bg-yellow-50 flex items-center justify-center p-6 text-center font-sans">
        <div className="bg-white p-10 rounded-[40px] shadow-2xl border-4 border-yellow-600 max-w-md">
          <div className="text-8xl mb-6">{data.emoji}</div>
          <h1 className="text-4xl font-black text-yellow-700 my-4 uppercase tracking-tighter">KAMU ADALAH {data.judul}</h1>
          <p className="text-gray-600 font-medium italic mb-8">"{data.desc}"</p>
          <button onClick={() => window.location.reload()} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-black py-4 rounded-2xl shadow-[0_5px_0_0_rgba(161,98,7,1)] active:shadow-none active:translate-y-1 transition-all uppercase">
            Goreng Ulang (Main Lagi)
          </button>
          <Link href="/cari-telur" className="block mt-6 text-yellow-600 font-bold hover:underline">Balik ke Rak Telur</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-400 flex flex-col items-center justify-center p-6 relative">
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
              className="p-5 text-left bg-yellow-50 hover:bg-yellow-500 border-2 border-yellow-100 hover:border-yellow-600 group rounded-3xl transition-all shadow-sm active:scale-95"
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