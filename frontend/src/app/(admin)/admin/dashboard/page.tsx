"use client";

import Link from "next/link";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Toplam Hacim", value: "₺1.2M", change: "+12%", color: "text-emerald-500" },
    { label: "Net Komisyon", value: "₺124,000", change: "+8%", color: "text-blue-500" },
    { label: "Aktif Siparişler", value: "482", change: "+24%", color: "text-amber-500" },
    { label: "Bekleyen Onaylar", value: "12", change: "Acil", color: "text-red-500" },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Sistem Genel Bakış</h1>
        <div className="text-sm font-bold text-slate-400">Son Güncelleme: 2 dakika önce</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-2">
             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</div>
             <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
             <div className="text-xs font-bold text-slate-400">{s.change} geçen aya göre</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
               <h3 className="text-xl font-bold text-slate-900">Bekleyen Laboratuvar Onayları</h3>
               <button className="text-sm font-bold text-blue-600">Hepsini Gör</button>
            </div>
            <div className="p-8">
               <table className="w-full text-left">
                  <thead>
                     <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-4">
                        <th className="pb-4">Laboratuvar Adı</th>
                        <th className="pb-4">Başvuru Tarihi</th>
                        <th className="pb-4">Durum</th>
                        <th className="pb-4 text-right">Aksiyon</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {[
                       { name: "Efes Dental Lab", date: "14.05.2026", status: "İnceleniyor" },
                       { name: "Zirve Diş Protez", date: "15.05.2026", status: "Yeni" },
                     ].map((lab, i) => (
                       <tr key={i} className="group">
                          <td className="py-6 font-bold text-slate-900">{lab.name}</td>
                          <td className="py-6 text-sm text-slate-500">{lab.date}</td>
                          <td className="py-6">
                             <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold uppercase">{lab.status}</span>
                          </td>
                          <td className="py-6 text-right">
                             <Link href={`/admin/approvals/1`} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all inline-block">
                                İncele
                             </Link>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         <div className="bg-slate-900 rounded-[40px] p-8 text-white space-y-6">
            <h3 className="text-xl font-bold">Hızlı Ayarlar</h3>
            <div className="space-y-4">
               <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Platform Komisyonu</div>
                  <div className="text-2xl font-black">%10.0</div>
               </div>
               <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Günlük İşlem Limiti</div>
                  <div className="text-2xl font-black">₺500k</div>
               </div>
            </div>
            <button className="w-full py-4 bg-blue-600 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
               Ayarları Güncelle
            </button>
         </div>
      </div>
    </div>
  );
}
