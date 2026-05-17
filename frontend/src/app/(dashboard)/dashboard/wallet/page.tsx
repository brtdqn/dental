"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function WalletPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [balance, setBalance] = useState(12450);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([
    { id: 1, type: "OUT", amount: "₺4,500.00", title: "Zirkonyum Kaplama Ödemesi", date: "12 May 2026", status: "Tamamlandı" },
    { id: 2, type: "IN", amount: "₺15,000.00", title: "Bakiye Yükleme", date: "10 May 2026", status: "Tamamlandı" },
    { id: 3, type: "OUT", amount: "₺2,200.00", title: "Emax Kron Ödemesi", date: "08 May 2026", status: "Tamamlandı" },
  ]);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  const handleDeposit = () => {
    const val = parseFloat(amount);
    if (!val || val <= 0) return;
    setBalance(b => b + val);
    setTransactions(prev => [
      { id: Date.now(), type: "IN", amount: `₺${val.toLocaleString("tr-TR")}`, title: "Bakiye Yükleme", date: new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" }), status: "Tamamlandı" },
      ...prev,
    ]);
    setAmount("");
    setShowDeposit(false);
  };

  const handleWithdraw = () => {
    const val = parseFloat(amount);
    if (!val || val <= 0 || val > balance) return;
    setBalance(b => b - val);
    setTransactions(prev => [
      { id: Date.now(), type: "OUT", amount: `₺${val.toLocaleString("tr-TR")}`, title: "Para Çekme", date: new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" }), status: "Tamamlandı" },
      ...prev,
    ]);
    setAmount("");
    setShowWithdraw(false);
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in pb-20 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Cüzdan ve Finans</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Bakiyenizi yönetin ve ödemelerinizi takip edin.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Balance Card */}
        <div className="lg:col-span-1">
           <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-50" />
              <div className="relative z-10 space-y-8">
                 <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Toplam Bakiyeniz</div>
                    <div className="text-4xl font-black">₺{balance.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}</div>
                 </div>
                 
                 <div className="space-y-3">
                    <button
                      onClick={() => { setShowDeposit(true); setShowWithdraw(false); setAmount(""); }}
                      className="w-full bg-blue-600 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                    >
                       Para Yükle
                    </button>
                    <button
                      onClick={() => { setShowWithdraw(true); setShowDeposit(false); setAmount(""); }}
                      className="w-full bg-white/10 backdrop-blur-md py-4 rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/10"
                    >
                       Para Çek
                    </button>
                 </div>

                 {/* Deposit Mini Form */}
                 {showDeposit && (
                   <div className="bg-white/10 rounded-2xl p-4 space-y-3 animate-fade-in">
                     <p className="text-sm font-bold text-white">Yüklenecek Tutar (₺)</p>
                     <input
                       type="number"
                       value={amount}
                       onChange={e => setAmount(e.target.value)}
                       placeholder="0.00"
                       className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-blue-400"
                     />
                     <div className="flex gap-2">
                       <button onClick={handleDeposit} className="flex-1 bg-emerald-500 py-2 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all">Onayla</button>
                       <button onClick={() => setShowDeposit(false)} className="flex-1 bg-white/10 py-2 rounded-xl font-bold text-sm hover:bg-white/20 transition-all">İptal</button>
                     </div>
                   </div>
                 )}

                 {/* Withdraw Mini Form */}
                 {showWithdraw && (
                   <div className="bg-white/10 rounded-2xl p-4 space-y-3 animate-fade-in">
                     <p className="text-sm font-bold text-white">Çekilecek Tutar (₺)</p>
                     <input
                       type="number"
                       value={amount}
                       onChange={e => setAmount(e.target.value)}
                       placeholder="0.00"
                       max={balance}
                       className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-blue-400"
                     />
                     <div className="flex gap-2">
                       <button onClick={handleWithdraw} className="flex-1 bg-red-500 py-2 rounded-xl font-bold text-sm hover:bg-red-600 transition-all">Çek</button>
                       <button onClick={() => setShowWithdraw(false)} className="flex-1 bg-white/10 py-2 rounded-xl font-bold text-sm hover:bg-white/20 transition-all">İptal</button>
                     </div>
                   </div>
                 )}
              </div>
           </div>
        </div>

        {/* Transaction History */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
              <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white">Son İşlemler</h3>
                 <span className="text-sm font-bold text-slate-400">{transactions.length} işlem</span>
              </div>
              <div className="divide-y divide-slate-50 dark:divide-slate-800/50 max-h-96 overflow-y-auto">
                 {transactions.map((t) => (
                   <div key={t.id} className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <div className="flex items-center gap-4">
                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
                           t.type === "IN" ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600" : "bg-red-50 dark:bg-red-500/10 text-red-600"
                         }`}>
                            {t.type === "IN" ? "↓" : "↑"}
                         </div>
                         <div>
                            <div className="font-bold text-slate-900 dark:text-white">{t.title}</div>
                            <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">{t.date}</div>
                         </div>
                      </div>
                      <div className="text-right">
                         <div className={`text-lg font-black ${
                           t.type === "IN" ? "text-emerald-600" : "text-slate-900 dark:text-white"
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
           <div className="bg-blue-50/50 dark:bg-blue-500/5 rounded-[40px] p-8 border border-blue-100 dark:border-blue-500/20 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="text-3xl">📄</div>
                 <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Fatura ve Vergi Bilgileri</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Ay sonu toplu faturalarınızı buradan indirebilirsiniz.</p>
                 </div>
              </div>
              <button
                onClick={() => alert("Fatura indirme özelliği yakında aktif olacak.")}
                className="px-6 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm text-slate-700 dark:text-white"
              >
                 Düzenle
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
