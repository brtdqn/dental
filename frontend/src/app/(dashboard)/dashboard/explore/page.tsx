"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/api/axios";

interface Lab {
  id: string;
  email: string;
  profile?: {
    fullName: string;
    address: string;
    specialties: string[];
    clinicName: string;
  };
}

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const { data } = await api.get('/profiles/producers');
        setLabs(data);
      } catch (error) {
        console.error("Failed to fetch labs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLabs();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 transition-colors">Laboratuvar Keşfet</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 transition-colors">Binlerce profesyonel teknisyen ve laboratuvar arasından seçim yapın.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-wrap gap-4 items-center transition-colors">
         <div className="flex-grow relative min-w-[300px]">
            <input 
               type="text" 
               placeholder="Laboratuvar veya uzmanlık ara..." 
               className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-2xl border border-transparent dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-4 top-3.5 text-xl">🔍</span>
         </div>
         <select className="px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-transparent dark:border-slate-700 outline-none text-sm font-bold text-slate-600 dark:text-slate-300 cursor-pointer transition-colors">
            <option>Tüm Kategoriler</option>
            <option>Zirkonyum</option>
            <option>İmplant Üstü</option>
            <option>Ortodonti</option>
         </select>
         <select className="px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-transparent dark:border-slate-700 outline-none text-sm font-bold text-slate-600 dark:text-slate-300 cursor-pointer transition-colors">
            <option>Şehir Seçin</option>
            <option>İstanbul</option>
            <option>Ankara</option>
            <option>İzmir</option>
         </select>
         <button className="px-6 py-3 bg-slate-900 dark:bg-slate-700 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 dark:hover:bg-slate-600 transition-all">
            Filtrele
         </button>
      </div>

      {/* Lab Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
           <div className="col-span-full py-20 text-center text-slate-500 dark:text-slate-400 font-bold">Laboratuvarlar yükleniyor...</div>
        ) : labs.filter(l => l.profile?.fullName?.toLowerCase().includes(searchTerm.toLowerCase())).map((lab) => (
          <div key={lab.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden group hover:shadow-xl dark:hover:shadow-blue-500/10 transition-all flex flex-col">
             <div className="h-32 bg-gradient-to-br from-blue-600 to-blue-400 p-6 relative">
                <div className="absolute -bottom-6 left-6 w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-4 border-white dark:border-slate-800 flex items-center justify-center font-black text-2xl text-blue-600 dark:text-blue-400 transition-colors">
                   {lab.profile?.fullName?.[0] || lab.email[0].toUpperCase()}
                </div>
                <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-white dark:border-slate-800">
                   ONLINE
                </div>
             </div>
             
             <div className="p-6 pt-10 flex-grow space-y-4">
                <div className="flex justify-between items-start">
                   <div>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{lab.profile?.fullName || lab.email}</h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">📍 {lab.profile?.address || "Lokasyon Belirtilmemiş"}</p>
                   </div>
                   <div className="text-right">
                      <div className="text-amber-500 font-bold text-sm">⭐ 4.9</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">Yeni</div>
                   </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                   {lab.profile?.specialties?.map((s, i) => (
                      <span key={i} className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold rounded-lg border border-slate-100 dark:border-slate-700 transition-colors">
                         {s}
                      </span>
                   )) || <span className="text-xs text-slate-400 dark:text-slate-500 italic">Uzmanlık belirtilmemiş</span>}
                </div>

                <div className="pt-4 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between transition-colors">
                   <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      HIZ: <span className="text-slate-900 dark:text-slate-300">Normal</span>
                   </div>
                   <div className="text-blue-600 font-black tracking-widest">
                      ₺₺
                   </div>
                </div>
             </div>

             <div className="p-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-3 transition-colors">
                <Link href={`/dashboard/explore/${lab.id}`} className="py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all text-center flex items-center justify-center">
                   Profili Gör
                </Link>
                <Link href={`/dashboard/orders/new?producerId=${lab.id}`} className="py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 text-center flex items-center justify-center">
                   İş Teklifi Gönder
                </Link>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
