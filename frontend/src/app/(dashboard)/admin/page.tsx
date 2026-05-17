"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Users, BarChart3, Megaphone, Shield, Trash2, Ban,
  CheckCircle, Search, Plus, X, TrendingUp, Package, DollarSign
} from "lucide-react";

const MOCK_USERS = [
  { id: "1", email: "dr.ayse@klinik.com", role: "CUSTOMER", status: "ACTIVE", createdAt: "12.01.2026", orders: 8, spent: "₺24,500" },
  { id: "2", email: "elitelab@dental.com", role: "PRODUCER", status: "ACTIVE", createdAt: "05.01.2026", orders: 47, spent: "₺0" },
  { id: "3", email: "dr.mehmet@dis.com", role: "CUSTOMER", status: "BANNED", createdAt: "20.02.2026", orders: 2, spent: "₺3,200" },
  { id: "4", email: "modernlab@ankara.com", role: "PRODUCER", status: "ACTIVE", createdAt: "14.03.2026", orders: 31, spent: "₺0" },
  { id: "5", email: "admin@dentalpazar.com", role: "ADMIN", status: "ACTIVE", createdAt: "01.01.2026", orders: 0, spent: "₺0" },
  { id: "6", email: "dr.selin@smile.com", role: "CUSTOMER", status: "ACTIVE", createdAt: "08.04.2026", orders: 5, spent: "₺18,700" },
];

const MOCK_ADS = [
  { id: "1", imageUrl: "https://placehold.co/400x200/f97316/white?text=Reklam+1", linkUrl: "https://example.com", position: "RIGHT_SIDEBAR", active: true },
];

const STAT_CARDS = [
  { label: "Toplam Kullanıcı", value: "3,247", change: "+12%", icon: <Users size={20} />, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
  { label: "Aktif Siparişler", value: "184", change: "+5%", icon: <Package size={20} />, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
  { label: "Aylık Ciro", value: "₺486K", change: "+23%", icon: <DollarSign size={20} />, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  { label: "Kayıtlı Lab", value: "1,240", change: "+8%", icon: <TrendingUp size={20} />, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
];

type Tab = "overview" | "users" | "ads";

export default function AdminPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [users, setUsers] = useState(MOCK_USERS);
  const [ads, setAds] = useState(MOCK_ADS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [adForm, setAdForm] = useState({ imageUrl: "", linkUrl: "", position: "RIGHT_SIDEBAR" });
  const [showAdForm, setShowAdForm] = useState(false);

  useEffect(() => {
    if (!user) { router.push("/login"); return; }
    // Demo mode: allow any logged-in user to preview admin panel
    // In production, uncomment: if (user.role !== "ADMIN") router.push("/dashboard");
  }, [user, router]);

  useEffect(() => {
    api.get("/ads").then(r => { if (r.data?.length) setAds(r.data); }).catch(() => {});
  }, []);

  if (!user) return null;

  const filteredUsers = users.filter(u => {
    const matchSearch = u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const banUser = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "BANNED" ? "ACTIVE" : "BANNED" } : u));
    toast.success("Kullanıcı durumu güncellendi.");
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    toast.success("Kullanıcı silindi.");
  };

  const addAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adForm.imageUrl || !adForm.linkUrl) { toast.error("Tüm alanları doldurun."); return; }
    const newAd = { id: Date.now().toString(), ...adForm, active: true };
    setAds(prev => [...prev, newAd]);
    api.post("/ads", adForm).catch(() => {});
    setAdForm({ imageUrl: "", linkUrl: "", position: "RIGHT_SIDEBAR" });
    setShowAdForm(false);
    toast.success("Reklam eklendi!");
  };

  const deleteAd = (id: string) => {
    setAds(prev => prev.filter(a => a.id !== id));
    api.delete(`/ads/${id}`).catch(() => {});
    toast.success("Reklam silindi.");
  };

  const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "overview", label: "Genel Bakış", icon: <BarChart3 size={16} /> },
    { key: "users",    label: "Kullanıcılar", icon: <Users size={16} /> },
    { key: "ads",      label: "Reklamlar",    icon: <Megaphone size={16} /> },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in pb-20">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/25">
          <Shield size={22} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Admin Paneli</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Sistem yönetimi ve içerik kontrolü</p>
        </div>
        <div className="ml-auto px-3 py-1.5 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-black rounded-lg border border-red-200 dark:border-red-500/20">
          ADMIN MODU
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white dark:bg-slate-900 rounded-2xl p-1.5 border border-slate-100 dark:border-slate-800 w-fit">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              tab === t.key ? "bg-orange-500 text-white shadow-md" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {tab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STAT_CARDS.map((s, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <div className={`w-10 h-10 ${s.bg} ${s.color} rounded-xl flex items-center justify-center`}>{s.icon}</div>
                  <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">{s.change}</span>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">{s.value}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Users Preview */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="p-5 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-black text-slate-900 dark:text-white">Son Kayıtlar</h3>
              <button onClick={() => setTab("users")} className="text-orange-500 text-sm font-bold hover:underline">Tümünü Gör →</button>
            </div>
            <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {MOCK_USERS.slice(0, 4).map(u => (
                <div key={u.id} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-sm font-black flex-shrink-0">
                    {u.email[0].toUpperCase()}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="font-bold text-slate-900 dark:text-white text-sm truncate">{u.email}</div>
                    <div className="text-xs text-slate-400">{u.createdAt}</div>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-full ${
                    u.role === "ADMIN" ? "bg-red-100 dark:bg-red-500/10 text-red-500" :
                    u.role === "PRODUCER" ? "bg-purple-100 dark:bg-purple-500/10 text-purple-500" :
                    "bg-blue-100 dark:bg-blue-500/10 text-blue-500"
                  }`}>{u.role}</span>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-full ${
                    u.status === "BANNED" ? "bg-red-100 dark:bg-red-500/10 text-red-500" : "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600"
                  }`}>{u.status === "BANNED" ? "BANLI" : "AKTİF"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── USERS ── */}
      {tab === "users" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
              <input type="text" placeholder="E-posta ile ara..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 transition-all" />
            </div>
            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-bold focus:outline-none focus:border-orange-500 transition-all">
              <option value="ALL">Tüm Roller</option>
              <option value="CUSTOMER">Hekim</option>
              <option value="PRODUCER">Laboratuvar</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 dark:border-slate-800">
                  {["Kullanıcı", "Rol", "Sipariş", "Harcama", "Durum", "Tarih", "İşlem"].map(h => (
                    <th key={h} className="px-5 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {filteredUsers.map(u => (
                  <tr key={u.id} className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors ${u.status === "BANNED" ? "opacity-60" : ""}`}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                          {u.email[0].toUpperCase()}
                        </div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[160px]">{u.email}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[10px] font-black px-2 py-1 rounded-full ${
                        u.role === "ADMIN" ? "bg-red-100 dark:bg-red-500/10 text-red-500" :
                        u.role === "PRODUCER" ? "bg-purple-100 dark:bg-purple-500/10 text-purple-500" :
                        "bg-blue-100 dark:bg-blue-500/10 text-blue-500"
                      }`}>{u.role === "CUSTOMER" ? "HEKİM" : u.role}</span>
                    </td>
                    <td className="px-5 py-3.5 text-sm font-bold text-slate-900 dark:text-white">{u.orders}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-300">{u.spent}</td>
                    <td className="px-5 py-3.5">
                      <span className={`flex items-center gap-1 w-fit text-[10px] font-black px-2 py-1 rounded-full ${
                        u.status === "BANNED" ? "bg-red-100 dark:bg-red-500/10 text-red-500" : "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600"
                      }`}>
                        {u.status === "BANNED" ? <Ban size={9} /> : <CheckCircle size={9} />}
                        {u.status === "BANNED" ? "BANLI" : "AKTİF"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-400">{u.createdAt}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1">
                        <button onClick={() => banUser(u.id)} title={u.status === "BANNED" ? "Banlı kaldır" : "Banla"}
                          className={`p-1.5 rounded-lg transition-all ${u.status === "BANNED" ? "text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10" : "text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10"}`}>
                          {u.status === "BANNED" ? <CheckCircle size={15} /> : <Ban size={15} />}
                        </button>
                        {u.role !== "ADMIN" && (
                          <button onClick={() => deleteUser(u.id)} title="Sil"
                            className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all">
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUsers.length === 0 && (
              <div className="py-12 text-center text-slate-400 text-sm">Kullanıcı bulunamadı.</div>
            )}
          </div>
          <div className="text-xs text-slate-400 dark:text-slate-500">{filteredUsers.length} kullanıcı listeleniyor</div>
        </div>
      )}

      {/* ── ADS ── */}
      {tab === "ads" && (
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="font-black text-lg text-slate-900 dark:text-white">Aktif Reklamlar</h2>
            <button onClick={() => setShowAdForm(!showAdForm)}
              className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-orange-600 transition-all">
              {showAdForm ? <><X size={14} /> Kapat</> : <><Plus size={14} /> Yeni Reklam</>}
            </button>
          </div>

          {showAdForm && (
            <form onSubmit={addAd} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-white">Yeni Reklam Ekle</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="text" placeholder="Görsel URL (https://...)" value={adForm.imageUrl} onChange={e => setAdForm({...adForm, imageUrl: e.target.value})}
                  className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 transition-all placeholder-slate-400" />
                <input required type="text" placeholder="Hedef Link (https://...)" value={adForm.linkUrl} onChange={e => setAdForm({...adForm, linkUrl: e.target.value})}
                  className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 transition-all placeholder-slate-400" />
                <select value={adForm.position} onChange={e => setAdForm({...adForm, position: e.target.value})}
                  className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 transition-all">
                  <option value="RIGHT_SIDEBAR">Sağ Sidebar</option>
                  <option value="LEFT_SIDEBAR">Sol Sidebar</option>
                  <option value="HERO">Hero Banner</option>
                </select>
                <button type="submit" className="bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-all">
                  Reklamı Ekle
                </button>
              </div>
            </form>
          )}

          {ads.length === 0 ? (
            <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="text-4xl mb-3">📢</div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Henüz aktif reklam bulunmuyor.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ads.map(ad => (
                <div key={ad.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden group">
                  <div className="h-40 bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ad.imageUrl} alt="Reklam" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={e => { (e.target as HTMLImageElement).src = "https://placehold.co/400x200/1e293b/94a3b8?text=Reklam+Görseli"; }} />
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full">{ad.position}</span>
                      <span className="text-[10px] font-black px-2 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full">AKTİF</span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{ad.linkUrl}</div>
                    <div className="flex gap-2">
                      <a href={ad.linkUrl} target="_blank" rel="noreferrer" className="flex-1 text-center text-xs font-bold py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                        Önizle
                      </a>
                      <button onClick={() => deleteAd(ad.id)} className="flex-1 text-xs font-bold py-2 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all border border-red-100 dark:border-red-500/20">
                        Sil
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
