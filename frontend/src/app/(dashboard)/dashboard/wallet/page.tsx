"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { ArrowUpRight, ArrowDownLeft, TrendingUp, Shield, FileText, CreditCard, X, Plus, Minus } from "lucide-react";
import Link from "next/link";

const INITIAL_TXS = [
  { id: 1, type: "OUT", amount: 4500,   title: "Zirkonyum Kaplama Ödemesi",  date: "12 May 2026", status: "Tamamlandı", orderId: "1" },
  { id: 2, type: "IN",  amount: 15000,  title: "Bakiye Yükleme",             date: "10 May 2026", status: "Tamamlandı", orderId: null },
  { id: 3, type: "OUT", amount: 2200,   title: "Emax Kron Ödemesi",          date: "08 May 2026", status: "Tamamlandı", orderId: "2" },
  { id: 4, type: "IN",  amount: 5000,   title: "Bakiye Yükleme",             date: "01 May 2026", status: "Tamamlandı", orderId: null },
  { id: 5, type: "OUT", amount: 750,    title: "Platform komisyonu",         date: "01 May 2026", status: "Tamamlandı", orderId: null },
];

const QUICK_AMOUNTS = [500, 1000, 2500, 5000];

type ModalType = "deposit" | "withdraw" | null;

export default function WalletPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [balance, setBalance] = useState(12450);
  const [transactions, setTransactions] = useState(INITIAL_TXS);
  const [modal, setModal] = useState<ModalType>(null);
  const [amount, setAmount] = useState("");
  const [filter, setFilter] = useState<"ALL" | "IN" | "OUT">("ALL");
  const [processing, setProcessing] = useState(false);

  useEffect(() => { if (!user) router.push("/login"); }, [user, router]);
  if (!user) return null;

  const totalIn  = transactions.filter(t => t.type === "IN").reduce((s, t) => s + t.amount, 0);
  const totalOut = transactions.filter(t => t.type === "OUT").reduce((s, t) => s + t.amount, 0);

  const filtered = transactions.filter(t => filter === "ALL" || t.type === filter);

  const openModal = (type: ModalType) => { setModal(type); setAmount(""); };
  const closeModal = () => { setModal(null); setAmount(""); };

  const handleDeposit = () => {
    const val = parseFloat(amount);
    if (!val || val <= 0) { toast.error("Geçerli bir tutar girin."); return; }
    if (val < 100) { toast.error("Minimum yükleme tutarı ₺100'dür."); return; }
    setProcessing(true);
    setTimeout(() => {
      setBalance(b => b + val);
      setTransactions(prev => [{
        id: Date.now(), type: "IN", amount: val,
        title: "Bakiye Yükleme", date: new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" }),
        status: "Tamamlandı", orderId: null,
      }, ...prev]);
      setProcessing(false);
      closeModal();
      toast.success(`₺${val.toLocaleString("tr-TR")} bakiyenize eklendi!`);
    }, 1500);
  };

  const handleWithdraw = () => {
    const val = parseFloat(amount);
    if (!val || val <= 0) { toast.error("Geçerli bir tutar girin."); return; }
    if (val > balance) { toast.error("Yetersiz bakiye."); return; }
    if (val < 50) { toast.error("Minimum çekim tutarı ₺50'dir."); return; }
    setProcessing(true);
    setTimeout(() => {
      setBalance(b => b - val);
      setTransactions(prev => [{
        id: Date.now(), type: "OUT", amount: val,
        title: "Para Çekme", date: new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" }),
        status: "Tamamlandı", orderId: null,
      }, ...prev]);
      setProcessing(false);
      closeModal();
      toast.success(`₺${val.toLocaleString("tr-TR")} hesabınıza aktarıldı.`);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in pb-20 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Cüzdan</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Bakiyenizi yönetin ve ödemelerinizi takip edin.</p>
      </div>

      {/* Balance Hero Card */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 text-white overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Shield size={12} className="text-emerald-400" /> Emanet Güvenceli Bakiye
              </div>
              <div className="text-5xl font-black tracking-tight">
                ₺{balance.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
              </div>
              <div className="text-slate-400 text-sm mt-2">Hesap sahibi: <span className="text-white font-bold">{user.email.split("@")[0].toUpperCase()}</span></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => openModal("deposit")}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-bold transition-all hover:-translate-y-0.5 shadow-lg shadow-orange-500/25 text-sm">
                <Plus size={16} /> Para Yükle
              </button>
              <button onClick={() => openModal("withdraw")}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-3 rounded-xl font-bold transition-all text-sm">
                <Minus size={16} /> Para Çek
              </button>
            </div>
          </div>

          {/* Mini stats */}
          <div className="flex gap-6 mt-8 pt-6 border-t border-white/10">
            <div>
              <div className="text-xs text-slate-400 mb-1 flex items-center gap-1"><ArrowDownLeft size={11} className="text-emerald-400" /> Toplam Yükleme</div>
              <div className="font-black text-emerald-400">+₺{totalIn.toLocaleString("tr-TR")}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1 flex items-center gap-1"><ArrowUpRight size={11} className="text-red-400" /> Toplam Harcama</div>
              <div className="font-black text-red-400">-₺{totalOut.toLocaleString("tr-TR")}</div>
            </div>
            <div className="ml-auto">
              <div className="text-xs text-slate-400 mb-1 flex items-center gap-1"><TrendingUp size={11} className="text-blue-400" /> Bu Ay</div>
              <div className="font-black text-blue-400">{transactions.length} işlem</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Bekleyen Ödeme", value: "₺0", icon: "⏳", color: "text-amber-500" },
          { label: "Bu Ay Harcama", value: `₺${(2200+4500).toLocaleString("tr-TR")}`, icon: "💳", color: "text-blue-500" },
          { label: "Tamamlanan İş", value: "3", icon: "✅", color: "text-emerald-500" },
          { label: "Komisyon", value: "₺750", icon: "📊", color: "text-purple-500" },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Transactions */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center gap-4 flex-wrap">
          <h3 className="font-black text-slate-900 dark:text-white">İşlem Geçmişi</h3>
          <div className="flex gap-1">
            {(["ALL", "IN", "OUT"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filter === f ? "bg-orange-500 text-white" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}>
                {f === "ALL" ? "Tümü" : f === "IN" ? "Yüklemeler" : "Harcamalar"}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">İşlem bulunamadı.</div>
          ) : filtered.map(t => (
            <div key={t.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                t.type === "IN" ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500" : "bg-red-50 dark:bg-red-500/10 text-red-500"
              }`}>
                {t.type === "IN" ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-900 dark:text-white text-sm">{t.title}</div>
                <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-2">
                  <span>{t.date}</span>
                  {t.orderId && (
                    <Link href={`/dashboard/orders/${t.orderId}`} className="text-orange-500 hover:underline font-semibold">Sipariş #{t.orderId}</Link>
                  )}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className={`font-black text-base ${t.type === "IN" ? "text-emerald-500" : "text-slate-900 dark:text-white"}`}>
                  {t.type === "IN" ? "+" : "-"}₺{t.amount.toLocaleString("tr-TR")}
                </div>
                <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">{t.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoice banner */}
      <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 flex-shrink-0">
          <FileText size={18} />
        </div>
        <div className="flex-1">
          <div className="font-bold text-slate-900 dark:text-white text-sm">Fatura ve Vergi Bilgileri</div>
          <div className="text-xs text-slate-400 mt-0.5">Aylık faturalarınızı buradan indirebilirsiniz.</div>
        </div>
        <button onClick={() => toast.info("Fatura sistemi yakında aktif olacak.")}
          className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5">
          <CreditCard size={13} /> Fatura İndir
        </button>
      </div>

      {/* ── MODAL ── */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 w-full max-w-md shadow-2xl border border-slate-100 dark:border-slate-800 animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  {modal === "deposit" ? "Para Yükle" : "Para Çek"}
                </h2>
                <p className="text-slate-400 text-sm mt-0.5">
                  {modal === "deposit" ? "Minimum ₺100 yükleme yapabilirsiniz." : `Mevcut bakiye: ₺${balance.toLocaleString("tr-TR")}`}
                </p>
              </div>
              <button onClick={closeModal} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all">
                <X size={18} />
              </button>
            </div>

            {/* Quick amounts */}
            {modal === "deposit" && (
              <div className="grid grid-cols-4 gap-2 mb-4">
                {QUICK_AMOUNTS.map(q => (
                  <button key={q} onClick={() => setAmount(q.toString())}
                    className={`py-2 rounded-xl text-sm font-bold transition-all border ${
                      amount === q.toString()
                        ? "bg-orange-500 text-white border-orange-500"
                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-orange-400"
                    }`}>
                    ₺{q.toLocaleString("tr-TR")}
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-400 font-bold text-lg">₺</span>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
                  placeholder="0.00" min={modal === "deposit" ? 100 : 50} max={modal === "withdraw" ? balance : undefined}
                  className="w-full pl-9 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-lg font-black focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all placeholder-slate-300 dark:placeholder-slate-600" />
              </div>

              <button
                onClick={modal === "deposit" ? handleDeposit : handleWithdraw}
                disabled={processing || !amount}
                className={`w-full py-4 rounded-xl font-black text-white transition-all disabled:opacity-50 text-base flex items-center justify-center gap-2 ${
                  modal === "deposit"
                    ? "bg-orange-500 hover:bg-orange-600 shadow-xl shadow-orange-500/20"
                    : "bg-slate-900 dark:bg-slate-700 hover:bg-slate-800"
                }`}>
                {processing
                  ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> İşleniyor...</>
                  : modal === "deposit"
                    ? `₺${parseFloat(amount || "0").toLocaleString("tr-TR")} Yükle`
                    : `₺${parseFloat(amount || "0").toLocaleString("tr-TR")} Çek`
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
