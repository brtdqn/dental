"use client";

import { useState } from "react";

export default function WalletPage() {
  const [balance, setBalance] = useState("12,450.00");

  const transactions = [
    { id: 1, type: "OUT", amount: "₺4,500.00", title: "Zirkonyum Kaplama Ödemesi", date: "12 May 2026", status: "Tamamlandı" },
    { id: 2, type: "IN", amount: "₺15,000.00", title: "Bakiye Yükleme", date: "10 May 2026", status: "Tamamlandı" },
    { id: 3, type: "OUT", amount: "₺2,200.00", title: "Emax Kron Ödemesi", date: "08 May 2026", status: "Tamamlandı" },
  ];

  return (
    <div className="max-w-6xl mx-auto animate-fade-in pb-20 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Cüzdan ve Finans</h1>
        <p className="text-slate-500 mt-1">Bakiyenizi yönetin ve ödemelerinizi takip edin.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Balance Card */}
        <div className="lg:col-span-1">
           <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-50" />
              <div className="relative z-10 space-y-8">
                 <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Toplam Bakiyeniz</div>
                    <div className="text-4xl font-black">₺{balance}</div>
                 </div>
                 
                 <div className="space-y-3">
                    <button className="w-full bg-blue-600 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                       Para Yükle
                    </button>
                    <button className="w-full bg-white/10 backdrop-blur-md py-4 rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/10">
                       Para Çek
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Transaction History */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                 <h3 className="text-xl font-bold text-slate-900">Son İşlemler</h3>
                 <button className="text-sm font-bold text-blue-600 hover:underline">Hepsini Gör</button>
              </div>
              <div className="divide-y divide-slate-50">
                 {transactions.map((t) => (
                   <div key={t.id} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
                           t.type === "IN" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                         }`}>
                            {t.type === "IN" ? "↓" : "↑"}
                         </div>
                         <div>
                            <div className="font-bold text-slate-900">{t.title}</div>
                            <div className="text-xs text-slate-400 font-medium">{t.date}</div>
                         </div>
                      </div>
                      <div className="text-right">
                         <div className={`text-lg font-black ${
                           t.type === "IN" ? "text-emerald-600" : "text-slate-900"
                         }`}>
                            {t.type === "IN" ? "+" : "-"}{t.amount}
                         </div>
                         <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
                            {t.status}
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Invoices area */}
           <div className="bg-blue-50/50 rounded-[40px] p-8 border border-blue-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="text-3xl">📄</div>
                 <div>
                    <h4 className="font-bold text-slate-900 text-sm">Fatura ve Vergi Bilgileri</h4>
                    <p className="text-xs text-slate-500">Ay sonu toplu faturalarınızı buradan indirebilirsiniz.</p>
                 </div>
              </div>
              <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all shadow-sm">
                 Düzenle
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
