"use client";

import { useState } from "react";
import { useSiteConfigStore, type CategoryConfig } from "@/store/useSiteConfigStore";
import { toast } from "sonner";
import { Plus, Trash2, ChevronUp, ChevronDown, Save, RotateCcw } from "lucide-react";

type Tab = "categories" | "commissions" | "brand" | "homepage" | "footer";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "categories",  label: "Kategoriler",  icon: "🏷️" },
  { id: "commissions", label: "Komisyonlar",  icon: "💰" },
  { id: "brand",       label: "Marka & Logo", icon: "🎨" },
  { id: "homepage",    label: "Ana Sayfa",    icon: "🌐" },
  { id: "footer",      label: "Footer",       icon: "📄" },
];

function InputField({ label, value, onChange, type = "text", placeholder = "" }: {
  label: string; value: string | number; onChange: (v: string) => void;
  type?: string; placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all" />
    </div>
  );
}

function TextAreaField({ label, value, onChange, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{label}</label>
      <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all resize-none" />
    </div>
  );
}

export default function AdminSettingsPage() {
  const { config, updateConfig, updateCategory, addCategory, removeCategory, reorderCategory, resetConfig } = useSiteConfigStore();
  const [activeTab, setActiveTab] = useState<Tab>("categories");
  const [newCat, setNewCat] = useState({ name: "", icon: "⭐", color: "#6366f1", commission: 10, active: true });
  const [editingStats, setEditingStats] = useState(config.heroStats);

  const save = (message = "Değişiklikler kaydedildi.") => toast.success(message);

  const sortedCats = [...config.categories].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in pb-20">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Site Ayarları</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Platform içeriğini ve görünümünü yönetin.</p>
        </div>
        <button onClick={() => { resetConfig(); toast.success("Varsayılan ayarlara döndürüldü."); }}
          className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
          <RotateCcw size={14} /> Varsayılana Sıfırla
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white dark:bg-slate-900 p-1 rounded-2xl border border-slate-100 dark:border-slate-800 flex-wrap">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex-1 justify-center ${
              activeTab === t.id
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}>
            {t.icon} <span className="hidden sm:block">{t.label}</span>
          </button>
        ))}
      </div>

      {/* ── Tab: Kategoriler ── */}
      {activeTab === "categories" && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-black text-slate-900 dark:text-white">Mevcut Kategoriler</h3>
              <span className="text-xs text-slate-400">{sortedCats.filter(c=>c.active).length} aktif / {sortedCats.length} toplam</span>
            </div>
            <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {sortedCats.map((cat) => (
                <div key={cat.id} className="flex items-center gap-4 px-4 py-3">
                  {/* Icon + Color */}
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: cat.color + "22", color: cat.color }}>
                    {cat.icon}
                  </div>
                  {/* Name */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input value={cat.name} onChange={e => updateCategory(cat.id, { name: e.target.value })}
                      className="px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold focus:outline-none focus:border-orange-500 transition-all" />
                    <div className="flex items-center gap-2">
                      <input value={cat.icon} onChange={e => updateCategory(cat.id, { icon: e.target.value })}
                        className="w-16 px-2 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-center text-lg focus:outline-none focus:border-orange-500 transition-all" placeholder="🦷" />
                      <input type="color" value={cat.color} onChange={e => updateCategory(cat.id, { color: e.target.value })}
                        className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer bg-transparent" title="Renk seç" />
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="number" value={cat.commission} min={0} max={50}
                        onChange={e => updateCategory(cat.id, { commission: parseFloat(e.target.value) })}
                        className="w-20 px-2 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm text-center focus:outline-none focus:border-orange-500 transition-all" />
                      <span className="text-xs text-slate-400 font-bold">%kom.</span>
                    </div>
                  </div>
                  {/* Controls */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => updateCategory(cat.id, { active: !cat.active })}
                      className={`w-10 h-6 rounded-full transition-all relative ${cat.active ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"}`}>
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${cat.active ? "left-4" : "left-0.5"}`} />
                    </button>
                    <button onClick={() => reorderCategory(cat.id, "up")} className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"><ChevronUp size={14} /></button>
                    <button onClick={() => reorderCategory(cat.id, "down")} className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"><ChevronDown size={14} /></button>
                    <button onClick={() => { removeCategory(cat.id); toast.success("Kategori silindi."); }}
                      className="p-1 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Category */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5">
            <h4 className="font-black text-slate-900 dark:text-white mb-4 text-sm">Yeni Kategori Ekle</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
              <input value={newCat.name} onChange={e => setNewCat(p => ({...p, name: e.target.value}))} placeholder="Kategori adı"
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 transition-all col-span-2 sm:col-span-1" />
              <input value={newCat.icon} onChange={e => setNewCat(p => ({...p, icon: e.target.value}))} placeholder="⭐"
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-center text-lg focus:outline-none focus:border-orange-500 transition-all" />
              <input type="color" value={newCat.color} onChange={e => setNewCat(p => ({...p, color: e.target.value}))}
                className="h-10 w-full rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer bg-transparent" />
              <input type="number" value={newCat.commission} min={0} max={50} onChange={e => setNewCat(p => ({...p, commission: +e.target.value}))}
                placeholder="10" className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm text-center focus:outline-none focus:border-orange-500 transition-all" />
            </div>
            <button onClick={() => {
              if (!newCat.name) { toast.error("Kategori adı gerekli."); return; }
              addCategory({ ...newCat, order: config.categories.length + 1 });
              setNewCat({ name: "", icon: "⭐", color: "#6366f1", commission: 10, active: true });
              save("Kategori eklendi.");
            }} className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-orange-500/20">
              <Plus size={16} /> Ekle
            </button>
          </div>

          <div className="flex justify-end">
            <button onClick={() => save()} className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black transition-all shadow-lg shadow-emerald-500/20">
              <Save size={16} /> Değişiklikleri Kaydet
            </button>
          </div>
        </div>
      )}

      {/* ── Tab: Komisyonlar ── */}
      {activeTab === "commissions" && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-6">
            <h3 className="font-black text-slate-900 dark:text-white">Platform Komisyon Ayarları</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InputField label="Varsayılan Komisyon (%)" value={config.defaultCommission}
                onChange={v => updateConfig({ defaultCommission: parseFloat(v) || 0 })} type="number" />
              <InputField label="Günlük İşlem Limiti (₺)" value={config.dailyLimit}
                onChange={v => updateConfig({ dailyLimit: parseFloat(v) || 0 })} type="number" />
              <InputField label="Min. Sipariş Tutarı (₺)" value={config.minOrderAmount}
                onChange={v => updateConfig({ minOrderAmount: parseFloat(v) || 0 })} type="number" />
            </div>
            <div className="border-t border-slate-50 dark:border-slate-800 pt-4">
              <h4 className="font-black text-slate-700 dark:text-slate-300 mb-4 text-sm">Kategori Bazlı Komisyonlar</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sortedCats.filter(c => c.active).map(cat => (
                  <div key={cat.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <span className="text-xl">{cat.icon}</span>
                    <span className="flex-1 text-sm font-bold text-slate-700 dark:text-slate-300">{cat.name}</span>
                    <div className="flex items-center gap-1">
                      <input type="number" value={cat.commission} min={0} max={50}
                        onChange={e => updateCategory(cat.id, { commission: parseFloat(e.target.value) })}
                        className="w-16 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm text-center focus:outline-none focus:border-orange-500 transition-all" />
                      <span className="text-xs text-slate-400 font-bold">%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={() => save()} className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black transition-all shadow-lg shadow-emerald-500/20">
              <Save size={16} /> Kaydet
            </button>
          </div>
        </div>
      )}

      {/* ── Tab: Marka & Logo ── */}
      {activeTab === "brand" && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-5">
            <h3 className="font-black text-slate-900 dark:text-white">Marka Kimliği</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Site Adı" value={config.siteName} onChange={v => updateConfig({ siteName: v })} placeholder="DentalPazar" />
              <InputField label="Logo Metni" value={config.logoText} onChange={v => updateConfig({ logoText: v })} placeholder="dentalpazar" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Ana Renk (Primary)</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={config.primaryColor} onChange={e => updateConfig({ primaryColor: e.target.value })}
                    className="w-12 h-10 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer bg-transparent" />
                  <input value={config.primaryColor} onChange={e => updateConfig({ primaryColor: e.target.value })}
                    className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:border-orange-500 transition-all" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Vurgu Rengi (Accent)</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={config.logoAccentColor} onChange={e => updateConfig({ logoAccentColor: e.target.value })}
                    className="w-12 h-10 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer bg-transparent" />
                  <input value={config.logoAccentColor} onChange={e => updateConfig({ logoAccentColor: e.target.value })}
                    className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:border-orange-500 transition-all" />
                </div>
              </div>
            </div>
            {/* Preview */}
            <div className="p-4 bg-slate-950 rounded-2xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg font-black text-white text-sm" style={{ backgroundColor: config.primaryColor }}>D</div>
              <span className="font-black text-lg text-white">
                {config.logoText.slice(0, -3)}
                <span style={{ color: config.logoAccentColor }}>{config.logoText.slice(-3)}</span>
              </span>
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={() => save()} className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black transition-all shadow-lg shadow-emerald-500/20">
              <Save size={16} /> Kaydet
            </button>
          </div>
        </div>
      )}

      {/* ── Tab: Ana Sayfa ── */}
      {activeTab === "homepage" && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-5">
            <h3 className="font-black text-slate-900 dark:text-white">Hero Bölümü</h3>
            <TextAreaField label="Başlık (satır için \\n)" value={config.heroTitle}
              onChange={v => updateConfig({ heroTitle: v })} rows={2} />
            <TextAreaField label="Alt Başlık" value={config.heroSubtitle}
              onChange={v => updateConfig({ heroSubtitle: v })} rows={3} />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="CTA Butonu Metni" value={config.heroCtaText} onChange={v => updateConfig({ heroCtaText: v })} />
              <InputField label="CTA Butonu Linki" value={config.heroCtaLink} onChange={v => updateConfig({ heroCtaLink: v })} placeholder="/register" />
            </div>
            <div className="border-t border-slate-50 dark:border-slate-800 pt-4">
              <h4 className="font-black text-slate-700 dark:text-slate-300 mb-3 text-sm">İstatistikler (3 adet)</h4>
              <div className="grid grid-cols-3 gap-3">
                {editingStats.map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <input value={stat.value} onChange={e => {
                      const updated = [...editingStats]; updated[i] = {...updated[i], value: e.target.value};
                      setEditingStats(updated); updateConfig({ heroStats: updated });
                    }} placeholder="1,240+" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-black text-center focus:outline-none focus:border-orange-500 transition-all" />
                    <input value={stat.label} onChange={e => {
                      const updated = [...editingStats]; updated[i] = {...updated[i], label: e.target.value};
                      setEditingStats(updated); updateConfig({ heroStats: updated });
                    }} placeholder="Onaylı Lab" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs text-center focus:outline-none focus:border-orange-500 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={() => save()} className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black transition-all shadow-lg shadow-emerald-500/20">
              <Save size={16} /> Kaydet & Yayınla
            </button>
          </div>
        </div>
      )}

      {/* ── Tab: Footer ── */}
      {activeTab === "footer" && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-5">
            <h3 className="font-black text-slate-900 dark:text-white">Footer & Sosyal Medya</h3>
            <InputField label="Footer Metni" value={config.footerText} onChange={v => updateConfig({ footerText: v })} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-50 dark:border-slate-800 pt-4">
              <InputField label="Instagram URL" value={config.socialLinks.instagram}
                onChange={v => updateConfig({ socialLinks: {...config.socialLinks, instagram: v} })} placeholder="https://instagram.com/..." />
              <InputField label="Twitter/X URL" value={config.socialLinks.twitter}
                onChange={v => updateConfig({ socialLinks: {...config.socialLinks, twitter: v} })} placeholder="https://twitter.com/..." />
              <InputField label="LinkedIn URL" value={config.socialLinks.linkedin}
                onChange={v => updateConfig({ socialLinks: {...config.socialLinks, linkedin: v} })} placeholder="https://linkedin.com/..." />
              <InputField label="YouTube URL" value={config.socialLinks.youtube}
                onChange={v => updateConfig({ socialLinks: {...config.socialLinks, youtube: v} })} placeholder="https://youtube.com/..." />
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={() => save()} className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black transition-all shadow-lg shadow-emerald-500/20">
              <Save size={16} /> Kaydet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
