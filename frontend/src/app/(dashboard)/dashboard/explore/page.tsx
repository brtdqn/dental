"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/api/axios";
import { Star, Filter, ChevronDown, Check, Search } from "lucide-react";

export default function ExplorePage() {
  const [labs, setLabs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSort, setSelectedSort] = useState("Önerilen Sıralama");
  
  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const { data } = await api.get("/profiles");
        setLabs(data.filter((p: any) => p.user?.role === "PRODUCER"));
      } catch (error) {
        console.error("Failed to fetch labs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLabs();
  }, []);

  const FILTERS = {
    categories: ["Zirkonyum", "Emax", "Porselen", "İmplant Üstü", "Lamine", "Gülüş Tasarımı"],
    deliveryTime: ["Aynı Gün", "1-2 Gün", "3-5 Gün"],
    rating: ["4 Yıldız ve Üzeri", "3 Yıldız ve Üzeri"],
    cities: ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"]
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 pb-20 animate-fade-in">
      
      {/* Left Sidebar (Filters) */}
      <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sticky top-24">
          <div className="flex items-center gap-2 font-black text-lg text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
            <Filter size={20} className="text-orange-500" />
            Filtreler
          </div>

          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">Uzmanlık Alanı</h3>
              <div className="space-y-2">
                {FILTERS.categories.map((cat, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 rounded border border-slate-300 dark:border-slate-700 group-hover:border-orange-500 transition-colors flex items-center justify-center">
                      {i === 0 && <Check size={14} className="text-orange-500" />}
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Delivery Time */}
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">Teslimat Süresi</h3>
              <div className="space-y-2">
                {FILTERS.deliveryTime.map((time, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 rounded border border-slate-300 dark:border-slate-700 group-hover:border-orange-500 transition-colors"></div>
                    <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{time}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* City */}
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">Şehir</h3>
              <div className="relative mb-3">
                 <input type="text" placeholder="Şehir ara..." className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-8 pr-3 py-2 outline-none focus:border-orange-500" />
                 <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto no-scrollbar">
                {FILTERS.cities.map((city, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 rounded border border-slate-300 dark:border-slate-700 group-hover:border-orange-500 transition-colors"></div>
                    <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{city}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <button className="w-full mt-8 bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">
            Filtrele
          </button>
        </div>
      </aside>

      {/* Main Content (Product Grid) */}
      <div className="flex-grow">
         
         <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-500 dark:text-slate-400">
               <span className="font-bold text-slate-900 dark:text-white">{labs.length || 12}</span> laboratuvar bulundu
            </div>
            <div className="flex items-center gap-2 text-sm">
               <span className="text-slate-500">Sırala:</span>
               <div className="relative group cursor-pointer">
                  <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg hover:border-orange-500 transition-colors">
                     {selectedSort} <ChevronDown size={14} />
                  </div>
               </div>
            </div>
         </div>

         {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
               {[1,2,3,4,5,6].map(i => (
                 <div key={i} className="bg-slate-100 dark:bg-slate-800 rounded-2xl h-80 animate-pulse"></div>
               ))}
            </div>
         ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
               {labs.length > 0 ? labs.map((lab) => (
                  <div key={lab.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 hover:shadow-xl transition-all group overflow-hidden flex flex-col">
                     <div className="h-48 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center text-7xl relative overflow-hidden">
                        <span className="group-hover:scale-110 transition-transform duration-500 relative z-10">{lab.fullName?.[0] || "🦷"}</span>
                        {/* Dummy badge */}
                        {Math.random() > 0.5 && (
                          <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md z-10">
                            KARGO BEDAVA
                          </div>
                        )}
                     </div>
                     <div className="p-5 flex flex-col flex-grow">
                        <Link href={`/dashboard/explore/${lab.id}`} className="font-bold text-slate-900 dark:text-white text-lg truncate hover:text-orange-500 transition-colors">
                           {lab.fullName || lab.user?.email}
                        </Link>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">{lab.clinicName || "Bağımsız Laboratuvar"}</p>
                        
                        <div className="flex items-center gap-2 mt-3">
                           <div className="flex items-center text-amber-500 text-sm font-bold">
                              <Star size={14} className="fill-amber-500 mr-1" />
                              {lab.rating || "5.0"}
                           </div>
                           <span className="text-xs text-slate-400">({Math.floor(Math.random() * 200) + 10} Değerlendirme)</span>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-end justify-between mt-auto">
                           <div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase">Tahmini Teslim</div>
                              <div className="text-sm font-bold text-slate-900 dark:text-white">2-3 İş Günü</div>
                           </div>
                           <Link href={`/dashboard/orders/new?producerId=${lab.id}`} className="bg-orange-500 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">
                              Teklif İste
                           </Link>
                        </div>
                     </div>
                  </div>
               )) : (
                  <div className="col-span-full py-20 text-center text-slate-500 dark:text-slate-400">
                     Laboratuvar bulunamadı.
                  </div>
               )}
            </div>
         )}
      </div>
    </div>
  );
}
