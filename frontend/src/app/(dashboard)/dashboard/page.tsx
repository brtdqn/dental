"use client";

import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { ArrowRight, Star, Clock, ShieldCheck, ChevronRight, Zap, Award, TrendingUp, Users, Package, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/lib/api/axios";

const MOCK_LABS = [
  { id: "1", profile: { fullName: "Elite Dental Studio", city: "İstanbul", rating: 4.9, reviews: 128, specialties: ["Zirkonyum", "Emax"], price: "₺850", deliveryDays: 2, isVerified: true } },
  { id: "2", profile: { fullName: "Modern Diş Lab", city: "Ankara", rating: 4.7, reviews: 87, specialties: ["İmplant Üstü", "Lamine"], price: "₺720", deliveryDays: 3, isVerified: true } },
  { id: "3", profile: { fullName: "Premium Smile Lab", city: "İzmir", rating: 4.8, reviews: 203, specialties: ["Gülüş Tasarımı"], price: "₺1,200", deliveryDays: 1, isVerified: false } },
  { id: "4", profile: { fullName: "Hızlı Protez Merkezi", city: "Bursa", rating: 4.5, reviews: 54, specialties: ["Emax", "Porselen"], price: "₺650", deliveryDays: 1, isVerified: true } },
];

const CATEGORIES = [
  { name: "Zirkonyum", icon: "💎", color: "from-blue-500 to-blue-600", count: "124 Lab" },
  { name: "Emax & Porselen", icon: "🦷", color: "from-purple-500 to-purple-600", count: "89 Lab" },
  { name: "İmplant Üstü", icon: "🔩", color: "from-emerald-500 to-emerald-600", count: "67 Lab" },
  { name: "Lamine", icon: "✨", color: "from-amber-500 to-orange-500", count: "43 Lab" },
  { name: "Ortodonti", icon: "🦷", color: "from-pink-500 to-rose-500", count: "38 Lab" },
  { name: "Gülüş Tasarımı", icon: "😁", color: "from-cyan-500 to-teal-500", count: "51 Lab" },
  { name: "Gece Plağı", icon: "🌙", color: "from-indigo-500 to-indigo-600", count: "29 Lab" },
  { name: "Dijital Tasarım", icon: "🖥️", color: "from-slate-600 to-slate-700", count: "62 Lab" },
];

const TESTIMONIALS = [
  { name: "Dr. Ayşe Kaya", clinic: "Kaya Dental Kliniği, İstanbul", text: "Elite Lab ile çalışmaya başladığımdan beri hasta memnuniyetim inanılmaz arttı. Zirkonyum kalitesi gerçekten üst düzey.", rating: 5, avatar: "AK" },
  { name: "Dr. Mehmet Demir", clinic: "Demir Ağız Sağlığı, Ankara", text: "Platform üzerinden teklif almak çok kolay. 3 farklı lab arasında karşılaştırma yapıp en uygun olanı seçtim.", rating: 5, avatar: "MD" },
  { name: "Dr. Selin Arslan", clinic: "Arslan Diş, İzmir", text: "Acil vakalarda bile 24 saat içinde teslimat yapabilen laboratuvarlar bulmak artık çok kolay.", rating: 5, avatar: "SA" },
];

const STATS = [
  { value: "1,240+", label: "Aktif Laboratuvar", icon: <Award className="w-6 h-6" /> },
  { value: "8,500+", label: "Tamamlanan Sipariş", icon: <Package className="w-6 h-6" /> },
  { value: "3,200+", label: "Kayıtlı Hekim", icon: <Users className="w-6 h-6" /> },
  { value: "98%", label: "Memnuniyet Oranı", icon: <Star className="w-6 h-6" /> },
];

const HERO_BANNERS = [
  {
    tag: "🔥 HAFTANIN FIRSATI",
    title: "Elite Lab'da Tüm Zirkonyum İşlerinde",
    highlight: "%20 İndirim",
    desc: "Bu hafta sonuna kadar vereceğiniz tüm siparişlerde geçerlidir.",
    cta: "Hemen İncele",
    ctaHref: "/dashboard/explore/1",
    bg: "from-slate-900 via-slate-800 to-slate-900",
    accent: "from-orange-400 to-yellow-300",
  },
  {
    tag: "⚡ ACİL TESLİMAT",
    title: "24 Saatte Teslim Eden",
    highlight: "Laboratuvarlar",
    desc: "Acil vakalarınız için hızlı teslimat yapabilen seçkin lab'ları keşfedin.",
    cta: "Acil Lab Bul",
    ctaHref: "/dashboard/explore?category=Acil",
    bg: "from-blue-950 via-blue-900 to-slate-900",
    accent: "from-blue-400 to-cyan-300",
  },
];

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [featuredLabs, setFeaturedLabs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [heroBanner, setHeroBanner] = useState(0);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const res = await api.get("/profiles/producers");
        setFeaturedLabs(res.data.length > 0 ? res.data : MOCK_LABS);
      } catch {
        setFeaturedLabs(MOCK_LABS);
      } finally {
        setLoading(false);
      }
    };
    fetchLabs();

    // Auto-rotate hero banner
    const timer = setInterval(() => setHeroBanner(p => (p + 1) % HERO_BANNERS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const banner = HERO_BANNERS[heroBanner];

  return (
    <div className="space-y-10 pb-20 animate-fade-in">

      {/* Hero Banner */}
      <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-r ${banner.bg} h-[320px] md:h-[380px] flex items-center shadow-2xl transition-all duration-700`}>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/10 to-transparent" />
        <div className="absolute -right-16 -bottom-16 text-[280px] opacity-5 select-none pointer-events-none">🦷</div>
        <div className="relative z-10 px-8 md:px-16 max-w-2xl text-white space-y-5">
          <div className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-orange-400 font-bold text-xs rounded-full uppercase tracking-widest backdrop-blur-sm">
            {banner.tag}
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">
            {banner.title}{" "}
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${banner.accent}`}>{banner.highlight}</span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg">{banner.desc}</p>
          <div className="flex gap-3 pt-1">
            <Link href={banner.ctaHref} className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 text-sm">
              {banner.cta}
            </Link>
            <Link href="/dashboard/explore" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-7 py-3 rounded-xl font-bold transition-all border border-white/10 text-sm">
              Keşfet
            </Link>
          </div>
        </div>
        {/* Banner dots */}
        <div className="absolute bottom-5 right-8 flex gap-2">
          {HERO_BANNERS.map((_, i) => (
            <button key={i} onClick={() => setHeroBanner(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === heroBanner ? 'bg-orange-400 w-6' : 'bg-white/30'}`} />
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 flex items-center gap-4 hover:border-orange-300 dark:hover:border-orange-500/50 transition-all group">
            <div className="w-12 h-12 bg-orange-50 dark:bg-orange-500/10 text-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              {s.icon}
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{s.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Kategoriler</h2>
          <Link href="/dashboard/explore" className="text-orange-500 font-bold text-sm hover:underline flex items-center gap-1">
            Tümü <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map((cat) => (
            <Link key={cat.name} href={`/dashboard/explore?category=${cat.name}`}
              className="group flex flex-col items-center gap-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 hover:border-orange-400 dark:hover:border-orange-500 hover:shadow-lg transition-all text-center">
              <div className={`w-12 h-12 bg-gradient-to-br ${cat.color} rounded-xl flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-orange-500 transition-colors leading-tight">{cat.name}</div>
              <div className="text-[10px] text-slate-400">{cat.count}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/orders/new"
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white flex items-center gap-4 hover:shadow-xl hover:shadow-orange-500/25 transition-all group hover:-translate-y-1">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform flex-shrink-0">📋</div>
          <div>
            <div className="font-black text-lg">Yeni İş Talebi</div>
            <div className="text-orange-100 text-sm mt-0.5">STL dosyanızı yükleyin, teklif alın</div>
          </div>
          <ChevronRight className="ml-auto opacity-60" />
        </Link>
        <Link href="/dashboard/explore"
          className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white flex items-center gap-4 hover:shadow-xl hover:shadow-blue-500/25 transition-all group hover:-translate-y-1">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform flex-shrink-0">🔍</div>
          <div>
            <div className="font-black text-lg">Lab Keşfet</div>
            <div className="text-blue-100 text-sm mt-0.5">1,240+ laboratuvarı karşılaştır</div>
          </div>
          <ChevronRight className="ml-auto opacity-60" />
        </Link>
        <Link href="/dashboard/messages"
          className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white flex items-center gap-4 hover:shadow-xl hover:shadow-emerald-500/25 transition-all group hover:-translate-y-1">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform flex-shrink-0">💬</div>
          <div>
            <div className="font-black text-lg">Mesajlar</div>
            <div className="text-emerald-100 text-sm mt-0.5">Lab&apos;larınızla doğrudan iletişim</div>
          </div>
          <ChevronRight className="ml-auto opacity-60" />
        </Link>
      </div>

      {/* Featured Labs */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              Öne Çıkan Laboratuvarlar <span className="text-orange-500">★</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Platform tarafından onaylı ve en çok tercih edilen lab&apos;lar</p>
          </div>
          <Link href="/dashboard/explore" className="text-orange-500 font-bold text-sm hover:underline flex items-center gap-1 hidden sm:flex">
            Tümünü Gör <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1,2,3,4].map(i => <div key={i} className="bg-slate-100 dark:bg-slate-800 rounded-2xl h-72 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredLabs.slice(0, 4).map((lab) => (
              <div key={lab.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-orange-400 dark:hover:border-orange-500 hover:shadow-xl transition-all group overflow-hidden flex flex-col">
                <div className="h-36 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 flex items-center justify-center relative">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-500">🦷</span>
                  {lab.profile?.isVerified && (
                    <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Award size={9} /> ONAYLI
                    </div>
                  )}
                  {lab.profile?.deliveryDays <= 1 && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Zap size={9} /> ACİL
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-grow gap-2">
                  <Link href={`/dashboard/explore/${lab.id}`} className="font-bold text-slate-900 dark:text-white hover:text-orange-500 transition-colors line-clamp-1">
                    {lab.profile?.fullName || lab.email}
                  </Link>
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    📍 {lab.profile?.city || "Türkiye"}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {(lab.profile?.specialties || []).slice(0, 2).map((tag: string) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-full font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                      <Star size={13} className="fill-amber-500" />
                      {lab.profile?.rating?.toFixed(1) || "0.0"}
                      <span className="text-slate-400 font-normal text-xs">({lab.profile?.reviews || 0})</span>
                    </div>
                    <Link href={`/dashboard/orders/new?producerId=${lab.id}`}
                      className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20">
                      Teklif Al
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Promo Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Link href="/dashboard/orders/new"
          className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-7 text-white relative overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/20 transition-all block">
          <div className="relative z-10">
            <div className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-2">Dijital İş Akışı</div>
            <h3 className="text-2xl font-black mb-2">3D Modellerinizi Yükleyin</h3>
            <p className="text-blue-100 text-sm mb-5 max-w-xs">STL dosyalarınızı yükleyin, yüzlerce lab&apos;dan otomatik teklif alın.</p>
            <div className="inline-flex items-center gap-2 bg-white text-blue-600 px-5 py-2.5 rounded-xl font-bold text-sm group-hover:bg-blue-50 transition-colors">
              Hızlı Fiyat Al <ChevronRight size={16} />
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 text-[130px] opacity-10 group-hover:scale-110 transition-transform duration-500">📤</div>
        </Link>

        <Link href="/dashboard/explore?delivery=urgent"
          className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-7 text-white relative overflow-hidden group hover:shadow-2xl hover:shadow-emerald-500/20 transition-all block">
          <div className="relative z-10">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-200 mb-2">⚡ Hızlı Teslimat</div>
            <h3 className="text-2xl font-black mb-2">Acil İşleriniz Var Mı?</h3>
            <p className="text-emerald-100 text-sm mb-5 max-w-xs">24 saat içinde teslimat yapabilen seçkin laboratuvarları keşfedin.</p>
            <div className="inline-flex items-center gap-2 bg-white text-emerald-600 px-5 py-2.5 rounded-xl font-bold text-sm group-hover:bg-emerald-50 transition-colors">
              Acil Lab Bul <ChevronRight size={16} />
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 text-[130px] opacity-10 group-hover:scale-110 transition-transform duration-500">⚡</div>
        </Link>
      </div>

      {/* Testimonials */}
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Hekim Yorumları</h2>
          <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
            <Star size={16} className="fill-amber-500" /> 4.9 / 5.0
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-4 hover:border-orange-200 dark:hover:border-orange-500/30 hover:shadow-lg transition-all">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic">&quot;{t.text}&quot;</p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-50 dark:border-slate-800">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{t.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{t.clinic}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 rounded-3xl p-8 md:p-12 text-white">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black">Nasıl Çalışır?</h2>
          <p className="text-slate-400 mt-2">3 basit adımda dijital diş laboratuvarı deneyimi</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "01", icon: "📋", title: "İş Talebi Oluştur", desc: "STL dosyanızı yükleyin veya iş detaylarınızı yazın. Kategori, teslim tarihi ve bütçenizi belirtin." },
            { step: "02", icon: "💬", title: "Teklifleri Karşılaştır", desc: "Onaylı laboratuvarlar birkaç saat içinde fiyat teklifi gönderir. En uygununu seçin." },
            { step: "03", icon: "✅", title: "İşi Onaylayın", desc: "Tercih ettiğiniz lab ile anlaşın, işi takip edin ve teslimatta ödeme yapın." },
          ].map((step, i) => (
            <div key={i} className="flex gap-5 group">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-orange-500/20 border border-orange-500/30 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-orange-500/30 transition-colors">
                  {step.icon}
                </div>
              </div>
              <div>
                <div className="text-orange-400 font-black text-xs uppercase tracking-widest mb-1">{step.step}</div>
                <div className="font-black text-lg mb-2">{step.title}</div>
                <div className="text-slate-400 text-sm leading-relaxed">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/dashboard/orders/new"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-black text-base transition-all shadow-xl shadow-orange-500/30 hover:-translate-y-1">
            İlk İş Talebi Oluştur <ArrowRight size={18} />
          </Link>
        </div>
      </div>

    </div>
  );
}
