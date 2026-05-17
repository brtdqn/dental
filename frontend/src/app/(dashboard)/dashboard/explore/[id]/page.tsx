"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/api/axios";
import { Star, MapPin, Clock, Award, ArrowLeft, MessageSquare, ChevronRight, Zap, Shield } from "lucide-react";

const MOCK_LABS: Record<string, any> = {
  "1": { fullName: "Elite Dental Studio", city: "İstanbul", clinicName: "Merkez Şube, Şişli", rating: 4.9, reviews: 128, deliveryDays: 2, isVerified: true, price: "₺850", bio: "2012'den beri sektörde faaliyet gösteren Elite Dental Studio, dijital diş teknolojilerinde uzmanlaşmış, ISO 9001 sertifikalı bir laboratuvardır. 50'den fazla klinik ile çalışmakta olup yıllık 2000+ iş teslimiyatı gerçekleştirmektedir.", specialties: ["Zirkonyum", "Emax", "Lamine", "Gülüş Tasarımı"], completedOrders: 2140, responseTime: "2 saat", turnaround: "2-3 gün" },
  "2": { fullName: "Modern Diş Lab", city: "Ankara", clinicName: "Çankaya / Ankara", rating: 4.7, reviews: 87, deliveryDays: 3, isVerified: true, price: "₺720", bio: "Ankara'nın önde gelen dijital protez laboratuvarlarından Modern Diş Lab, son teknoloji CAD/CAM ekipmanlarıyla çalışmaktadır.", specialties: ["İmplant Üstü", "Lamine", "Porselen"], completedOrders: 980, responseTime: "4 saat", turnaround: "3-4 gün" },
  "3": { fullName: "Premium Smile Lab", city: "İzmir", clinicName: "Alsancak / İzmir", rating: 4.8, reviews: 203, deliveryDays: 1, isVerified: false, price: "₺1,200", bio: "Ege'nin en prestijli estetik diş laboratuvarı olan Premium Smile Lab, gülüş tasarımı ve estetik restorasyon konusunda Türkiye genelinde referans noktası haline gelmiştir.", specialties: ["Gülüş Tasarımı", "Zirkonyum", "Emax"], completedOrders: 3200, responseTime: "1 saat", turnaround: "1-2 gün" },
  "4": { fullName: "Hızlı Protez Merkezi", city: "Bursa", clinicName: "Nilüfer / Bursa", rating: 4.5, reviews: 54, deliveryDays: 1, isVerified: true, price: "₺650", bio: "Acil ve ekspres teslimat konusunda uzmanlaşmış Hızlı Protez Merkezi, 24 saatte teslim garantisi sunan Türkiye'nin öncü laboratuvarlarından biridir.", specialties: ["Emax", "Porselen", "Geçici Diş"], completedOrders: 540, responseTime: "30 dakika", turnaround: "24 saat" },
};

const MOCK_REVIEWS = [
  { name: "Dr. Ayşe Kaya", rating: 5, date: "12 Nisan 2026", text: "Mükemmel iş kalitesi ve inanılmaz hızlı teslimat. Kesinlikle tavsiye ederim.", avatar: "AK" },
  { name: "Dr. Mehmet Demir", rating: 5, date: "28 Mart 2026", text: "Zirkonyum kalitesi gerçekten üst düzey. Renk uyumu mükemmeldi.", avatar: "MD" },
  { name: "Dr. Selin Arslan", rating: 4, date: "15 Mart 2026", text: "Teslimat süresine sadık kaldılar, iletişim çok iyiydi.", avatar: "SA" },
];

export default function LabProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("about");
  const [loading, setLoading] = useState(true);
  const [lab, setLab] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get(`/profiles/${id}`);
        if (data) {
          setLab({ ...MOCK_LABS[id] || MOCK_LABS["1"], ...data });
          return;
        }
      } catch {
        // backend offline - use mock
      }
      setLab(MOCK_LABS[id] || MOCK_LABS["1"]);
      setLoading(false);
    };
    fetchProfile();
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-52 bg-slate-100 dark:bg-slate-800 rounded-3xl" />
        <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-3xl" />
        <div className="grid grid-cols-3 gap-4">
          {[1,2,3].map(i => <div key={i} className="h-48 bg-slate-100 dark:bg-slate-800 rounded-3xl" />)}
        </div>
      </div>
    );
  }

  if (!lab) {
    return (
      <div className="py-24 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="font-black text-xl text-slate-900 dark:text-white">Laboratuvar bulunamadı</h2>
        <Link href="/dashboard/explore" className="mt-5 inline-block text-orange-500 font-bold hover:underline">← Keşfete Geri Dön</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-fade-in pb-20 space-y-6">

      {/* Back */}
      <Link href="/dashboard/explore" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-orange-500 transition-colors">
        <ArrowLeft size={16} /> Laboratuvar Listesi
      </Link>

      {/* Hero Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
        {/* Cover */}
        <div className="h-40 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 relative">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 right-16 text-8xl">🦷</div>
            <div className="absolute top-8 right-48 text-5xl">✨</div>
          </div>
          {lab.isVerified && (
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-emerald-600 dark:text-emerald-400 text-xs font-black px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/30">
              <Award size={12} /> ONAYLANMIŞ LAB
            </div>
          )}
        </div>

        <div className="px-8 pb-8 -mt-14 relative">
          {/* Avatar */}
          <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-4 border-white dark:border-slate-900 flex items-center justify-center text-3xl font-black text-orange-500 mb-4">
            {lab.fullName?.[0] || "L"}
          </div>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">{lab.fullName}</h1>
                {lab.deliveryDays <= 1 && (
                  <span className="flex items-center gap-1 text-[10px] font-black px-2 py-1 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-full border border-orange-200 dark:border-orange-500/20">
                    <Zap size={9} /> ACİL TESLİMAT
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 flex-wrap text-sm">
                <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                  <MapPin size={13} /> {lab.clinicName || lab.city}
                </span>
                <span className="flex items-center gap-1 font-bold text-amber-500">
                  <Star size={13} className="fill-amber-500" /> {lab.rating?.toFixed(1)}
                  <span className="text-slate-400 dark:text-slate-500 font-normal">({lab.reviews} değerlendirme)</span>
                </span>
                <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                  <Clock size={13} /> {lab.turnaround}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(lab.specialties || []).map((s: string) => (
                  <span key={s} className="text-[11px] px-2.5 py-1 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-full font-semibold border border-orange-100 dark:border-orange-500/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3 flex-shrink-0">
              <div>
                <div className="text-xs text-slate-400 text-right">Başlayan fiyat</div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">{lab.price}</div>
              </div>
              <Link href={`/dashboard/orders/new?producerId=${id}`}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/25 hover:-translate-y-0.5 text-sm">
                Teklif İste <ChevronRight size={16} />
              </Link>
              <button className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm">
                <MessageSquare size={14} /> Mesaj Gönder
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Tamamlanan İş", value: lab.completedOrders?.toLocaleString("tr-TR") || "0" },
          { label: "Yanıt Süresi", value: lab.responseTime || "—" },
          { label: "Teslimat", value: lab.turnaround || "—" },
          { label: "Puan", value: `${lab.rating?.toFixed(1)} / 5.0` },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 text-center">
            <div className="text-xl font-black text-orange-500">{s.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white dark:bg-slate-900 rounded-2xl p-1.5 border border-slate-100 dark:border-slate-800 w-fit">
        {[
          { key: "about", label: "Hakkında" },
          { key: "reviews", label: `Yorumlar (${lab.reviews || 0})` },
          { key: "portfolio", label: "Portfolyo" },
        ].map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === t.key ? "bg-orange-500 text-white shadow-md" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* About Tab */}
      {activeTab === "about" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-4">
            <h3 className="font-black text-slate-900 dark:text-white">Laboratuvar Hakkında</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{lab.bio}</p>
            <div className="pt-4 border-t border-slate-50 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3">Uzmanlık Alanları</h4>
              <div className="flex flex-wrap gap-2">
                {(lab.specialties || []).map((s: string) => (
                  <span key={s} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm rounded-xl font-medium border border-slate-100 dark:border-slate-700">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-orange-50 dark:bg-orange-500/10 rounded-2xl border border-orange-100 dark:border-orange-500/20 p-5 space-y-3">
              <h4 className="font-bold text-orange-700 dark:text-orange-400 text-sm flex items-center gap-2"><Shield size={14} /> Güvenceler</h4>
              {["Zamanında teslimat garantisi", "Ücretsiz revizyon hakkı", "Güvenli ödeme sistemi", "Onaylı teknisyen"].map((g, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[8px] font-black">✓</span>
                  </div>
                  {g}
                </div>
              ))}
            </div>
            <Link href={`/dashboard/orders/new?producerId=${id}`}
              className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-black text-center transition-all shadow-lg shadow-orange-500/20 hover:-translate-y-0.5">
              Hemen Teklif Al
            </Link>
          </div>
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === "reviews" && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 flex items-center gap-6">
            <div className="text-center">
              <div className="text-5xl font-black text-slate-900 dark:text-white">{lab.rating?.toFixed(1)}</div>
              <div className="flex gap-0.5 mt-2 justify-center">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} className={`${s <= Math.round(lab.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-700"}`} />)}
              </div>
              <div className="text-xs text-slate-400 mt-1">{lab.reviews} değerlendirme</div>
            </div>
            <div className="flex-grow space-y-2">
              {[5,4,3,2,1].map(r => (
                <div key={r} className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 w-4">{r}</span>
                  <div className="flex-grow bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${r === 5 ? 70 : r === 4 ? 20 : r === 3 ? 7 : 3}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {MOCK_REVIEWS.map((r, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-white text-xs font-black">{r.avatar}</div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{r.name}</div>
                  <div className="text-xs text-slate-400">{r.date}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} className={`${s <= r.rating ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-700"}`} />)}
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">&quot;{r.text}&quot;</p>
            </div>
          ))}
        </div>
      )}

      {/* Portfolio Tab */}
      {activeTab === "portfolio" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 text-center space-y-4">
          <div className="text-5xl">🎨</div>
          <h3 className="font-black text-slate-900 dark:text-white">Portfolyo Yakında</h3>
          <p className="text-slate-400 dark:text-slate-500 text-sm max-w-sm mx-auto">Bu laboratuvarın çalışma örnekleri yakında burada yayınlanacak.</p>
          <Link href={`/dashboard/orders/new?producerId=${id}`}
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all text-sm mt-2">
            Doğrudan Teklif Al <ChevronRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
