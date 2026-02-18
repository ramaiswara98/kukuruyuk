"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RiwayatDonatur() {
  const [donatur, setDonatur] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "trapi-dnsB8a8V5V1vG7zV0DcV4gud";
  const ENDPOINT = "https://api.trakteer.id/v1/public/supports?limit=50";

  useEffect(() => {
    const fetchDonatur = async () => {
      try {
        const response = await fetch(ENDPOINT, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'key': API_KEY, // Trakteer API menggunakan header 'key'
          }
        });

        if (!response.ok) throw new Error('Gagal mengambil data donatur');
        
        const json = await response.json();
        
        // Filter hanya yang statusnya "success"
        const successData = json.result.data.filter(item => item.status === "success");
        setDonatur(successData);
      } catch (err) {
        console.error(err)
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonatur();
  }, []);

  return (
    <main className="min-h-screen bg-[#020617] text-white p-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-10">
        <Link href="/" className="text-slate-500 font-bold hover:text-white transition">← KEMBALI</Link>
        <div className="text-right">
          <h1 className="text-2xl font-black italic tracking-tighter text-yellow-500">PAHLAWAN KELUARGA</h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">List Donatur Trakteer</p>
        </div>
      </div>

      <div className="w-full max-w-2xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-black text-slate-500 animate-pulse">MEMANGGIL PARA JURAGAN...</p>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border-2 border-red-500 p-6 rounded-3xl text-center">
            <p className="text-red-500 font-bold">Waduh! {error}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {donatur.length === 0 ? (
              <p className="text-center text-slate-500 italic">Belum ada donatur, jadilah yang pertama!</p>
            ) : (
              donatur.map((item, index) => (
                <div 
                  key={item.order_id || index} 
                  className="bg-slate-900/50 border border-slate-800 p-5 rounded-[2rem] hover:border-yellow-500/50 transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-black text-white group-hover:text-yellow-500 transition-colors">
                        {item.creator_name || "Hamba Allah"}
                      </h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">
                        {item.quantity} {item.unit_name} • Rp {item.amount.toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div className="bg-yellow-500/10 text-yellow-500 text-[10px] font-black px-3 py-1 rounded-full border border-yellow-500/20">
                      SUCCESS
                    </div>
                  </div>
                  
                  {item.support_message && (
                    <div className="mt-3 bg-slate-950/50 p-3 rounded-2xl border-l-4 border-yellow-500 italic text-sm text-slate-300">
                      "{item.support_message}"
                    </div>
                  )}
                  
                  <div className="mt-3 text-[9px] text-slate-600 font-bold flex gap-3">
                    <span>MENGGUNAKAN {item.payment_method}</span>
                    <span>•</span>
                    <span>{new Date(item.updated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <footer className="mt-20 text-slate-700 text-[10px] font-black tracking-[0.3em] uppercase pb-10">
        Powered by Trakteer.id API
      </footer>
    </main>
  );
}