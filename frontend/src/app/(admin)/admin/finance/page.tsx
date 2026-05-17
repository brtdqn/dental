"use client";

export default function AdminFinancePage() {
  const payouts = [
    { id: "1", lab: "Elite Dental Studio", amount: "₺42,000", status: "Beklemede", date: "16.05.2026" },
    { id: "2", lab: "Modern Diş Lab", amount: "₺12,500", status: "Tamamlandı", date: "14.05.2026" },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Finansal Yönetim</h1>
        <div className="flex gap-2">
           <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-sm">Rapor İndir</button>
           <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm">Hesap Özeti</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Summary Cards */}
         <div className="bg-emerald-500 p-8 rounded-[40px] text-white space-y-2 relative overflow-hidden">
            <div className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Platform Toplam İşlem</div>
            <div className="text-3xl font-black">₺4,850,200</div>
            <div className="text-xs font-bold bg-white/20 w-fit px-2 py-1 rounded-lg">↑ %15 artış</div>
         </div>
         <div className="bg-blue-600 p-8 rounded-[40px] text-white space-y-2 relative overflow-hidden">
            <div className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Net Komisyon Geliri</div>
            <div className="text-3xl font-black">₺485,020</div>
            <div className="text-xs font-bold bg-white/20 w-fit px-2 py-1 rounded-lg">↑ %10 artış</div>
         </div>
         <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-2">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bekleyen Ödemeler</div>
            <div className="text-3xl font-black text-slate-900">₺128,400</div>
            <div className="text-xs font-bold text-amber-500">5 adet talep</div>
         </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
         <div className="p-8 border-b border-slate-100">
            <h3 className="text-xl font-bold text-slate-900">Para Çekme Talepleri (Payouts)</h3>
         </div>
         <div className="p-0">
            <table className="w-full text-left">
               <thead>
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                     <th className="px-8 py-5">Laboratuvar</th>
                     <th className="px-8 py-5">Tutar</th>
                     <th className="px-8 py-5">Tarih</th>
                     <th className="px-8 py-5">Durum</th>
                     <th className="px-8 py-5 text-right">İşlem</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {payouts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                       <td className="px-8 py-6 font-bold text-slate-900">{p.lab}</td>
                       <td className="px-8 py-6 font-black text-blue-600">{p.amount}</td>
                       <td className="px-8 py-6 text-sm text-slate-500">{p.date}</td>
                       <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                            p.status === "Tamamlandı" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                          }`}>
                            {p.status}
                          </span>
                       </td>
                       <td className="px-8 py-6 text-right">
                          <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-all">
                             Onayla ve Gönder
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="space-y-4">
            <h4 className="font-bold text-slate-900">Komisyon Ayarları</h4>
            <div className="flex gap-4">
               <div className="flex-grow p-4 bg-white rounded-2xl border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Standart Komisyon</div>
                  <div className="text-xl font-black">%10</div>
               </div>
               <div className="flex-grow p-4 bg-white rounded-2xl border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Hızlı Ödeme Farkı</div>
                  <div className="text-xl font-black">+%2</div>
               </div>
            </div>
         </div>
         <div className="flex items-center justify-end">
            <button className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
               Finansal Parametreleri Düzenle
            </button>
         </div>
      </div>
    </div>
  );
}
