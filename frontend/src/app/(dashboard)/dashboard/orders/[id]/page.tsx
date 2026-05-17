"use client";

import STLViewer from "@/components/viewer/STLViewer";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

export default function OrderDetailPage() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const router = useRouter();
  const [productionStatus, setProductionStatus] = useState("Üretimde");

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  // Mock order data
  const order = {
    id,
    title: "Zirkonyum Kaplama #4821",
    status: "Üretimde",
    date: "12.05.2026",
    price: "₺4,500",
    description: "Alt çene sol 6 numara zirkonyum kaplama. Renk: A2. Dişeti formu doğal olmalı.",
    clinic: "Dr. Selin Kaya",
    files: [
      { name: "lower_jaw.stl", type: "STL" },
      { name: "scan_data.obj", type: "OBJ" }
    ],
    bids: [
      { id: "b1", producer: "Elite Dental Studio", amount: "₺4,200", delivery: "15.05.2026", rating: 4.8 },
      { id: "b2", producer: "Modern Diş Lab", amount: "₺4,500", delivery: "14.05.2026", rating: 4.9 },
    ]
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/orders" className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
          ⬅️
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 transition-colors">{order.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 transition-colors">{order.clinic} • {order.date}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* 3D Viewer Section */}
          <div className="bg-slate-900 dark:bg-black rounded-3xl overflow-hidden shadow-2xl relative aspect-[16/9] border border-slate-800 transition-colors">
             <STLViewer url="data:model/stl;base64,c29saWQgY3ViZSBmYWNldCBub3JtYWwgMCAwIDAKb3V0ZXIgbG9vcAp2ZXJ0ZXggMCAwIDAKdmVydGV4IDEgMCAwCnZlcnRleCAxIDEgMAplbmRsb29wCmVuZGZhY2V0CmZhY2V0IG5vcm1hbCAwIDAgMApvdXRlciBsb29wCnZlcnRleCAwIDAgMAp2ZXJ0ZXggMSAxIDAKdmVydGV4IDAgMSAwCmVuZGxvb3AKZW5kZmFjZXQKZW5kc29saWQgY3ViZQ==" />
             <div className="absolute top-6 left-6 flex gap-2">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-blue-500/20">
                   3D Canlı Önizleme
                </span>
             </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
             <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">İş Detayları</h3>
             <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{order.description}</p>
             
             <div className="pt-6 border-t border-slate-50 dark:border-slate-800/50">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">Yüklenen Dosyalar</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                   {order.files.map((file, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-500/30 transition-colors cursor-pointer group">
                         <div className="flex items-center gap-3">
                            <span className="text-2xl">📄</span>
                            <div>
                               <div className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">{file.name}</div>
                               <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">{file.type} DOSYASI</div>
                            </div>
                         </div>
                         <button onClick={() => toast.success("İndirme işlemi başlatıldı.")} className="text-blue-600 dark:text-blue-400 font-bold text-xs hover:underline">İndir</button>
                      </div>
                   ))}
                </div>
             </div>

             {/* Bids Section for Customers */}
             <div className="pt-6 border-t border-slate-50 dark:border-slate-800/50">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">Gelen Teklifler ({order.bids.length})</h3>
                <div className="space-y-4">
                   {order.bids.map((bid) => (
                      <div key={bid.id} className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-blue-200 dark:hover:border-blue-500/30 transition-all">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center font-bold text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700 shadow-sm">
                               {bid.producer[0]}
                            </div>
                            <div>
                               <div className="font-bold text-slate-900 dark:text-slate-100">{bid.producer}</div>
                               <div className="text-xs text-amber-500 font-bold">⭐ {bid.rating}</div>
                            </div>
                         </div>
                         <div className="flex flex-col items-center md:items-end">
                            <div className="text-xl font-black text-slate-900 dark:text-slate-100">{bid.amount}</div>
                            <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">Teslim: {bid.delivery}</div>
                         </div>
                         <div className="flex gap-2">
                            <Link href={`/dashboard/checkout/1`} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center">
                               Kabul Et
                            </Link>
                            <button onClick={() => toast.info("Mesajlaşma altyapısı yakında aktif olacak!")} className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                               💬
                            </button>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
           {/* Laboratory Production Control Panel */}
           {user?.role === "PRODUCER" && (
             <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl space-y-6">
                <h3 className="text-xl font-bold">Laboratuvar Paneli</h3>
                <div className="space-y-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Üretim Durumu</label>
                      <select 
                         value={productionStatus}
                         onChange={(e) => setProductionStatus(e.target.value)}
                         className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-blue-500 transition-all text-white"
                      >
                         <option value="ACCEPTED" className="text-slate-900">İş Kabul Edildi</option>
                         <option value="IN_PRODUCTION" className="text-slate-900">Üretime Alındı</option>
                         <option value="QUALITY_CONTROL" className="text-slate-900">Kalite Kontrol</option>
                         <option value="SHIPPED" className="text-slate-900">Kargoya Verildi</option>
                      </select>
                   </div>

                   {productionStatus === "SHIPPED" && (
                     <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kargo Takip No</label>
                        <input type="text" placeholder="Yurtiçi / Aras Takip No" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold outline-none text-white" />
                     </div>
                   )}

                   <button onClick={() => toast.success("Üretim durumu güncellendi!")} className="w-full py-4 bg-blue-600 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95 text-white">
                      Durumu Güncelle
                   </button>
                </div>
             </div>
           )}

           <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Sipariş Durumu</h3>
              <div className="space-y-4">
                 {[
                   { label: "Sipariş Oluşturuldu", date: "12 May, 10:20", done: true },
                   { label: "Teklif Kabul Edildi", date: "12 May, 14:45", done: true },
                   { label: "Üretime Alındı", date: "13 May, 09:15", done: true },
                   { label: "Kargoya Hazırlanıyor", date: "Bekleniyor", done: false },
                 ].map((step, i) => (
                   <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                         <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${step.done ? "bg-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"}`}>
                            {step.done ? "✓" : i + 1}
                         </div>
                         {i < 3 && <div className={`w-0.5 h-10 ${step.done ? "bg-emerald-500" : "bg-slate-100 dark:bg-slate-800"}`} />}
                      </div>
                      <div className="pt-0.5">
                         <div className={`text-sm font-bold ${step.done ? "text-slate-900 dark:text-slate-100" : "text-slate-400 dark:text-slate-500"}`}>{step.label}</div>
                         <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{step.date}</div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-blue-600 dark:bg-blue-700 p-8 rounded-3xl shadow-xl shadow-blue-500/20 text-white text-center transition-colors">
              <div className="text-3xl font-black mb-1">{order.price}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-6">TOPLAM İŞ BEDELİ</div>
              <button onClick={() => toast.info("Fatura PDF'i oluşturuluyor...")} className="w-full bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 py-3 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95">
                 Fatura İndir
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
