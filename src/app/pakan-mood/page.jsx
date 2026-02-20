"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function PakanMood() {
  const [menuAktif, setMenuAktif] = useState('utama'); // utama, mood-booster, konten
  const [loading, setLoading] = useState(false);
  const [hasil, setHasil] = useState(null);

  const database = {
    quotes: [
      "Jangan pernah menyerah, ingat cicilanmu tidak akan lunas dengan menangis.",
      "Masa depanmu tergantung pada impianmu, jadi pergilah tidur sekarang juga.",
      "Pekerjaan seberat apapun akan terasa ringan jika tidak dikerjakan.",
      "Jadilah seperti kopi, sudah hitam, pahit, tapi banyak yang cari. Kamu? Sudah pahit, nggak dicari pula.",
      "Uang bukan segalanya, tapi segalanya butuh uang. Apalagi buat bayar gaya hidupmu yang maksa itu.",
      "Sukses itu berawal dari mimpi. Tapi mimpi gak akan jadi nyata kalau kamu gak bangun-bangun dari kasur.",
      "Jangan membalas dendam, biarkan karma yang bekerja. Kamu diam saja, soalnya kamu kan malas.",
      "Kegagalan adalah kesuksesan yang tertunda. Tapi kalau tertunda terus, ya namanya gagal total.",
      "Berhentilah mencari orang yang sempurna, cari saja orang yang mau menerima kamu yang apa adanya ini. Itu aja udah susah.",
      "Hidup itu seperti roda, kadang di atas, kadang di bawah. Kamu? Kayaknya rodanya bocor, jadi di bawah terus.",
      "Jangan menuntut ilmu terlalu tinggi, kasihan ilmunya nggak salah apa-apa dituntut.",
      "Jika orang lain bisa, kenapa harus kita? Lebih baik kita dukung mereka dari jauh sambil ngemil.",
      "Mimpi adalah kunci untuk menaklukan dunia. Masalahnya, kunci kamu sering hilang atau salah lubang.",
      "Janganlah kamu sombong, karena di atas langit masih ada langit, dan di bawah kamu masih ada tanah kuburan.",
      "Hargai orang tuamu, mereka berhasil membesarkanmu tanpa bantuan fitur 'Undo'.",
      "Penyesalan itu datangnya di akhir. Kalau di awal, namanya pendaftaran atau DP rumah.",
      "Cintailah pekerjaanmu, tapi jangan cintai perusahaannya. Karena perusahaan gak akan melayat kalau kamu mati kecapekan.",
      "Jadilah dirimu sendiri. Kalau dirimu sendiri aja udah aneh, ya udah pasrah aja.",
      "Kesuksesan berawal dari niat. Niat aja gak cukup, tapi ya emang cuma itu yang kamu punya kan?",
      "Jangan menyerah pada nasib. Nasib aja udah menyerah sama kamu sejak kamu mulai malas-malasan."
    ],
    jokes: [
      "Kenapa zombie kalau nyerang bareng-bareng? Karena kalau sendirian namanya zomblo.",
      "Ikan apa yang berhenti? Ikan 'Pause'.",
      "Sayur apa yang jago nyanyi? 'Kol-play'.",
      "Kenapa superman bajunya pake huruf S? Karena kalau pake M jadinya Suparman.",
      "Penyanyi luar negeri yang susah nelen? Ed Seret.",
      "Sate apa yang dari bawah pohon? Sate-lah (Setelah) kamu tanya begitu.",
      "Gajah apa yang paling baik hati? Gajah-at (Gak jahat).",
      "Kenapa di rel kereta api ada batunya? Karena kalau ada duitnya nanti jadi rebutan.",
      "Sandal apa yang paling enak? Sandal terasi.",
      "Penyanyi yang suka nunda-nunda? Melly Go-slow.",
      "Buah apa yang cocok buat jomblo? Buah-agia (Bahagia) sendirian.",
      "Makanan yang bisa nelpon? Takoyaki (Tako-yak-hi, halo?).",
      "Kenapa matahari tenggelam? Karena gak bisa berenang.",
      "Bundaran HI kalau diputer 3 kali jadi apa? Jadi HIHIHI.",
      "Sepatu, sepatu apa yang bisa lari? Sepatu-da (Sepatuda, maksudnya sepeda... maksa dikit ya).",
      "Awan, awan apa yang gak ada di langit? Awan-ti (Anti) sombong.",
      "Sabun, sabun apa yang genit? Sabun-colek.",
      "Kebo, kebo apa yang bikin kita capek? Ke-bo-gor jalan kaki.",
      "Kenapa pohon mangga harus ditebang? Karena kalau dicabut berat.",
      "Benda apa yang kalau dipotong malah jadi lebih tinggi? Celana panjang."
    ],
    fakta: [
      "Tahukah kamu? Semut tidak punya paru-paru, tapi etos kerjanya lebih tinggi dari kamu.",
      "Kecoak bisa hidup 9 hari tanpa kepala, sedangkan kamu diputusin sehari aja udah mau mati.",
      "Otak manusia lebih aktif saat tidur daripada nonton sinetron.",
      "Udang itu darahnya biru, kayak cintaku padanya yang cuma berakhir jadi memar biru.",
      "Siput bisa tidur selama 3 tahun. Cita-cita yang sangat mulia untuk kaum rebahan seperti kamu.",
      "Secara teknis, tomat adalah buah. Tapi naruh tomat di salad buah tetaplah sebuah kriminalitas.",
      "Madat tidak pernah basi. Arkeolog nemu madu umur 3000 tahun dan masih enak. Gak kayak janji manismu.",
      "Jantung udang ada di kepalanya. Pantesan udang kalau mikir pakai perasaan, eh kebalik ya?",
      "Kuda nil keringatnya warna pink. Kamu kalau kepanasan keringatnya bau matahari, beda kelas.",
      "Rata-rata orang menghabiskan 6 bulan hidupnya nunggu lampu merah. Sisanya nunggu kepastian dari dia.",
      "Emas bisa dimakan. Tapi kalau kamu makan emas, yang ada malah ususmu jadi pegadaian.",
      "Gurita punya 3 jantung. Satunya buat hidup, dua lainnya mungkin buat disakiti berkali-kali.",
      "Kucing punya 32 otot di setiap telinganya. Makanya mereka pinter banget denger suara bungkus makanan tapi budek kalau dipanggil.",
      "Pisang secara botanis adalah buah buni (berry), sedangkan stroberi bukan. Hidup ini penuh kebohongan.",
      "Hidung dan telinga manusia gak pernah berhenti tumbuh. Itulah kenapa kakek-kakek telinganya lebar, biar lebih jelas denger gosip tetangga.",
      "Sidik jari koala hampir identik dengan manusia. Jadi kalau ada kasus pencurian, koala bisa jadi tersangka utama.",
      "Satu hari di planet Venus lebih lama dari satu tahunnya. Cocok buat kamu yang ngerasa hari Senin gak beres-beres.",
      "Bintang laut gak punya otak. Tapi mereka tetap bisa bertahan hidup, persis kayak beberapa orang yang kamu kenal.",
      "Suara bebek gak bergema. Gak ada yang tau alasannya, mungkin dunia emang gak peduli sama pendapat bebek.",
      "Manusia rata-rata melepaskan sekitar 18kg kulit selama hidupnya. Kamu udah ganti kulit berkali-kali tapi tetep aja gak glowing."
    ],
    ramalan: [
      "Nasibmu hari ini: Akan ada bau-bau uang, tapi ternyata itu cuma bau dompet kulit kosong.",
      "Zodiak hari ini: Keuanganmu seperti es krim di siang bolong, cepat habis sebelum dinikmati.",
      "Ramalan Karir: Bosmu akan tersenyum padamu hari ini. Pertanda dia lupa namamu.",
      "Asmara: Akan ada yang mendekat, tapi ternyata cuma mau nawarin asuransi.",
      "Kesehatan: Kurangi begadang nonton TikTok, mata kamu udah kayak panda kena tipes.",
      "Keuangan: Ada rezeki nomplok hari ini, tapi sayangnya itu cuma saldo e-wallet yang kepotong biaya admin.",
      "Nasib: Hari ini kamu akan merasa sangat berguna, tapi ternyata cuma buat jadi hotspot tethering temen.",
      "Zodiak: Bintangmu hari ini adalah Libra. Lupakan cicilan, beranikan diri buat beli kopi mahal.",
      "Pekerjaan: Besok senin. Udah gitu aja ramalannya. Menyakitkan kan?",
      "Hubungan: Gebetanmu sebenernya suka sama kamu, tapi dia lebih suka kalau kamu nggak ada.",
      "Keberuntungan: Kamu akan menemukan benda berharga di saku celana lama. Ternyata cuma struk belanja tahun lalu.",
      "Masa Depan: Cerah banget, saking cerahnya sampai kamu gak bisa liat apa-apa alias gelap.",
      "Kesehatan Mental: Kamu butuh liburan, tapi dompetmu butuh kerja paksa. Silakan bertarung!",
      "Ramalan Diet: Hari ini dietmu akan berhasil, sampai kamu mencium bau nasi padang dari jarak 100 meter.",
      "Asmara: Status hubunganmu hari ini stabil. Tetap jomblo dan tetap mengenaskan.",
      "Karier: Keinginan untuk resign sangat kuat, tapi keinginan untuk makan jauh lebih kuat. Semangat budak korporat!",
      "Sosial: Hari ini kamu akan dapet notifikasi chat panjang. Ternyata dari pinjol nagih angsuran.",
      "Motivasi: Jangan berhenti bermimpi. Tapi ya bangun dong, udah siang, mandi sana!",
      "Peringatan: Hindari menatap cermin terlalu lama, takutnya kamu sadar kalau kamu itu beban keluarga.",
      "Ramalan Umum: Sesuatu yang besar akan datang padamu hari ini. Mungkin itu tagihan listrik atau cicilan motor."
    ],
   roasting: {
      senang: [
        "Cie lagi seneng... Paling besok juga saldo ATM sisa 50 ribu langsung meriang.",
        "Senyum terus, kayak dapet giveaway aja. Padahal mah tagihan paylater udah numpuk.",
        "Lagi bahagia? Inget, bahagia itu cuma jeda di antara dua penderitaan. Nikmatin selagi sempat!",
        "Lagi seneng ya? Hati-hati, biasanya setelah ini ada plot twist menyakitkan dari semesta.",
        "Pamer kebahagiaan terus, emang nggak capek pencitraan di depan followers yang nggak peduli?",
        "Lagi di atas awan ya? Awas jatuh, aspal sekarang makin keras dan biaya rumah sakit mahal.",
        "Seneng banget? Baru dapet transferan ya? Coba cek lagi, itu cuma lewat doang apa emang milikmu?",
        "Bahagia itu sederhana, yang ribet itu gaya hidupmu pas lagi banyak duit.",
        "Senyumnya lebar banget, kayak lagi nutupin cicilan yang nunggak dua bulan.",
        "Iya deh yang lagi happy... Inget ya, dunia ini berputar, besok jangan nangis di pojokan!"
      ],
      sedih: [
        "Sedih mulu, kamu itu manusia apa lagu galau tahun 2000-an?",
        "Nangis terus, air matamu nggak bakal bisa berubah jadi bensin buat motor yang udah kering.",
        "Lagi galau? Dunia nggak bakal berhenti muter cuma buat nungguin kamu selesai drama.",
        "Sedih itu pilihan, dan kayaknya kamu hobi banget milih itu biar dikasihanin orang.",
        "Muka jangan ditekuk gitu, udah jelek makin jelek, nanti malah dikira kesurupan reog.",
        "Sedih gara-gara cinta? Lemah! Orang pinter mah sedihnya kalau stok beras abis.",
        "Halah, paling sedihnya cuma karena nggak dapet perhatian. Manja banget!",
        "Inget, di atas langit masih ada langit. Di bawah kesedihanmu, masih ada orang yang lebih susah tapi nggak selebay kamu.",
        "Air mata nggak bisa bayar kosan. Mending hapus air mata, terus cari kerja!",
        "Lagi ngerasa jadi orang paling malang? Sini, Bang Jago ketawain biar makin lengkap malangnya."
      ],
      marah: [
        "Marah-marah mulu, darah tinggi naik, nanti kalau mati yang dapet warisan siapa? Selingkuhan?",
        "Emosi terus, itu muka apa kompor meleduk? Merah banget!",
        "Marah itu energi, mending energinya dipake buat cari duit daripada buat ngerusak perabotan.",
        "Cie lagi ngamuk... Udah berasa paling sangar? Inget, cicilanmu masih banyak, jangan belagu!",
        "Marah sama keadaan? Keadaan mah biasa aja, kamunya aja yang nggak becus adaptasi.",
        "Nggak usah teriak-teriak, suara kamu nggak bakal bikin masalah ilang, malah bikin tetangga budek.",
        "Lagi emosi? Coba ngaca, kalau lagi marah muka kamu mirip banget sama tuyul nggak dapet koin.",
        "Sabar itu subur, kalau marah itu kubur. Mau dikubur sekarang apa nunggu insyaf?",
        "Marah-marah di sosmed? Cupu! Sini adu jago sama Bang Jago kalau berani!",
        "Tensi naik? Hati-hati pecah pembuluh darah, biaya operasi mahal, BPJS antriannya panjang."
      ],
      gabut: [
        "Gabut itu tanda kamu nggak punya tujuan hidup. Mending cuci piring sana!",
        "Lagi gabut ya? Scroll TikTok terus sampe jempolmu kapalan dan otakmu tumpul.",
        "Orang sukses sibuk cari peluang, orang gabut kayak kamu sibuk nyari arti hidup di Google.",
        "Gabut itu kemewahan buat orang kaya, kalau kamu mah namanya malas yang dipelihara.",
        "Daripada gabut, mending kamu belajar sesuatu. Tapi ya sudahlah, niat aja nggak punya.",
        "Gabut tingkat dewa? Coba hitung butiran nasi di piring, siapa tahu dapet ilham buat kerja.",
        "Jangan gabut terus, nanti rejekimu dipatok ayam. Ayamnya aja rajin bangun pagi, lah kamu?",
        "Gabut itu jembatan menuju kehaluan. Hati-hati nanti malah halu jadi orang kaya.",
        "Waktu adalah uang. Kalau kamu gabut, berarti kamu lagi buang-buang duit yang sebenernya emang nggak ada.",
        "Lagi gak ngapa-ngapain? Bagus, setidaknya kamu nggak bikin masalah buat orang lain hari ini."
      ]
    },
    memes: [
      { deskripsi: "Kucing Teriak", link: "https://i.postimg.cc/mD3m6vM9/woman-cat.jpg" },
      { deskripsi: "Mas-mas Noleh", link: "https://i.postimg.cc/dVW3mS3n/distracted.jpg" },
      { deskripsi: "Spider-Man Tunjuk-tunjukan", link: "https://i.postimg.cc/pL4X8Xf0/spiderman.jpg" },
      { deskripsi: "Kucing Polite (Senyum Tipis)", link: "https://i.postimg.cc/7Y8kH8k0/polite-cat.jpg" },
      { deskripsi: "Drake Hotline Bling", link: "https://i.postimg.cc/6pXmXf9d/drake.jpg" },
      { deskripsi: "Galaxy Brain (Akal Sehat)", link: "https://i.postimg.cc/8P6mH4vF/galaxy-brain.jpg" },
      { deskripsi: "Success Kid (Bocah Berhasil)", link: "https://i.postimg.cc/BZ8mYFp6/success-kid.jpg" },
      { deskripsi: "Spongebob Imajinasi", link: "https://i.postimg.cc/kX8mN4L8/spongebob.jpg" },
      { deskripsi: "Surprised Pikachu", link: "https://i.postimg.cc/mrcmH4nF/pikachu.jpg" },
      { deskripsi: "Hide the Pain Harold (Kakek Senyum)", link: "https://i.postimg.cc/3R6mH4G8/harold.jpg" },
      { deskripsi: "This is Fine (Anjing Api)", link: "https://i.postimg.cc/Vv8mH4tF/this-is-fine.jpg" },
      { deskripsi: "Shaggy Are You Challenging Me?", link: "https://i.postimg.cc/9F6mH4fF/shaggy.jpg" },
      { deskripsi: "Liam Neeson (I Will Find You)", link: "https://i.postimg.cc/yx8mH4nF/liam.jpg" },
      { deskripsi: "Patrick Star Melongo", link: "https://i.postimg.cc/vH8mH4fF/patrick.jpg" },
      { deskripsi: "He's Got a Point", link: "https://i.postimg.cc/4N6mH4fF/point.jpg" },
      { deskripsi: "Chubby Girl Running", link: "https://i.postimg.cc/rF6mH4fF/girl-running.jpg" },
      { deskripsi: "Wait, That's Illegal", link: "https://i.postimg.cc/pT6mH4fF/illegal.jpg" },
      { deskripsi: "Leo DiCaprio Cheers", link: "https://i.postimg.cc/Y96mH4fF/leo.jpg" },
      { deskripsi: "Batman Tampar Robin", link: "https://i.postimg.cc/R06mH4fF/batman.jpg" },
      { deskripsi: "Modern Problems", link: "https://i.postimg.cc/gJ6mH4fF/modern.jpg" }
    ]
  };

  const getPakan = (tipe) => {
    setLoading(true);
    setMenuAktif('konten');
    setTimeout(() => {
      const data = database[tipe];
      const random = data[Math.floor(Math.random() * data.length)];
      setHasil({ tipe: tipe.toUpperCase(), isi: random });
      setLoading(false);
    }, 700);
  };

  const getRoasting = (mood) => {
  setLoading(true);
  setMenuAktif('konten');
  
  setTimeout(() => {
    // 1. Ambil daftar list roasting sesuai mood (array)
    const daftarHinaan = database.roasting[mood];
    
    // 2. Pilih salah satu secara acak
    const randomIdx = Math.floor(Math.random() * daftarHinaan.length);
    const hasilRoasting = daftarHinaan[randomIdx];

    // 3. Set hasil ke state
    setHasil({ 
      tipe: `ROASTING ${mood.toUpperCase()}`, 
      isi: hasilRoasting 
    });
    
    setLoading(false);
  }, 700);
};

  return (
    <main className="min-h-screen bg-[#0a0f1e] text-slate-200 p-4 sm:p-6 flex flex-col items-center font-sans overflow-x-hidden">
      
      {/* Tombol Back ke Lobi */}
      <div className="w-full max-w-md mb-8 flex items-center">
        <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-white font-black transition text-sm">
          <span className="text-xl">←</span> KEMBALI KE LOBI
        </Link>
      </div>

      {/* 1. MENU UTAMA */}
      {menuAktif === 'utama' && (
        <div className="w-full max-w-md animate-in fade-in slide-in-from-top-4 duration-500">
          <h1 className="text-5xl font-black text-white italic mb-2 tracking-tighter">PAKAN MOOD 🍗</h1>
          <p className="text-slate-500 mb-8 font-medium">Asupan mental biar nggak gila-gila banget.</p>
          
          <div className="grid grid-cols-1 gap-4">
            {[
              { id: 'quotes', label: 'Random Quotes', icon: '📜', sub: 'Biar keliatan bijak' },
              { id: 'jokes', label: 'Jokes Bapak-bapak', icon: '🧔', sub: 'Receh tingkat dewa' },
              // { id: 'memes', label: 'Random Meme', icon: '🖼️', sub: 'Dopamin instan' },
              { id: 'fakta', label: 'Fakta Unik/Aneh', icon: '🕵️', sub: 'Biar nggak kuper' },
              { id: 'ramalan', label: 'Ramalan Nasib', icon: '🔮', sub: 'Cek keberuntunganmu' },
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => getPakan(item.id)} 
                className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 p-5 rounded-[2rem] transition-all hover:bg-indigo-600 hover:border-indigo-400 group text-left"
              >
                <span className="text-3xl group-hover:scale-125 transition-transform">{item.icon}</span>
                <div>
                  <p className="font-black text-white group-hover:text-white leading-none">{item.label}</p>
                  <p className="text-[10px] text-slate-500 group-hover:text-indigo-200 uppercase mt-1 tracking-widest">{item.sub}</p>
                </div>
              </button>
            ))}

            {/* Tombol Spesial Mood Booster */}
            <button 
              onClick={() => setMenuAktif('mood-booster')} 
              className="flex items-center gap-4 bg-yellow-500 p-6 rounded-[2rem] text-black hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-yellow-500/10"
            >
              <span className="text-4xl">🚀</span>
              <div className="text-left">
                <p className="font-black text-xl leading-none italic">MOOD BOOSTER</p>
                <p className="text-[11px] font-bold opacity-80 uppercase tracking-tighter">Gimana perasaanmu hari ini?</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* 2. MENU PILIH MOOD (ROASTING) */}
      {menuAktif === 'mood-booster' && (
        <div className="w-full max-w-md animate-in zoom-in duration-300">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white italic">LAGI MERASA APA?</h2>
            <p className="text-slate-500 uppercase text-xs tracking-[0.2em]">Pilih satu untuk di-roasting</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => getRoasting('senang')} className="p-8 bg-slate-900 border-2 border-yellow-500 rounded-[2.5rem] text-5xl hover:bg-yellow-500 transition-all active:scale-90">😊</button>
            <button onClick={() => getRoasting('sedih')} className="p-8 bg-slate-900 border-2 border-blue-500 rounded-[2.5rem] text-5xl hover:bg-blue-500 transition-all active:scale-90">😢</button>
            <button onClick={() => getRoasting('marah')} className="p-8 bg-slate-900 border-2 border-red-500 rounded-[2.5rem] text-5xl hover:bg-red-500 transition-all active:scale-90">😡</button>
            <button onClick={() => getRoasting('gabut')} className="p-8 bg-slate-900 border-2 border-slate-500 rounded-[2.5rem] text-5xl hover:bg-slate-500 transition-all active:scale-90">😐</button>
          </div>
          
          <button 
            onClick={() => setMenuAktif('utama')} 
            className="w-full mt-10 text-slate-500 font-bold hover:text-white transition"
          >
            ← Gak jadi, mau menu lain
          </button>
        </div>
      )}

      {/* 3. SCREEN HASIL (CARD) */}
      {menuAktif === 'konten' && (
        <div className="w-full max-w-md flex flex-col items-center">
          {loading ? (
            <div className="mt-32 flex flex-col items-center">
              <div className="text-7xl animate-bounce mb-6">🍗</div>
              <p className="font-black text-yellow-500 tracking-[0.3em] uppercase text-sm animate-pulse">Menyiapkan Pakan...</p>
            </div>
          ) : (
            <div className="w-full animate-in zoom-in slide-in-from-bottom-10 duration-500">
              <div className="bg-white text-black p-10 rounded-[3rem] shadow-[0_20px_0_0_#1e293b] border-x-4 border-t-4 border-black relative">
                
                {/* Badge Tipe */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-1 rounded-full text-[10px] font-black tracking-[0.2em]">
                  {hasil?.tipe}
                </div>

                <div className="mt-4 text-center">
                  {typeof hasil?.isi === 'object' ? (
                    /* Jika Meme (Objek) */
                    <div className="flex flex-col items-center">
                      <img 
                        src={hasil.isi.link} 
                        alt="meme" 
                        className="rounded-3xl mb-6 border-4 border-black shadow-xl w-full object-cover aspect-square" 
                      />
                      <p className="text-lg font-black italic text-slate-500">"{hasil.isi.deskripsi}"</p>
                    </div>
                  ) : (
                    /* Jika Teks Biasa (String) */
                    <p className="text-2xl font-black leading-tight italic py-4">
                      "{hasil?.isi}"
                    </p>
                  )}
                </div>

                <div className="mt-10 pt-6 border-t-2 border-dashed border-slate-200">
                  <button 
                    onClick={() => setMenuAktif('utama')} 
                    className="w-full bg-indigo-600 text-white font-black py-5 rounded-[1.5rem] hover:bg-indigo-700 transition shadow-[0_6px_0_0_#312e81] active:translate-y-1 active:shadow-none"
                  >
                    MINTA JATAH LAGI
                  </button>
                </div>
              </div>
              
              <p className="text-center mt-12 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                Bang Jago • Pakan Mood v1.0
              </p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}