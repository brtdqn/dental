import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CategoryConfig {
  id: string;
  name: string;
  icon: string;
  color: string;       // hex or tailwind token
  commission: number;  // %
  active: boolean;
  order: number;
}

export interface SiteConfig {
  // Brand
  siteName: string;
  logoText: string;
  logoAccentColor: string; // hex
  primaryColor: string;    // hex
  // Homepage Hero
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroStats: Array<{ value: string; label: string }>;
  // Categories
  categories: CategoryConfig[];
  // Platform settings
  defaultCommission: number; // %
  dailyLimit: number;        // ₺
  minOrderAmount: number;    // ₺
  // Footer
  footerText: string;
  socialLinks: {
    instagram: string;
    twitter: string;
    linkedin: string;
    youtube: string;
  };
}

const DEFAULT_CONFIG: SiteConfig = {
  siteName: "DentalPazar",
  logoText: "dentalpazar",
  logoAccentColor: "#f97316",
  primaryColor: "#f97316",
  heroTitle: "Dijital Diş Laboratuvarı\nDeneyimi Başlıyor",
  heroSubtitle: "1,240+ onaylı laboratuvardan anlık teklif alın. STL dosyanızı yükleyin, en uygun fiyatı seçin, güvenle ödeme yapın.",
  heroCtaText: "Ücretsiz Hesap Aç",
  heroCtaLink: "/register",
  heroStats: [
    { value: "1,240+", label: "Onaylı Lab" },
    { value: "8,500+", label: "Tamamlanan İş" },
    { value: "98%",    label: "Memnuniyet" },
  ],
  categories: [
    { id: "zirkonyum",     name: "Zirkonyum",       icon: "💎", color: "#3b82f6", commission: 10, active: true,  order: 1 },
    { id: "emax",          name: "Emax & Porselen",  icon: "🦷", color: "#8b5cf6", commission: 10, active: true,  order: 2 },
    { id: "implant",       name: "İmplant Üstü",     icon: "🔩", color: "#f59e0b", commission: 12, active: true,  order: 3 },
    { id: "lamine",        name: "Lamine",            icon: "✨", color: "#ec4899", commission: 10, active: true,  order: 4 },
    { id: "ortodonti",     name: "Ortodonti",         icon: "📐", color: "#10b981", commission: 8,  active: true,  order: 5 },
    { id: "hareketli",     name: "Hareketli Protez",  icon: "🦾", color: "#6366f1", commission: 10, active: true,  order: 6 },
    { id: "dijital",       name: "Dijital Gülüş",     icon: "😁", color: "#f97316", commission: 15, active: true,  order: 7 },
    { id: "kampanyalar",   name: "Kampanyalar %",     icon: "🏷️", color: "#ef4444", commission: 0,  active: true,  order: 8 },
    { id: "cerrahi",       name: "Cerrahi Guide",     icon: "🎯", color: "#14b8a6", commission: 12, active: false, order: 9 },
    { id: "gecici",        name: "Geçici Diş",        icon: "⏱️", color: "#64748b", commission: 8,  active: false, order: 10 },
  ],
  defaultCommission: 10,
  dailyLimit: 500000,
  minOrderAmount: 100,
  footerText: "© 2026 DentalPazar. Tüm hakları saklıdır.",
  socialLinks: { instagram: "", twitter: "", linkedin: "", youtube: "" },
};

interface SiteConfigStore {
  config: SiteConfig;
  updateConfig: (partial: Partial<SiteConfig>) => void;
  updateCategory: (id: string, partial: Partial<CategoryConfig>) => void;
  addCategory: (cat: Omit<CategoryConfig, "id">) => void;
  removeCategory: (id: string) => void;
  reorderCategory: (id: string, direction: "up" | "down") => void;
  resetConfig: () => void;
}

export const useSiteConfigStore = create<SiteConfigStore>()(
  persist(
    (set) => ({
      config: DEFAULT_CONFIG,

      updateConfig: (partial) =>
        set((state) => ({ config: { ...state.config, ...partial } })),

      updateCategory: (id, partial) =>
        set((state) => ({
          config: {
            ...state.config,
            categories: state.config.categories.map((c) =>
              c.id === id ? { ...c, ...partial } : c
            ),
          },
        })),

      addCategory: (cat) =>
        set((state) => ({
          config: {
            ...state.config,
            categories: [
              ...state.config.categories,
              { ...cat, id: `cat_${Date.now()}` },
            ],
          },
        })),

      removeCategory: (id) =>
        set((state) => ({
          config: {
            ...state.config,
            categories: state.config.categories.filter((c) => c.id !== id),
          },
        })),

      reorderCategory: (id, direction) =>
        set((state) => {
          const cats = [...state.config.categories].sort((a, b) => a.order - b.order);
          const idx = cats.findIndex((c) => c.id === id);
          const swapIdx = direction === "up" ? idx - 1 : idx + 1;
          if (swapIdx < 0 || swapIdx >= cats.length) return state;
          [cats[idx].order, cats[swapIdx].order] = [cats[swapIdx].order, cats[idx].order];
          return { config: { ...state.config, categories: cats } };
        }),

      resetConfig: () => set({ config: DEFAULT_CONFIG }),
    }),
    { name: "dis-site-config" }
  )
);
