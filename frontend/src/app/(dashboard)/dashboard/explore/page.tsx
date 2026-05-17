"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import api from "@/lib/api/axios";
import { Star, Filter, Check, Search, MapPin, Clock, Award, Zap, X } from "lucide-react";

// Fallback mock data for when backend is offline
const MOCK_LABS = [
  { id: "1", email: "elite@lab.com", profile: { fullName: "Elite Dental Studio", clinicName: "İstanbul Merkez", rating: 4.9, reviews: 128, specialties: ["Zirkonyum", "Emax"], city: "İstanbul", deliveryDays: 2, isVerified: true, price: "₺850" } },
  { id: "2", email: "modern@lab.com", profile: { fullName: "Modern Diş Lab", clinicName: "Ankara Lab", rating: 4.7, reviews: 87, specialties: ["İmplant Üstü", "Lamine"], city: "Ankara", deliveryDays: 3, isVerified: true, price: "₺720" } },
  { id: "3", email: "premium@lab.com", profile: { fullName: "Premium Smile Lab", clinicName: "İzmir Kliniği", rating: 4.8, reviews: 203, specialties: ["Gülüş Tasarımı", "Zirkonyum"], city: "İzmir", deliveryDays: 1, isVerified: false, price: "₺1,200" } },
  { id: "4", email: "hizli@lab.com", profile: { fullName: "Hızlı Protez Merkezi", clinicName: "Bursa Şubesi", rating: 4.5, reviews: 54, specialties: ["Emax", "Porselen"], city: "Bursa", deliveryDays: 1, isVerified: true, price: "₺650" } },
  { id: "5", email: "akademi@lab.com", profile: { fullName: "Akademi Dental Lab", clinicName: "Kadıköy / İstanbul", rating: 4.6, reviews: 92, specialties: ["Ortodonti", "Gece Plağı"], city: "İstanbul", deliveryDays: 4, isVerified: false, price: "₺550" } },
  { id: "6", email: "diger@lab.com", profile: { fullName: "Dijital Diş Teknoloji", clinicName: "Antalya", rating: 4.3, reviews: 31, specialties: ["Dijital Tasarım", "Wax-up"], city: "Antalya", deliveryDays: 3, isVerified: true, price: "₺980" } },
  { id: "7", email: "inovasyon@lab.com", profile: { fullName: "İnovasyon Dental", clinicName: "Beşiktaş / İstanbul", rating: 4.8, reviews: 167, specialties: ["Zirkonyum", "Lamine"], city: "İstanbul", deliveryDays: 2, isVerified: true, price: "₺1,050" } },
  { id: "8", email: "anatolian@lab.com", profile: { fullName: "Anadolu Protez Lab", clinicName: "Kayseri", rating: 4.4, reviews: 43, specialties: ["Emax", "İmplant Üstü"], city: "Kayseri", deliveryDays: 5, isVerified: false, price: "₺490" } },
];

const CATEGORIES = ["Zirkonyum", "Emax", "Porselen", "İmplant Üstü", "Lamine", "Gülüş Tasarımı", "Ortodonti", "Dijital Tasarım"];
const CITIES = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Kayseri"];
const DELIVERY_OPTS = ["Aynı Gün", "1-2 Gün", "3-5 Gün", "5+ Gün"];
const SORT_OPTS = ["Önerilen Sıralama", "En Yüksek Puan", "En Fazla Değerlendirme", "En Hızlı Teslimat", "En Düşük Fiyat"];

export default function ExplorePage() {
  const [labs, setLabs] = useState<any[]>([]);
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSort, setSelectedSort] = useState("Önerilen Sıralama");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [labsRes, adsRes] = await Promise.all([
          api.get("/profiles/producers"),
          api.get("/ads").catch(() => ({ data: [] }))
        ]);
        setLabs(labsRes.data.length > 0 ? labsRes.data : MOCK_LABS);
        setAds(adsRes.data);
      } catch {
        setLabs(MOCK_LABS);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleCategory = (cat: string) =>
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);

  const toggleCity = (city: string) =>
    setSelectedCities(prev => prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]);

  const toggleDelivery = (d: string) =>
    setSelectedDelivery(prev => prev.includes(d) ? prev.filter(c => c !== d) : [...prev, d]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedCities([]);
    setSelectedDelivery([]);
    setSearchQuery("");
  };

  const filteredLabs = labs
    .filter(lab => {
      const name = (lab.profile?.fullName || lab.email || "").toLowerCase();
      const specialties: string[] = lab.profile?.specialties || [];
      const city: string = lab.profile?.city || "";
      const days: number = lab.profile?.deliveryDays || 99;
      if (searchQuery && !name.includes(searchQuery.toLowerCase())) return false;
      if (selectedCategories.length > 0 && !specialties.some(s => selectedCategories.includes(s))) return false;
      if (selectedCities.length > 0 && !selectedCities.includes(city)) return false;
      if (selectedDelivery.length > 0) {
        const match = selectedDelivery.some(d => {
          if (d === "Aynı Gün") return days === 0 || days === 1;
          if (d === "1-2 Gün") return days <= 2;
          if (d === "3-5 Gün") return days <= 5;
          return true;
        });
        if (!match) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (selectedSort === "En Yüksek Puan") return (b.profile?.rating || 0) - (a.profile?.rating || 0);
      if (selectedSort === "En Fazla Değerlendirme") return (b.profile?.reviews || 0) - (a.profile?.reviews || 0);
      if (selectedSort === "En Hızlı Teslimat") return (a.profile?.deliveryDays || 99) - (b.profile?.deliveryDays || 99);
      return 0;
    });

  const activeFilterCount = selectedCategories.length + selectedCities.length + selectedDelivery.length;

  return (
    <div className="flex flex-col gap-6 pb-20 animate-fade-in">

      {/* Top Search + Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-grow">
          <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Laboratuvar veya uzmanlık alanı arayın..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 outline-none transition-all"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-sm text-slate-700 dark:text-white hover:border-orange-500 transition-all sm:hidden"
        >
          <Filter size={16} />
          Filtreler
          {activeFilterCount > 0 && <span className="bg-orange-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{activeFilterCount}</span>}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">

        {/* Left Sidebar (Filters) */}
        <aside className={`w-full md:w-64 flex-shrink-0 space-y-4 ${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sticky top-24">
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2 font-black text-lg text-slate-900 dark:text-white">
                <Filter size={18} className="text-orange-500" />
                Filtreler
                {activeFilterCount > 0 && <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{activeFilterCount}</span>}
              </div>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="text-xs text-red-500 font-bold flex items-center gap-1 hover:underline">
                  <X size={12} /> Temizle
                </button>
              )}
            </div>

            <div className="space-y-6">
              {/* Category */}
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">Uzmanlık Alanı</h3>
                <div className="space-y-2">
                  {CATEGORIES.map(cat => (
                    <label key={cat} onClick={() => toggleCategory(cat)} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center flex-shrink-0 ${selectedCategories.includes(cat) ? 'bg-orange-500 border-orange-500' : 'border-slate-300 dark:border-slate-700 group-hover:border-orange-500'}`}>
                        {selectedCategories.includes(cat) && <Check size={12} className="text-white" />}
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Delivery */}
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">Teslimat Süresi</h3>
                <div className="space-y-2">
                  {DELIVERY_OPTS.map(d => (
                    <label key={d} onClick={() => toggleDelivery(d)} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center flex-shrink-0 ${selectedDelivery.includes(d) ? 'bg-orange-500 border-orange-500' : 'border-slate-300 dark:border-slate-700 group-hover:border-orange-500'}`}>
                        {selectedDelivery.includes(d) && <Check size={12} className="text-white" />}
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{d}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* City */}
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">Şehir</h3>
                <div className="space-y-2">
                  {CITIES.map(city => (
                    <label key={city} onClick={() => toggleCity(city)} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center flex-shrink-0 ${selectedCities.includes(city) ? 'bg-orange-500 border-orange-500' : 'border-slate-300 dark:border-slate-700 group-hover:border-orange-500'}`}>
                        {selectedCities.includes(city) && <Check size={12} className="text-white" />}
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{city}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="w-full mt-6 bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 text-sm"
            >
              Filtrele ({filteredLabs.length} sonuç)
            </button>
          </div>
        </aside>

        {/* Main Grid */}
        <div className="flex-grow min-w-0">

          {/* Sort bar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 px-5 py-3 mb-5 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              <span className="font-bold text-slate-900 dark:text-white">{filteredLabs.length}</span> laboratuvar bulundu
              {activeFilterCount > 0 && <span className="ml-2 text-orange-500 font-bold">· {activeFilterCount} filtre aktif</span>}
            </div>
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl hover:border-orange-500 transition-colors"
              >
                {selectedSort}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </button>
              {showSortMenu && (
                <div className="absolute top-12 right-0 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 z-50 py-2">
                  {SORT_OPTS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setSelectedSort(opt); setShowSortMenu(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 ${selectedSort === opt ? 'text-orange-500 font-bold' : 'text-slate-700 dark:text-slate-300'}`}
                    >
                      {selectedSort === opt && <Check size={14} />}
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Lab Cards */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-slate-100 dark:bg-slate-800 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : filteredLabs.length === 0 ? (
            <div className="py-24 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-bold text-xl text-slate-900 dark:text-white">Sonuç bulunamadı</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Filtrelerinizi değiştirmeyi deneyin.</p>
              <button onClick={clearFilters} className="mt-6 px-6 py-2.5 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors">
                Filtreleri Temizle
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredLabs.map(lab => (
                <div key={lab.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-orange-400 dark:hover:border-orange-500 hover:shadow-xl transition-all group overflow-hidden flex flex-col">
                  {/* Card Image Area */}
                  <div className="h-44 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 flex items-center justify-center relative overflow-hidden">
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-500 z-10">🦷</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {lab.profile?.isVerified && (
                      <div className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-black px-2 py-1 rounded-md flex items-center gap-1 shadow-lg">
                        <Award size={10} /> ONAYLI
                      </div>
                    )}
                    {lab.profile?.deliveryDays <= 1 && (
                      <div className="absolute top-3 right-3 bg-orange-500 text-white text-[10px] font-black px-2 py-1 rounded-md flex items-center gap-1 shadow-lg">
                        <Zap size={10} /> ACİL
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-grow gap-3">
                    <div>
                      <Link href={`/dashboard/explore/${lab.id}`} className="font-bold text-slate-900 dark:text-white text-base hover:text-orange-500 transition-colors line-clamp-1">
                        {lab.profile?.fullName || lab.email}
                      </Link>
                      {lab.profile?.city && (
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-1">
                          <MapPin size={11} />
                          {lab.profile.clinicName && <span>{lab.profile.clinicName} · </span>}
                          {lab.profile.city}
                        </div>
                      )}
                    </div>

                    {/* Specialties */}
                    {lab.profile?.specialties?.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {lab.profile.specialties.slice(0, 3).map((tag: string) => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-full font-semibold border border-orange-100 dark:border-orange-500/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Rating + Delivery */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star size={14} className="fill-amber-500" />
                        {lab.profile?.rating?.toFixed(1) || "0.0"}
                        <span className="text-slate-400 dark:text-slate-500 font-normal text-xs">({lab.profile?.reviews || 0})</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
                        <Clock size={12} />
                        {lab.profile?.deliveryDays ? `${lab.profile.deliveryDays} iş günü` : "2-3 iş günü"}
                      </div>
                    </div>

                    {/* Price + CTA */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Başlayan Fiyat</div>
                        <div className="text-lg font-black text-slate-900 dark:text-white">{lab.profile?.price || "Fiyat sor"}</div>
                      </div>
                      <Link
                        href={`/dashboard/orders/new?producerId=${lab.id}`}
                        className="bg-orange-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 hover:-translate-y-0.5"
                      >
                        Teklif İste
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar (Ads) */}
        {ads.length > 0 && (
          <aside className="hidden xl:block w-64 flex-shrink-0 sticky top-24 h-fit space-y-4">
            <div className="text-xs font-bold text-slate-400 text-center uppercase tracking-widest">Sponsorlu</div>
            {ads.filter((a: any) => a.position === 'RIGHT_SIDEBAR').map((ad: any) => (
              <a key={ad.id} href={ad.linkUrl} target="_blank" rel="noreferrer"
                className="block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ad.imageUrl} alt="Reklam" className="w-full object-cover" />
              </a>
            ))}
          </aside>
        )}
      </div>
    </div>
  );
}
