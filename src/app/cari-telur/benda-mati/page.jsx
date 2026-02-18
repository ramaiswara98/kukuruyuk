"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

const bankPertanyaan = [
  {
    tanya: "Apa yang kamu lakukan kalau tiba-tiba mati lampu di tengah malam?",
    opsi: [
      { teks: "Tetap tenang dan langsung tidur lagi.", tipe: "kasur" },
      { teks: "Mencari HP buat jadi senter sambil panik.", tipe: "lampu" },
      { teks: "Mikirin hal-hal mistis yang bakal muncul.", tipe: "lemari" }
    ]
  },
  {
    tanya: "Gimana caramu menyimpan pakaian di kamar?",
    opsi: [
      { teks: "Dilipat rapi sesuai warna dan jenis.", tipe: "lemari" },
      { teks: "Ditaruh di atas kursi sampai menggunung.", tipe: "kasur" },
      { teks: "Digantung seadanya yang penting nggak lecek.", tipe: "lampu" }
    ]
  },
  {
    tanya: "Seberapa sering kamu membersihkan debu di kolong?",
    opsi: [
      { teks: "Jarang banget, nunggu debunya jadi fosil.", tipe: "kasur" },
      { teks: "Sesuai jadwal rutin seminggu sekali.", tipe: "lemari" },
      { teks: "Kalau lagi mood atau ada tamu mau dateng.", tipe: "lampu" }
    ]
  },
  {
    tanya: "Apa benda yang paling sering hilang di kamarmu?",
    opsi: [
      { teks: "Remot TV atau AC yang tiba-tiba lenyap.", tipe: "lampu" },
      { teks: "Uang koin di saku celana yang kotor.", tipe: "kasur" },
      { teks: "Kaus kaki yang pasangannya entah ke mana.", tipe: "lemari" }
    ]
  },
  {
    tanya: "Pas lagi sendirian di kamar, kamu biasanya ngapain?",
    opsi: [
      { teks: "Rebahan sambil scroll sosmed sampai ketiduran.", tipe: "kasur" },
      { teks: "Merenung sambil liatin cicak di plafon.", tipe: "lampu" },
      { teks: "Berbenah atau nata ulang posisi meja.", tipe: "lemari" }
    ]
  },
  {
    tanya: "Kalo ada nyamuk lewat, kamu bakal...",
    opsi: [
      { teks: "Tutup seluruh badan pakai selimut.", tipe: "kasur" },
      { teks: "Kejar sampai dapet pakai raket listrik.", tipe: "lemari" },
      { teks: "Diemin aja, biarin dia kenyang.", tipe: "lampu" }
    ]
  },
  {
    tanya: "Apa yang kamu rasakan kalau liat barang berantakan?",
    opsi: [
      { teks: "Biasa aja, itu namanya estetika kacau.", tipe: "kasur" },
      { teks: "Gatel pengen langsung beresin.", tipe: "lemari" },
      { teks: "Pusing tapi gak ngelakuin apa-apa.", tipe: "lampu" }
    ]
  },
  {
    tanya: "Gimana posisi tidur favoritmu?",
    opsi: [
      { teks: "Meringkuk kayak udang.", tipe: "kasur" },
      { teks: "Telentang kaku kayak mumi.", tipe: "lemari" },
      { teks: "Diagonal menguasai seluruh kasur.", tipe: "lampu" }
    ]
  },
  {
    tanya: "Berapa lama kamu bisa bertahan di kamar tanpa keluar sama sekali?",
    opsi: [
      { teks: "Seharian penuh, asal ada internet.", tipe: "kasur" },
      { teks: "Beberapa jam aja, bosenan soalnya.", tipe: "lampu" },
      { teks: "Sampai dicariin orang rumah karena dikira ilang.", tipe: "lemari" }
    ]
  },
  {
    tanya: "Apa hal pertama yang kamu cari pas bangun tidur?",
    opsi: [
      { teks: "HP, cek notif meskipun gak ada yang chat.", tipe: "lampu" },
      { teks: "Air minum karena haus banget.", tipe: "kasur" },
      { teks: "Jam dinding, memastikan masih punya waktu.", tipe: "lemari" }
    ]
  },
  {
    tanya: "Kalo disuruh milih, kamu pengen punya jendela yang view-nya apa?",
    opsi: [
      { teks: "Taman yang tenang dan adem.", tipe: "lemari" },
      { teks: "Lampu kota yang rame pas malem.", tipe: "lampu" },
      { teks: "Gak perlu jendela, yang penting AC dingin.", tipe: "kasur" }
    ]
  },
  {
    tanya: "Suara apa yang paling ganggu pas kamu lagi di kamar?",
    opsi: [
      { teks: "Suara knalpot brong di jalanan.", tipe: "lampu" },
      { teks: "Suara tetangga lagi renovasi rumah.", tipe: "lemari" },
      { teks: "Suara kipas angin yang udah mulai oblak.", tipe: "kasur" }
    ]
  },
  {
    tanya: "Gimana caramu ngadepin cucian baju yang numpuk?",
    opsi: [
      { teks: "Biarin aja sampai gak ada baju lagi buat dipake.", tipe: "kasur" },
      { teks: "Langsung bawa ke laundry biar praktis.", tipe: "lampu" },
      { teks: "Nyuci sendiri sedikit demi sedikit.", tipe: "lemari" }
    ]
  },
  {
    tanya: "Apa isi laci meja samping tempat tidurmu?",
    opsi: [
      { teks: "Kabel-kabel kusut dan charger rusak.", tipe: "lampu" },
      { teks: "Obat-obatan dan tisu.", tipe: "kasur" },
      { teks: "Buku atau catatan penting.", tipe: "lemari" }
    ]
  },
  {
    tanya: "Kalo denger suara aneh di luar kamar pas malem...",
    opsi: [
      { teks: "Langsung ngunci pintu rapat-rapat.", tipe: "lemari" },
      { teks: "Intip lewat celah pintu pelan-pelan.", tipe: "lampu" },
      { teks: "Tutup telinga pakai bantal, bodo amat.", tipe: "kasur" }
    ]
  },
  {
    tanya: "Gimana pencahayaan kamar idamanmu?",
    opsi: [
      { teks: "Terang benderang biar semangat.", tipe: "lemari" },
      { teks: "Remang-remang estetik pakai lampu tumblr.", tipe: "lampu" },
      { teks: "Gelap total, gak mau liat apa-apa.", tipe: "kasur" }
    ]
  },
  {
    tanya: "Apa barang di kamar yang paling lama kamu miliki?",
    opsi: [
      { teks: "Boneka atau bantal dari kecil.", tipe: "kasur" },
      { teks: "Buku pelajaran lama yang gak dibuang.", tipe: "lemari" },
      { teks: "Poster atau stiker yang udah pudar warnanya.", tipe: "lampu" }
    ]
  },
  {
    tanya: "Apa hal paling aneh yang pernah ada di kamarmu?",
    opsi: [
      { teks: "Piring kotor yang udah seminggu gak dicuci.", tipe: "kasur" },
      { teks: "Barang temen yang ketinggalan berbulan-bulan.", tipe: "lampu" },
      { teks: "Koleksi struk belanja yang gak tau buat apa.", tipe: "lemari" }
    ]
  },
  {
    tanya: "Kalo kamarmu bisa ngomong, dia bakal bilang apa?",
    opsi: [
      { teks: "'Mandi gih, udah bau apek nih!'", tipe: "lampu" },
      { teks: "'Tidur terus, gak bosen apa?'", tipe: "kasur" },
      { teks: "'Beresin gue dong, udah kayak kapal pecah!'", tipe: "lemari" }
    ]
  },
  {
    tanya: "Gimana caramu ninggalin kamar pas mau pergi lama?",
    opsi: [
      { teks: "Cek semua colokan dan lampu berkali-kali.", tipe: "lemari" },
      { teks: "Langsung pergi aja, tutup pintu.", tipe: "kasur" },
      { teks: "Beresin kasur dikit biar pas pulang gak stres.", tipe: "lampu" }
    ]
  }
];

const hasilDeskripsi = {
  kasur: {
    judul: "Kasur Empuk",
    emoji: "🛌",
    desc: "Kamu adalah definisi kenyamanan. Orang-orang suka berada di dekatmu karena kamu menenangkan, tapi kadang kamu terlalu mager untuk menghadapi dunia."
  },
  lampu: {
    judul: "Lampu Tidur Tumblr",
    emoji: "💡",
    desc: "Kamu penuh ide dan selalu bersinar di saat-saat gelap. Tapi kamu sensitif dan butuh suasana yang pas untuk menunjukkan jati dirimu."
  },
  lemari: {
    judul: "Lemari Jati",
    emoji: "🚪",
    desc: "Kamu sangat kokoh, terorganisir, dan bisa menyimpan banyak rahasia. Orang percaya padamu karena kamu terlihat kuat dan stabil."
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
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6 text-center font-sans">
        <div className="bg-white p-10 rounded-[40px] shadow-2xl border-4 border-yellow-600 max-w-md">
          <div className="text-8xl mb-6">{data.emoji}</div>
          <h1 className="text-4xl font-black text-yellow-700 my-4 uppercase tracking-tighter">KAMU ADALAH {data.judul}</h1>
          <p className="text-gray-600 font-medium italic mb-8">"{data.desc}"</p>
          <button onClick={() => window.location.reload()} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black py-4 rounded-2xl shadow-[0_5px_0_0_rgba(161,98,7,1)] active:shadow-none active:translate-y-1 transition-all uppercase">
            Goreng Ulang (Main Lagi)
          </button>
          <Link href="/cari-telur" className="block mt-6 text-yellow-600 font-bold hover:underline">Balik ke Rak Telur</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-400 flex flex-col items-center justify-center p-6 relative">
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
              className="p-5 text-left bg-blue-50 hover:bg-blue-500 border-2 border-yellow-100 hover:border-yellow-600 group rounded-3xl transition-all shadow-sm active:scale-95"
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