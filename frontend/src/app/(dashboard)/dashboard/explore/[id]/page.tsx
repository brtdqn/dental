"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import STLViewer from "@/components/viewer/STLViewer";
import api from "@/lib/api/axios";

export default function LabProfilePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("portfolio");
  const [loading, setLoading] = useState(true);
  const [lab, setLab] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get(`/profiles/${id}`);
        setLab(data);
      } catch (error) {
        console.error("Failed to fetch lab profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 font-bold text-slate-500">Yükleniyor...</div>;
  }

  if (!lab) {
    return <div className="text-center py-20 font-bold text-red-500">Laboratuvar bulunamadı.</div>;
  }

  // Fallback defaults for missing stats/portfolio
  const stats = [
    { label: "Tamamlanan İş", value: "0" },
    { label: "Değerlendirme", value: lab.rating || "0" },
  ];
  
  const portfolio = [
    { id: 1, title: "Örnek Çalışma 1", img: "🦷", type: "IMAGE" },
  ];

  return (
    <div className="max-w-6xl mx-auto animate-fade-in pb-20">
      {/* Header Section */}
      <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden mb-8 transition-colors">
         <div className="h-48 bg-gradient-to-r from-blue-700 to-blue-500 relative">
            <div className="absolute -bottom-12 left-10 flex items-end gap-6">
               <div className="w-32 h-32 bg-white dark:bg-slate-800 rounded-[32px] shadow-xl border-8 border-white dark:border-slate-900 flex items-center justify-center text-5xl font-black text-blue-600 dark:text-blue-400 transition-colors">
                  {lab.fullName?.[0] || lab.user?.email?.[0]?.toUpperCase()}
               </div>
               <div className="pb-4">
                  <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100">{lab.fullName || lab.user?.email}</h1>
                  <p className="text-slate-500 dark:text-slate-300 font-medium">📍 {lab.address || "Lokasyon Belirtilmemiş"} • <span className="text-amber-500 font-bold">⭐ {lab.rating || 0}</span></p>
               </div>
            </div>
         </div>
         <div className="pt-20 px-10 pb-10 flex justify-between items-center">
            <div className="flex gap-8">
               {stats.map((s, i) => (
                 <div key={i}>
                    <div className="text-2xl font-black text-slate-900 dark:text-slate-100">{s.value}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{s.label}</div>
                 </div>
               ))}
            </div>
            <div className="flex gap-3">
               <Link href={`/dashboard/orders/new?producerId=${id}`} className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center">
                  İş Talebi Gönder
               </Link>
               <button className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-xl">
                  💬
               </button>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Left Side: About & Info */}
         <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
               <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Hakkımızda</h3>
               <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{lab.clinicName || "Bu laboratuvar henüz detaylı bir bilgi eklememiştir."}</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
               <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Uzmanlık Alanları</h3>
               <div className="flex flex-wrap gap-2">
                  {(lab.specialties?.length ? lab.specialties : ["Genel Diş Teknisyenliği"]).map((tag: string) => (
                    <span key={tag} className="px-4 py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-xl border border-blue-100 dark:border-blue-500/20">
                       {tag}
                    </span>
                  ))}
               </div>
            </div>
         </div>

         {/* Right Side: Portfolio & Reviews */}
         <div className="lg:col-span-2 space-y-8">
            <div className="flex gap-4 border-b border-slate-100 dark:border-slate-800 mb-6 transition-colors">
               {["portfolio", "reviews"].map((t) => (
                 <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`pb-4 px-2 text-sm font-bold transition-all relative ${
                      activeTab === t ? "text-blue-600" : "text-slate-400"
                    }`}
                 >
                    {t === "portfolio" ? "Portfolyo" : "Değerlendirmeler"}
                    {activeTab === t && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full" />}
                 </button>
               ))}
            </div>

            {activeTab === "portfolio" && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {portfolio.map((item) => (
                     <div key={item.id} className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden group hover:shadow-lg transition-all">
                        <div className="aspect-square bg-slate-100 dark:bg-slate-800/50 relative flex items-center justify-center text-6xl transition-colors">
                           {item.type === "3D" ? (
                             <div className="w-full h-full">
                                <STLViewer url="data:model/stl;base64,c29saWQgY3ViZSBmYWNldCBub3JtYWwgMCAwIDAKb3V0ZXIgbG9vcAp2ZXJ0ZXggMCAwIDAKdmVydGV4IDEgMCAwCnZlcnRleCAxIDEgMAplbmRsb29wCmVuZGZhY2V0CmZhY2V0IG5vcm1hbCAwIDAgMApvdXRlciBsb29wCnZlcnRleCAwIDAgMAp2ZXJ0ZXggMSAxIDAKdmVydGV4IDAgMSAwCmVuZGxvb3AKZW5kZmFjZXQKZW5kc29saWQgY3ViZQ==" />
                             </div>
                           ) : (
                             <span>{item.img}</span>
                           )}
                           <div className="absolute top-4 right-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-black text-slate-900 dark:text-slate-100 border border-white dark:border-slate-700">
                              {item.type}
                           </div>
                        </div>
                        <div className="p-6">
                           <h4 className="font-bold text-slate-900 dark:text-slate-100">{item.title}</h4>
                        </div>
                     </div>
                  ))}
               </div>
            )}

            {activeTab === "reviews" && (
               <div className="space-y-4">
                  {[1, 2].map((i) => (
                     <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-sm flex gap-4 transition-colors">
                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex-shrink-0" />
                        <div>
                           <div className="flex justify-between items-center mb-2">
                              <h5 className="font-bold text-slate-900 dark:text-slate-100">Dr. Mehmet Yılmaz</h5>
                              <span className="text-amber-500 font-bold text-sm">⭐ 5.0</span>
                           </div>
                           <p className="text-sm text-slate-500 dark:text-slate-400 italic">"İşçilik kalitesi ve iletişim hızı gerçekten çok başarılı. Özellikle estetik vakalarda çok güveniyorum."</p>
                           <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-2 uppercase tracking-widest">1 Ay Önce</div>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
    </div>
  );
}
