"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const orderSummary = {
    title: "Zirkonyum Kaplama #4821",
    lab: "Elite Dental Studio",
    amount: 4500,
    commission: 450,
    total: 4950
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Ödeme Başarılı! Siparişiniz üretim aşamasına alındı.");
      router.push("/dashboard/orders/1");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900">Güvenli Ödeme</h1>
        <p className="text-slate-500 mt-1">Ödemeniz DIS güvencesiyle havuz sisteminde tutulur.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side: Card Form */}
        <div className="space-y-8">
           <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden aspect-[1.6/1] flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600 rounded-full blur-[100px] opacity-40" />
              <div className="flex justify-between items-start relative z-10">
                 <div className="text-xl font-bold italic tracking-tighter">DIS PLATINUM</div>
                 <div className="w-12 h-8 bg-white/20 rounded-lg backdrop-blur-md" />
              </div>
              <div className="space-y-4 relative z-10">
                 <div className="text-2xl font-mono tracking-[0.2em]">**** **** **** 4291</div>
                 <div className="flex gap-10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <div>
                       <div className="mb-1 opacity-50">Kart Sahibi</div>
                       <div>BERAT C.</div>
                    </div>
                    <div>
                       <div className="mb-1 opacity-50">Son Kullanma</div>
                       <div>12 / 28</div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="space-y-4">
              <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase ml-1">Kart Üzerindeki İsim</label>
                 <input type="text" className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:border-blue-500 transition-all font-bold" placeholder="AD SOYAD" />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase ml-1">Kart Numarası</label>
                 <input type="text" className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:border-blue-500 transition-all font-bold" placeholder="0000 0000 0000 0000" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">S.K.T.</label>
                    <input type="text" className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:border-blue-500 transition-all font-bold" placeholder="MM / YY" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">CVC</label>
                    <input type="text" className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:border-blue-500 transition-all font-bold" placeholder="000" />
                 </div>
              </div>
           </div>
        </div>

        {/* Right Side: Summary */}
        <div className="space-y-8">
           <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Sipariş Özeti</h3>
              <div className="space-y-4">
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">İş Bedeli ({orderSummary.lab})</span>
                    <span className="text-slate-900 font-bold">₺{orderSummary.amount.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">Platform Hizmet Bedeli</span>
                    <span className="text-slate-900 font-bold">₺{orderSummary.commission.toLocaleString()}</span>
                 </div>
                 <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                    <span className="text-lg font-bold text-slate-900">Toplam Tutar</span>
                    <span className="text-2xl font-black text-blue-600">₺{orderSummary.total.toLocaleString()}</span>
                 </div>
              </div>
           </div>

           <div className="bg-blue-50 p-6 rounded-[32px] border border-blue-100 space-y-4">
              <div className="flex gap-3">
                 <div className="text-xl">🛡️</div>
                 <div className="text-xs text-blue-800 leading-relaxed font-medium">
                    Ödemeniz, siz işi onaylayana kadar laboratuvara aktarılmaz. Memnun kalmazsanız iade hakkınız saklıdır.
                 </div>
              </div>
           </div>

           <button 
              onClick={handlePayment}
              disabled={loading}
              className="w-full py-5 bg-blue-600 text-white rounded-[24px] font-black text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/30 active:scale-95 disabled:opacity-50"
           >
              {loading ? "Ödeme İşleniyor..." : `₺${orderSummary.total.toLocaleString()} Öde`}
           </button>
           
           <div className="flex justify-center gap-6 opacity-30 grayscale mt-6">
              <span className="text-xs font-black">iyzico</span>
              <span className="text-xs font-black">VISA</span>
              <span className="text-xs font-black">Mastercard</span>
           </div>
        </div>
      </div>
    </div>
  );
}
