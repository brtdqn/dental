"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User, Settings, Shield, Bell } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("general");

  const [notifPreferences, setNotifPreferences] = useState({
    orderUpdates: true,
    newBids: true,
    messages: true,
    marketing: false
  });

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto animate-fade-in pb-20">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Profil Ayarları</h1>
          <p className="text-slate-500 mt-1">Hesap bilgilerinizi ve tercihlerinizi yönetin.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 text-sm">
          Değişiklikleri Kaydet
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 space-y-2">
           {[
             { id: "general", label: "Genel Bilgiler", icon: "👤" },
             { id: "clinic", label: user?.role === "CUSTOMER" ? "Klinik Detayları" : "Laboratuvar Detayları", icon: "🏥" },
             { id: "portfolio", label: "Portfolyo", icon: "🎨", hidden: user?.role !== "PRODUCER" },
             { id: "security", label: "Güvenlik", icon: "🔒" },
             { id: "notifications", label: "Bildirim Tercihleri", icon: "🔔" },
           ].filter(t => !t.hidden).map((tab) => (
             <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? "bg-white text-blue-600 shadow-sm border border-slate-100" 
                    : "text-slate-500 hover:bg-slate-50"
                }`}
             >
                <span>{tab.icon}</span>
                {tab.label}
             </button>
           ))}
        </div>

        {/* Content Area */}
        <div className="flex-grow space-y-6">
            {activeTab === "general" && (
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
                 <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center text-3xl border-2 border-dashed border-slate-200 text-slate-400 cursor-pointer hover:bg-slate-50 transition-all">
                       +
                    </div>
                    <div>
                       <h3 className="font-bold text-slate-900">Profil Fotoğrafı</h3>
                       <p className="text-xs text-slate-400 mt-1">PNG veya JPG, max 5MB.</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-700 ml-1">Ad Soyad</label>
                       <input type="text" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-500/10 outline-none focus:border-blue-500 transition-all" placeholder="Berat Ç." />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-700 ml-1">E-posta</label>
                       <input type="email" disabled className="w-full px-4 py-3 rounded-2xl bg-slate-100 border border-slate-100 text-slate-400" value={user?.email || ""} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-700 ml-1">Telefon</label>
                       <input type="text" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-500/10 outline-none focus:border-blue-500 transition-all" placeholder="+90 5xx ..." />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-700 ml-1">Ülke/Şehir</label>
                       <input type="text" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-500/10 outline-none focus:border-blue-500 transition-all" placeholder="Türkiye, İstanbul" />
                    </div>
                 </div>
              </div>
            )}

            {activeTab === "clinic" && (
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-700 ml-1">Kurum Adı</label>
                       <input type="text" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-500/10 outline-none focus:border-blue-500 transition-all" placeholder="X Diş Kliniği" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-700 ml-1">Vergi Numarası / TCKN</label>
                       <input type="text" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-500/10 outline-none focus:border-blue-500 transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-700 ml-1">Adres</label>
                       <textarea rows={3} className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-500/10 outline-none focus:border-blue-500 transition-all" placeholder="Tam adres bilgisi..." />
                    </div>
                 </div>
              </div>
            )}

            {activeTab === "portfolio" && (
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
                 <h3 className="text-xl font-bold text-slate-900">Çalışma Portfolyonuz</h3>
                 <p className="text-sm text-slate-500">Kliniklerin sizi tercih etmesi için en iyi yaptığınız işlerin fotoğraflarını yükleyin.</p>
                 <div className="grid grid-cols-3 gap-6">
                    <div className="aspect-square bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100/50 transition-all">
                       <span className="text-3xl">+</span>
                       <span className="text-xs font-bold text-slate-400">Görsel Ekle</span>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-700 ml-1">Mevcut Şifre</label>
                       <input type="password" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">Yeni Şifre</label>
                          <input type="password" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">Şifre Tekrar</label>
                          <input type="password" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all" />
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
                 <h3 className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-4">Bildirim Tercihleri</h3>
                 <div className="space-y-6">
                    {[
                      { key: "orderUpdates", label: "Sipariş Güncellemeleri", desc: "Siparişin durum değişikliklerinde e-posta ve anlık bildirim al." },
                      { key: "newBids", label: "Yeni Teklifler", desc: "Laboratuvarlar teklif verdiğinde beni uyar." },
                      { key: "messages", label: "Yeni Mesajlar", desc: "Bir sohbetten yeni mesaj geldiğinde bildirim gönder." },
                    ].map((pref) => (
                      <div key={pref.key} className="flex justify-between items-center py-2">
                         <div>
                            <div className="font-bold text-slate-900 text-sm">{pref.label}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{pref.desc}</div>
                         </div>
                         <input 
                            type="checkbox" 
                            checked={(notifPreferences as any)[pref.key]}
                            onChange={(e) => setNotifPreferences({ ...notifPreferences, [pref.key]: e.target.checked })}
                            className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                         />
                      </div>
                    ))}
                 </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
