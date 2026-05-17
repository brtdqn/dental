"use client";

import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User, Shield, Bell, Building2, Camera, Star, Package, MessageSquare, Wallet, Check, LogOut } from "lucide-react";
import Link from "next/link";

const TABS = [
  { id: "general",       label: "Genel Bilgiler",    icon: User },
  { id: "clinic",        label: "Kurum Bilgileri",   icon: Building2 },
  { id: "security",      label: "Güvenlik",          icon: Shield },
  { id: "notifications", label: "Bildirimler",       icon: Bell },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${checked ? "bg-orange-500" : "bg-slate-200 dark:bg-slate-700"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${checked ? "translate-x-6" : "translate-x-0"}`} />
    </button>
  );
}

function InputField({ label, type = "text", value, onChange, disabled = false, placeholder = "" }: {
  label: string; type?: string; value: string; onChange?: (v: string) => void; disabled?: boolean; placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all disabled:bg-slate-50 dark:disabled:bg-slate-900 disabled:text-slate-400 disabled:cursor-not-allowed"
      />
    </div>
  );
}

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState("general");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const [general, setGeneral] = useState({ fullName: "", phone: "", city: "" });
  const [clinic, setClinic] = useState({ clinicName: "", taxId: "", address: "" });
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [notifs, setNotifs] = useState({ orderUpdates: true, newBids: true, messages: true, marketing: false });

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setSaved(true);
    toast.success("Değişiklikler kaydedildi!");
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePasswordSave = () => {
    if (!passwords.current) { toast.error("Mevcut şifrenizi girin."); return; }
    if (passwords.next.length < 6) { toast.error("Yeni şifre en az 6 karakter olmalı."); return; }
    if (passwords.next !== passwords.confirm) { toast.error("Şifreler eşleşmiyor."); return; }
    toast.success("Şifre güncellendi!");
    setPasswords({ current: "", next: "", confirm: "" });
  };

  const initials = user.email.split("@")[0].slice(0, 2).toUpperCase();

  return (
    <div className="max-w-5xl mx-auto animate-fade-in pb-20">

      {/* Profile Hero Card */}
      <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:to-slate-900 rounded-3xl p-8 mb-8 overflow-hidden shadow-2xl">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end gap-6">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-3xl font-black shadow-xl overflow-hidden">
              {avatarPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                initials
              )}
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Camera size={20} className="text-white" />
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </div>

          {/* Info */}
          <div className="text-center sm:text-left flex-grow">
            <h1 className="text-2xl font-black text-white">{general.fullName || user.email.split("@")[0]}</h1>
            <div className="text-slate-400 text-sm mt-1">{user.email}</div>
            <div className="flex items-center gap-3 mt-3 justify-center sm:justify-start flex-wrap">
              <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-bold rounded-full border border-orange-500/30">
                {user.role === "CUSTOMER" ? "👨‍⚕️ Hekim" : "🔬 Laboratuvar"}
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30 flex items-center gap-1">
                <Check size={10} /> Hesap Aktif
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-4 sm:gap-6">
            {[
              { icon: <Package size={18} />, val: "12", label: "Sipariş" },
              { icon: <Star size={18} />, val: "4.8", label: "Puan" },
              { icon: <MessageSquare size={18} />, val: "3", label: "Mesaj" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-orange-400 flex justify-center mb-1">{s.icon}</div>
                <div className="text-white font-black text-lg leading-none">{s.val}</div>
                <div className="text-slate-400 text-[10px] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="relative z-10 flex gap-3 mt-6 flex-wrap">
          <Link href="/dashboard/orders" className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-colors border border-white/10">
            <Package size={14} /> Siparişlerim
          </Link>
          <Link href="/dashboard/wallet" className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-colors border border-white/10">
            <Wallet size={14} /> Cüzdanım
          </Link>
          <button
            onClick={() => { logout(); router.push("/"); }}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold rounded-xl transition-colors border border-red-500/20 ml-auto"
          >
            <LogOut size={14} /> Çıkış Yap
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Tabs Sidebar */}
        <div className="w-full md:w-56 flex-shrink-0">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-2 space-y-1">
            {TABS.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab.id
                      ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow space-y-5">

          {/* ───── GENERAL ───── */}
          {activeTab === "general" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-6">
              <h2 className="font-black text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">Genel Bilgiler</h2>

              {/* Avatar Upload */}
              <div className="flex items-center gap-5 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xl font-black overflow-hidden flex-shrink-0">
                  {avatarPreview ? <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" /></> : initials}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Profil Fotoğrafı</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">PNG veya JPG, maks. 5MB</p>
                  <button onClick={() => fileRef.current?.click()} className="mt-2 text-xs font-bold text-orange-500 hover:underline">
                    Fotoğraf Değiştir
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Ad Soyad" value={general.fullName} onChange={v => setGeneral({ ...general, fullName: v })} placeholder="Dr. Berat Ç." />
                <InputField label="E-posta" value={user.email} disabled />
                <InputField label="Telefon" value={general.phone} onChange={v => setGeneral({ ...general, phone: v })} placeholder="+90 5xx xxx xx xx" />
                <InputField label="Şehir" value={general.city} onChange={v => setGeneral({ ...general, city: v })} placeholder="İstanbul" />
              </div>

              <div className="flex justify-end pt-2">
                <button onClick={handleSave} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${saved ? "bg-emerald-500 text-white" : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20"}`}>
                  {saved ? <><Check size={16} /> Kaydedildi!</> : "Kaydet"}
                </button>
              </div>
            </div>
          )}

          {/* ───── CLINIC ───── */}
          {activeTab === "clinic" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-6">
              <h2 className="font-black text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
                {user.role === "CUSTOMER" ? "Klinik Bilgileri" : "Laboratuvar Bilgileri"}
              </h2>
              <div className="space-y-4">
                <InputField label="Kurum Adı" value={clinic.clinicName} onChange={v => setClinic({ ...clinic, clinicName: v })} placeholder="Örnek Diş Kliniği" />
                <InputField label="Vergi No / TCKN" value={clinic.taxId} onChange={v => setClinic({ ...clinic, taxId: v })} placeholder="1234567890" />
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Adres</label>
                  <textarea
                    rows={3}
                    value={clinic.address}
                    onChange={e => setClinic({ ...clinic, address: e.target.value })}
                    placeholder="Tam adres bilginizi girin..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={handleSave} className="px-6 py-2.5 rounded-xl font-bold text-sm bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 transition-all">
                  Kaydet
                </button>
              </div>
            </div>
          )}

          {/* ───── SECURITY ───── */}
          {activeTab === "security" && (
            <div className="space-y-5">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-4">
                <h2 className="font-black text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">Şifre Değiştir</h2>
                <InputField label="Mevcut Şifre" type="password" value={passwords.current} onChange={v => setPasswords({ ...passwords, current: v })} placeholder="••••••••" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Yeni Şifre" type="password" value={passwords.next} onChange={v => setPasswords({ ...passwords, next: v })} placeholder="En az 6 karakter" />
                  <InputField label="Şifre Tekrar" type="password" value={passwords.confirm} onChange={v => setPasswords({ ...passwords, confirm: v })} placeholder="••••••••" />
                </div>
                <div className="flex justify-end pt-2">
                  <button onClick={handlePasswordSave} className="px-6 py-2.5 rounded-xl font-bold text-sm bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 transition-all">
                    Şifreyi Güncelle
                  </button>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-500/5 rounded-2xl border border-red-100 dark:border-red-500/20 p-6">
                <h3 className="font-bold text-red-600 dark:text-red-400 mb-1">Tehlikeli Bölge</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Hesabınızı kalıcı olarak silmek istiyorsanız aşağıdaki butona tıklayın. Bu işlem geri alınamaz.</p>
                <button onClick={() => toast.error("Hesap silme işlemi için destek ekibi ile iletişime geçin.")} className="px-5 py-2 rounded-xl border border-red-300 dark:border-red-500/40 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-100 dark:hover:bg-red-500/10 transition-colors">
                  Hesabı Sil
                </button>
              </div>
            </div>
          )}

          {/* ───── NOTIFICATIONS ───── */}
          {activeTab === "notifications" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-2">
              <h2 className="font-black text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">Bildirim Tercihleri</h2>
              {[
                { key: "orderUpdates", label: "Sipariş Güncellemeleri", desc: "Sipariş durumu değiştiğinde bildirim al." },
                { key: "newBids",      label: "Yeni Teklifler",          desc: "Laboratuvar teklif verdiğinde uyar." },
                { key: "messages",     label: "Yeni Mesajlar",           desc: "Okunmamış mesaj geldiğinde bildirim gönder." },
                { key: "marketing",    label: "Kampanya & Duyurular",    desc: "Özel fırsatlar ve platform haberleri." },
              ].map(pref => (
                <div key={pref.key} className="flex justify-between items-center py-4 border-b border-slate-50 dark:border-slate-800 last:border-0">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm">{pref.label}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{pref.desc}</div>
                  </div>
                  <Toggle
                    checked={(notifs as any)[pref.key]}
                    onChange={v => setNotifs({ ...notifs, [pref.key]: v })}
                  />
                </div>
              ))}
              <div className="flex justify-end pt-4">
                <button onClick={() => { toast.success("Bildirim tercihleri kaydedildi!"); }} className="px-6 py-2.5 rounded-xl font-bold text-sm bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 transition-all">
                  Tercihleri Kaydet
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
