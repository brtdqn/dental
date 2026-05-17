"use client";

import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { ArrowRight, Star, Clock, ShieldCheck, ChevronRight } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuthStore();

  const featuredLabs = [
    { id: 1, name: "Elite Dental Studio", rating: 4.9, reviews: 128, delivery: "3 Gün", tags: ["Zirkonyum", "Emax"], isPro: true, image: "🦷" },
    { id: 2, name: "Modern Diş Lab", rating: 4.8, reviews: 85, delivery: "2 Gün", tags: ["İmplant Üstü"], isPro: false, image: "✨" },
    { id: 3, name: "ProSmile Dijital", rating: 5.0, reviews: 42, delivery: "Hızlı", tags: ["Gülüş Tasarımı", "Lamine"], isPro: true, image: "👄" },
    { id: 4, name: "Anadolu Seramik", rating: 4.7, reviews: 210, delivery: "4 Gün", tags: ["Porselen", "İskelet"], isPro: false, image: "🔧" },
  ];

  return (
    <div className="space-y-12 pb-20 animate-fade-in">
      
      {/* Hero Banner Slider */}
      <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 dark:from-black dark:to-slate-900 h-[300px] md:h-[400px] flex items-center shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/20 to-transparent mix-blend-overlay"></div>
        <div className="absolute -right-20 -bottom-20 text-[300px] opacity-5 select-none pointer-events-none">🦷</div>
        
        <div className="relative z-10 px-8 md:px-16 max-w-2xl text-white space-y-6">
           <div className="inline-block px-4 py-1.5 bg-orange-500/20 border border-orange-500/30 text-orange-400 font-bold text-xs rounded-full uppercase tracking-widest backdrop-blur-sm">
             🔥 HAFTANIN FIRSATI
           </div>
           <h1 className="text-4xl md:text-5xl font-black leading-tight">
             Elite Lab'da Tüm Zirkonyum İşlerinde <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">%20 İndirim</span>
           </h1>
           <p className="text-slate-300 text-lg">Bu hafta sonuna kadar vereceğiniz tüm siparişlerde geçerlidir. Hemen teklif alın, fırsatı kaçırmayın.</p>
           <div className="flex gap-4 pt-2">
             <Link href="/dashboard/explore/1" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/30 hover:-translate-y-1">
               Hemen İncele
             </Link>
             <Link href="/dashboard/explore" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-3.5 rounded-xl font-bold transition-all border border-white/10">
               Tüm Kampanyalar
             </Link>
           </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-y border-slate-100 dark:border-slate-800 py-8">
         <div className="flex items-center gap-3 justify-center text-center md:text-left">
           <ShieldCheck className="text-orange-500 w-10 h-10 flex-shrink-0 hidden md:block" />
           <div>
             <div className="font-bold text-slate-900 dark:text-white">Güvenli Ödeme</div>
             <div className="text-xs text-slate-500">İş teslimine kadar paranız güvende</div>
           </div>
         </div>
         <div className="flex items-center gap-3 justify-center text-center md:text-left">
           <Clock className="text-orange-500 w-10 h-10 flex-shrink-0 hidden md:block" />
           <div>
             <div className="font-bold text-slate-900 dark:text-white">Zamanında Teslimat</div>
             <div className="text-xs text-slate-500">Geciken işlerde iade garantisi</div>
           </div>
         </div>
         <div className="flex items-center gap-3 justify-center text-center md:text-left">
           <Star className="text-orange-500 w-10 h-10 flex-shrink-0 hidden md:block" />
           <div>
             <div className="font-bold text-slate-900 dark:text-white">Onaylı Laboratuvarlar</div>
             <div className="text-xs text-slate-500">Sadece sertifikalı teknisyenler</div>
           </div>
         </div>
         <div className="flex items-center gap-3 justify-center text-center md:text-left">
           <div className="text-orange-500 w-10 h-10 flex-shrink-0 hidden md:flex items-center justify-center font-black text-2xl">7/24</div>
           <div>
             <div className="font-bold text-slate-900 dark:text-white">Canlı Destek</div>
             <div className="text-xs text-slate-500">Platform üzerinden anında çözüm</div>
           </div>
         </div>
      </div>

      {/* Recommended Section (Horizontal Scroll) */}
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              Size Özel Önerilenler <span className="text-orange-500">★</span>
            </h2>
            <p className="text-slate-500 mt-1">Geçmiş siparişlerinize göre sizin için seçtiğimiz laboratuvarlar.</p>
          </div>
          <Link href="/dashboard/explore" className="text-orange-500 font-bold hover:underline flex items-center gap-1 text-sm">
            Tümünü Gör <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredLabs.map((lab) => (
            <div key={lab.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-orange-500/30 transition-all group overflow-hidden flex flex-col relative">
              {lab.isPro && (
                <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-black px-2 py-1 rounded-md z-10 shadow-lg">
                  PRO
                </div>
              )}
              <div className="h-40 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center text-6xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <span className="group-hover:scale-110 transition-transform duration-500 relative z-10">{lab.image}</span>
              </div>
              <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg truncate group-hover:text-orange-500 transition-colors">{lab.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center text-amber-500 text-sm font-bold">
                      <Star size={14} className="fill-amber-500 mr-1" />
                      {lab.rating}
                    </div>
                    <span className="text-xs text-slate-400">({lab.reviews})</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {lab.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
                   <div className="text-xs font-bold text-slate-500">
                     Teslimat: <span className="text-slate-900 dark:text-white">{lab.delivery}</span>
                   </div>
                   <Link href={`/dashboard/orders/new?producerId=${lab.id}`} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-xl text-xs font-bold hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-colors">
                     İş Gönder
                   </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access / Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
         <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-blue-500/20 transition-all">
            <div className="relative z-10">
               <h3 className="text-2xl font-black mb-2">3D Modellerinizi Yükleyin</h3>
               <p className="text-blue-100 mb-6 max-w-xs">STL dosyalarınızı anında yükleyip yüzlerce laboratuvardan otomatik teklif alın.</p>
               <div className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold group-hover:bg-blue-50 transition-colors">
                 Hızlı Fiyat Al <ChevronRight size={18} />
               </div>
            </div>
            <div className="absolute -right-10 -bottom-10 text-[150px] opacity-20 group-hover:scale-110 transition-transform duration-500">📤</div>
         </div>
         
         <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white relative overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-emerald-500/20 transition-all">
            <div className="relative z-10">
               <h3 className="text-2xl font-black mb-2">Acil İşleriniz Mi Var?</h3>
               <p className="text-emerald-100 mb-6 max-w-xs">24 saat içinde teslimat yapabilen seçkin laboratuvarları keşfedin.</p>
               <div className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-xl font-bold group-hover:bg-emerald-50 transition-colors">
                 Acil Laboratuvarlar <ChevronRight size={18} />
               </div>
            </div>
            <div className="absolute -right-10 -bottom-10 text-[150px] opacity-20 group-hover:scale-110 transition-transform duration-500">⚡</div>
         </div>
      </div>
      
    </div>
  );
}
