"use client";

import { useState } from "react";

const MOCK_USERS = [
  { id: "1", name: "Dr. Selin Kaya", email: "selin@klinik.com", role: "CUSTOMER", status: "Aktif", joinDate: "10.01.2026", orders: 24 },
  { id: "2", name: "Elite Dental Studio", email: "info@elitedental.com", role: "PRODUCER", status: "Onaylı", joinDate: "12.01.2026", orders: 156 },
  { id: "3", name: "Mehmet Demir", email: "mehmet@lab.com", role: "PRODUCER", status: "Beklemede", joinDate: "14.05.2026", orders: 0 },
  { id: "4", name: "Dr. Ahmet Yurt", email: "ahmet@dent.com", role: "CUSTOMER", status: "Pasif", joinDate: "05.02.2026", orders: 12 },
];

export default function AdminUsersPage() {
  const [filter, setFilter] = useState("ALL");

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight">Kullanıcı Yönetimi</h1>
           <p className="text-slate-500 font-medium mt-1">Tüm müşteri ve laboratuvar hesaplarını kontrol edin.</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
           + Yeni Kullanıcı Ekle
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex gap-4">
           {["ALL", "CUSTOMER", "PRODUCER"].map((f) => (
             <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                  filter === f ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                }`}
             >
                {f === "ALL" ? "Tümü" : f === "CUSTOMER" ? "Klinikler" : "Laboratuvarlar"}
             </button>
           ))}
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                <th className="px-8 py-5">Kullanıcı / Kurum</th>
                <th className="px-8 py-5">Rol</th>
                <th className="px-8 py-5">Durum</th>
                <th className="px-8 py-5">Kayıt Tarihi</th>
                <th className="px-8 py-5 text-right">Aksiyon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_USERS.filter(u => filter === "ALL" || u.role === filter).map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="font-bold text-slate-900">{user.name}</div>
                    <div className="text-xs text-slate-400">{user.email}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold ${
                      user.role === "CUSTOMER" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${
                         user.status === "Aktif" || user.status === "Onaylı" ? "bg-emerald-500" : "bg-amber-500"
                       }`} />
                       <span className="text-sm font-medium text-slate-700">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-500">{user.joinDate}</td>
                  <td className="px-8 py-6 text-right space-x-2">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">📝</button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">🚫</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
