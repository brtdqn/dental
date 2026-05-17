"use client";

import Link from "next/link";

const MOCK_ORDERS = [
  { id: "1", title: "Zirkonyum Kaplama #4821", date: "12.05.2026", status: "Üretimde", price: "₺4,500", clinic: "Dr. Selin Kaya" },
  { id: "2", title: "Emax Kron #4822", date: "14.05.2026", status: "Teklif Bekliyor", price: "---", clinic: "Dr. Selin Kaya" },
  { id: "3", title: "İmplant Üstü Protez #4823", date: "15.05.2026", status: "Kargoda", price: "₺12,000", clinic: "Dr. Selin Kaya" },
];

const STATUS_COLORS: Record<string, string> = {
  "Üretimde": "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "Teklif Bekliyor": "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Kargoda": "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Tamamlandı": "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
};

export default function OrdersListPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 transition-colors">Siparişlerim</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 transition-colors">Tüm aktif ve geçmiş iş talepleriniz.</p>
        </div>
        <Link href="/dashboard/orders/new" className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2">
          <span>+</span> Yeni İş Talebi
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 transition-colors">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">İş Tanımı</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tarih</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Durum</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tutar</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Aksiyon</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {MOCK_ORDERS.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                <td className="px-6 py-5">
                  <div className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{order.title}</div>
                  <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{order.clinic}</div>
                </td>
                <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">{order.date}</td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${STATUS_COLORS[order.status] || "bg-slate-100 dark:bg-slate-800"}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm font-bold text-slate-900 dark:text-slate-100">{order.price}</td>
                <td className="px-6 py-5">
                  <Link href={`/dashboard/orders/${order.id}`} className="text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all inline-block">
                    👁️
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {MOCK_ORDERS.length === 0 && (
          <div className="p-20 text-center">
             <div className="text-4xl mb-4 text-slate-200 dark:text-slate-700">📦</div>
             <p className="text-slate-500 dark:text-slate-400 font-medium">Henüz bir siparişiniz bulunmuyor.</p>
          </div>
        )}
      </div>
    </div>
  );
}
