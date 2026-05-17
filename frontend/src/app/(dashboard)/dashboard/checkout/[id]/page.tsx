"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, CreditCard, Lock, Check } from "lucide-react";

export default function CheckoutPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const [step, setStep] = useState<"form" | "processing" | "done">("form");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [useWallet, setUseWallet] = useState(false);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  const order = {
    id,
    title: "Zirkonyum Kaplama #4821",
    lab: "Elite Dental Studio",
    amount: 4500,
    commission: 225,
    total: 4725,
  };

  const formatCardNumber = (val: string) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 4);
    return clean.length > 2 ? `${clean.slice(0, 2)} / ${clean.slice(2)}` : clean;
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!useWallet) {
      if (!cardName.trim()) { toast.error("Kart üzerindeki ismi girin."); return; }
      if (cardNumber.replace(/\s/g, "").length < 16) { toast.error("Geçerli bir kart numarası girin."); return; }
      if (expiry.replace(/\D/g, "").length < 4) { toast.error("Son kullanma tarihini girin."); return; }
      if (cvc.length < 3) { toast.error("CVC kodunu girin."); return; }
    }
    setStep("processing");
    setTimeout(() => setStep("done"), 2500);
  };

  if (step === "processing") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-bold text-slate-700 dark:text-slate-300 text-lg">Ödeme işleniyor...</p>
          <p className="text-slate-400 text-sm">Lütfen sayfayı kapatmayın.</p>
        </div>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30 animate-bounce">
            <Check size={44} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Ödeme Başarılı!</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            <strong>₺{order.total.toLocaleString("tr-TR")}</strong> tutarındaki ödemeniz alındı.
            Laboratuvar en kısa sürede üretim sürecini başlatacak.
          </p>
          <div className="bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl p-5 border border-emerald-100 dark:border-emerald-500/20 text-left space-y-2">
            <div className="flex justify-between text-sm"><span className="text-slate-500 dark:text-slate-400">Sipariş</span><span className="font-bold text-slate-900 dark:text-white">{order.title}</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-500 dark:text-slate-400">Laboratuvar</span><span className="font-bold text-slate-900 dark:text-white">{order.lab}</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-500 dark:text-slate-400">Ödenen</span><span className="font-bold text-emerald-600">₺{order.total.toLocaleString("tr-TR")}</span></div>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/orders/1" className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-all text-sm text-center">
              Siparişi Takip Et
            </Link>
            <Link href="/dashboard" className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-3 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-sm text-center">
              Ana Sayfa
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const maskedCard = cardNumber
    ? cardNumber.replace(/\d(?=.{4})/g, "*")
    : "**** **** **** ****";

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/dashboard/orders/1`} className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
          <ArrowLeft size={18} className="text-slate-600 dark:text-slate-300" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Güvenli Ödeme</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Ödemeniz iş teslim edilene kadar güvende tutulur.</p>
        </div>
        <div className="ml-auto flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-bold">
          <Lock size={14} />
          SSL Güvenli
        </div>
      </div>

      <form onSubmit={handlePay}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Payment Form */}
          <div className="lg:col-span-3 space-y-6">

            {/* Wallet Option */}
            <div
              onClick={() => setUseWallet(!useWallet)}
              className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${useWallet ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-orange-300"}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${useWallet ? "bg-orange-500" : "bg-slate-100 dark:bg-slate-800"}`}>
                👛
              </div>
              <div className="flex-grow">
                <div className="font-bold text-slate-900 dark:text-white text-sm">Cüzdan ile Öde</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Bakiye: ₺12,450.00</div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${useWallet ? "border-orange-500 bg-orange-500" : "border-slate-300 dark:border-slate-600"}`}>
                {useWallet && <Check size={12} className="text-white" />}
              </div>
            </div>

            {!useWallet && (
              <>
                {/* Card Preview */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white relative overflow-hidden aspect-[1.75/1] flex flex-col justify-between shadow-2xl">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
                  <div className="relative flex justify-between items-start">
                    <div className="font-black text-lg tracking-tight">dental<span className="text-orange-400">pazar</span></div>
                    <CreditCard size={28} className="text-white/40" />
                  </div>
                  <div className="relative space-y-3">
                    <div className="font-mono text-xl tracking-[0.18em] text-white/90">{maskedCard}</div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-[9px] text-white/40 uppercase tracking-widest">Kart Sahibi</div>
                        <div className="font-bold text-sm uppercase">{cardName || "AD SOYAD"}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-white/40 uppercase tracking-widest">Son Kullanma</div>
                        <div className="font-bold text-sm">{expiry || "MM / YY"}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Form */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
                  <h3 className="font-black text-slate-900 dark:text-white text-sm flex items-center gap-2">
                    <CreditCard size={16} className="text-orange-500" /> Kart Bilgileri
                  </h3>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Kart Üzerindeki İsim</label>
                    <input value={cardName} onChange={e => setCardName(e.target.value.toUpperCase())} placeholder="AD SOYAD"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Kart Numarası</label>
                    <input value={cardNumber} onChange={e => setCardNumber(formatCardNumber(e.target.value))} placeholder="0000 0000 0000 0000" maxLength={19}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold tracking-widest placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Son Kullanma</label>
                      <input value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))} placeholder="MM / YY" maxLength={7}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">CVC / CVV</label>
                      <input value={cvc} onChange={e => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))} placeholder="•••" maxLength={3} type="password"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-4 sticky top-24">
              <h3 className="font-black text-slate-900 dark:text-white text-base">Sipariş Özeti</h3>

              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-1">
                <div className="font-bold text-slate-900 dark:text-white text-sm">{order.title}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{order.lab}</div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">İş Bedeli</span>
                  <span className="font-bold text-slate-900 dark:text-white">₺{order.amount.toLocaleString("tr-TR")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Platform komisyonu (%5)</span>
                  <span className="font-bold text-slate-900 dark:text-white">₺{order.commission.toLocaleString("tr-TR")}</span>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex justify-between items-center">
                  <span className="font-black text-slate-900 dark:text-white">Toplam</span>
                  <span className="text-2xl font-black text-orange-500">₺{order.total.toLocaleString("tr-TR")}</span>
                </div>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-500/10 rounded-xl p-4 flex gap-3 border border-emerald-100 dark:border-emerald-500/20">
                <ShieldCheck size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Ödemeniz iş tamamlanana kadar emanet hesapta tutulur. Onaylamadıkça laboratuvara ödeme yapılmaz.
                </p>
              </div>

              <button type="submit"
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-black text-base transition-all shadow-xl shadow-orange-500/25 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
              >
                <Lock size={16} />
                {useWallet ? `Cüzdandan Öde — ₺${order.total.toLocaleString("tr-TR")}` : `Güvenli Öde — ₺${order.total.toLocaleString("tr-TR")}`}
              </button>

              <div className="flex justify-center gap-6 pt-1">
                {["iyzico", "VISA", "Mastercard", "Troy"].map(b => (
                  <span key={b} className="text-[10px] font-black text-slate-300 dark:text-slate-600">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
