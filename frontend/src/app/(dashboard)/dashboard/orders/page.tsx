"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus, Eye, MessageSquare, Clock, Package, CheckCircle, Truck, XCircle, Search } from "lucide-react";

const MOCK_ORDERS = [
  { id: "1", title: "Zirkonyum Kaplama #4821", category: "Zirkonyum", date: "12.05.2026", status: "IN_PRODUCTION", price: "₺4,500", lab: "Elite Dental Studio", bids: 2, urgent: false },
  { id: "2", title: "Emax Kron #4822", category: "Emax", date: "14.05.2026", status: "WAITING_BIDS", price: "—", lab: "—", bids: 0, urgent: true },
  { id: "3", title: "İmplant Üstü Protez #4823", category: "İmplant Üstü", date: "15.05.2026", status: "SHIPPED", price: "₺12,000", lab: "Modern Diş Lab", bids: 3, urgent: false },
  { id: "4", title: "Lamine #4820", category: "Lamine", date: "08.05.2026", status: "COMPLETED", price: "₺6,200", lab: "Premium Smile Lab", bids: 4, urgent: false },
  { id: "5", title: "Gece Plağı #4819", category: "Gece Plağı", date: "02.05.2026", status: "CANCELLED", price: "—", lab: "—", bids: 1, urgent: false },
];

type Status = "ALL" | "WAITING_BIDS" | "IN_PRODUCTION" | "SHIPPED" | "COMPLETED" | "CANCELLED";

const STATUS_MAP: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  WAITING_BIDS:  { label: "Teklif Bekliyor", color: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20",  icon: <Clock size={10} /> },
  IN_PRODUCTION: { label: "Üretimde",         color: "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20",        icon: <Package size={10} /> },
  SHIPPED:       { label: "Kargoda",           color: "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20", icon: <Truck size={10} /> },
  COMPLETED:     { label: "Tamamlandı",        color: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20", icon: <CheckCircle size={10} /> },
  CANCELLED:     { label: "İptal",             color: "bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400 border border-red-200 dark:border-red-500/20",              icon: <XCircle size={10} /> },
};

const FILTER_TABS: { key: Status; label: string }[] = [
  { key: "ALL", label: "Tümü" },
  { key: "WAITING_BIDS", label: "Teklif Bekliyor" },
  { key: "IN_PRODUCTION", label: "Üretimde" },
  { key: "SHIPPED", label: "Kargoda" },
  { key: "COMPLETED", label: "Tamamlandı" },
  { key: "CANCELLED", label: "İptal" },
];

export default function OrdersListPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [filter, setFilter] = useState<Status>("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  const filtered = MOCK_ORDERS.filter(o => {
    if (filter !== "ALL" && o.status !== filter) return false;
    if (search && !o.title.toLowerCase().includes(search.toLowerCase()) && !o.category.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    ALL: MOCK_ORDERS.length,
    WAITING_BIDS: MOCK_ORDERS.filter(o => o.status === "WAITING_BIDS").length,
    IN_PRODUCTION: MOCK_ORDERS.filter(o => o.status === "IN_PRODUCTION").length,
    SHIPPED: MOCK_ORDERS.filter(o => o.status === "SHIPPED").length,
    COMPLETED: MOCK_ORDERS.filter(o => o.status === "COMPLETED").length,
    CANCELLED: MOCK_ORDERS.filter(o => o.status === "CANCELLED").length,
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Siparişlerim</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Tüm aktif ve geçmiş iş talepleriniz.</p>
        </div>
        <Link
          href="/dashboard/orders/new"
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 text-sm"
        >
          <Plus size={16} /> Yeni İş Talebi
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Toplam Sipariş", value: MOCK_ORDERS.length, icon: <Package size={18} />, color: "text-blue-500" },
          { label: "Aktif İşler", value: MOCK_ORDERS.filter(o => o.status === "IN_PRODUCTION" || o.status === "WAITING_BIDS").length, icon: <Clock size={18} />, color: "text-amber-500" },
          { label: "Teslim Edildi", value: MOCK_ORDERS.filter(o => o.status === "COMPLETED").length, icon: <CheckCircle size={18} />, color: "text-emerald-500" },
          { label: "Toplam Harcama", value: "₺22,700", icon: <Package size={18} />, color: "text-orange-500" },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 flex items-center gap-3">
            <div className={`${s.color} opacity-80`}>{s.icon}</div>
            <div>
              <div className="text-xl font-black text-slate-900 dark:text-white">{s.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs + Search */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-2 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="flex gap-1 overflow-x-auto no-scrollbar flex-1">
          {FILTER_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                filter === tab.key
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {tab.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${filter === tab.key ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}`}>
                {counts[tab.key]}
              </span>
            </button>
          ))}
        </div>
        <div className="relative sm:w-52 flex-shrink-0">
          <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Sipariş ara..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-all"
          />
        </div>
      </div>

      {/* Orders Table / Cards */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div className="text-5xl mb-4">📦</div>
          <h3 className="font-bold text-slate-900 dark:text-white">Sipariş bulunamadı</h3>
          <p className="text-slate-400 text-sm mt-1">Filtrelerinizi değiştirin veya yeni bir iş talebi oluşturun.</p>
          <Link href="/dashboard/orders/new" className="mt-5 inline-flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-600 transition-all">
            <Plus size={14} /> Yeni İş Talebi
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 dark:border-slate-800">
                  {["İş Tanımı", "Kategori", "Tarih", "Durum", "Tutar", ""].map(h => (
                    <th key={h} className="px-5 py-3.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {filtered.map(order => {
                  const st = STATUS_MAP[order.status];
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-orange-500 transition-colors">{order.title}</div>
                          {order.urgent && <span className="text-[9px] px-1.5 py-0.5 bg-red-100 dark:bg-red-500/10 text-red-500 dark:text-red-400 font-black rounded-md border border-red-200 dark:border-red-500/20">ACİL</span>}
                        </div>
                        <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{order.lab !== "—" ? `🔬 ${order.lab}` : `${order.bids} teklif bekleniyor`}</div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg">{order.category}</span>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">{order.date}</td>
                      <td className="px-5 py-4">
                        <span className={`flex items-center gap-1 w-fit px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${st.color}`}>
                          {st.icon} {st.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-bold text-slate-900 dark:text-white text-sm">{order.price}</td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <Link href={`/dashboard/orders/${order.id}`} className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-lg transition-all" title="Detay">
                            <Eye size={15} />
                          </Link>
                          <Link href={`/dashboard/messages`} className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-all" title="Mesaj">
                            <MessageSquare size={15} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-slate-50 dark:divide-slate-800/50">
            {filtered.map(order => {
              const st = STATUS_MAP[order.status];
              return (
                <div key={order.id} className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm">{order.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{order.date}</div>
                    </div>
                    <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${st.color}`}>
                      {st.icon} {st.label}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black text-slate-900 dark:text-white">{order.price}</span>
                    <Link href={`/dashboard/orders/${order.id}`} className="text-xs font-bold text-orange-500 hover:underline">
                      Detay →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
