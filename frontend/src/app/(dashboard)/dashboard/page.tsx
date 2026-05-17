"use client";

import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuthStore();

  const stats = [
    { title: "Aktif İşler", value: "12", bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100", icon: "📦" },
    { title: "Bekleyen Teklifler", value: "5", bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100", icon: "⏳" },
    { title: "Tamamlanan İşler", value: "148", bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100", icon: "✅" },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Genel Bakış</h1>
          <p className="text-slate-500 mt-1">Platformdaki aktivitelerinizin ve siparişlerinizin özeti.</p>
        </div>
        <div className="flex gap-3">
           <Link href="/dashboard/orders/new" className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 text-sm flex items-center gap-2">
              <span>+</span> Yeni İş Talebi
           </Link>
           <Link href="/dashboard/explore" className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-bold hover:bg-slate-50 transition-all text-sm">
              Laboratuvar Keşfet
           </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all group flex items-center justify-between`}>
            <div className="space-y-2">
               <div className="text-slate-400 font-bold text-xs uppercase tracking-widest">{stat.title}</div>
               <div className="text-4xl font-black text-slate-900 group-hover:scale-105 transition-all origin-left">{stat.value}</div>
            </div>
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.text} flex items-center justify-center text-2xl`}>
               {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900">Son Siparişler</h3>
            <Link href="/dashboard/orders" className="text-blue-600 text-sm font-bold hover:underline">Hepsini Gör</Link>
          </div>
          <div className="divide-y divide-slate-50">
            {[1, 2, 3].map((item) => (
              <div key={item} className="py-5 flex items-center justify-between hover:bg-slate-50/50 transition-all rounded-2xl px-4 -mx-4 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-xl text-blue-600">🦷</div>
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Zirkonyum Kaplama #482{item}</div>
                    <div className="text-xs text-slate-400 font-medium">Elite Dental Studio • 12 May 2026</div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                  Üretimde
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Mini Graph */}
        <div className="bg-slate-900 p-8 rounded-[40px] text-white flex flex-col justify-between shadow-2xl relative overflow-hidden aspect-square lg:aspect-auto">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600 rounded-full blur-[100px] opacity-40" />
          <div className="relative z-10 space-y-4">
             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aylık Harcama Grafiği</div>
             <div className="text-3xl font-black">₺12,450</div>
             <div className="text-xs text-emerald-400 font-bold">↑ Geçen aya göre %8 daha az maliyet</div>
          </div>
          
          {/* Custom Mini Bar Chart */}
          <div className="relative z-10 flex items-end justify-between h-32 pt-8">
             {[40, 60, 45, 80, 55, 95, 75].map((h, i) => (
               <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-4 bg-white/10 rounded-lg h-24 relative overflow-hidden group-hover:bg-white/20 transition-colors">
                     <div 
                        style={{ height: `${h}%` }} 
                        className="absolute bottom-0 left-0 w-full bg-blue-500 rounded-lg group-hover:bg-blue-400 transition-all duration-500" 
                     />
                  </div>
                  <span className="text-[9px] text-slate-500 font-bold">P{i+1}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
