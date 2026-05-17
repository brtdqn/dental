"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [ads, setAds] = useState<any[]>([]);
  const [form, setForm] = useState({ imageUrl: "", linkUrl: "", position: "RIGHT_SIDEBAR" });

  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      router.push("/dashboard");
    } else {
      fetchAds();
    }
  }, [user, router]);

  const fetchAds = async () => {
    try {
      const { data } = await api.get("/ads");
      setAds(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/ads", form);
      toast.success("Reklam eklendi.");
      setForm({ imageUrl: "", linkUrl: "", position: "RIGHT_SIDEBAR" });
      fetchAds();
    } catch (err) {
      toast.error("Reklam eklenirken hata oluştu.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/ads/${id}`);
      toast.success("Reklam silindi.");
      fetchAds();
    } catch (err) {
      toast.error("Hata oluştu.");
    }
  };

  if (!user || user.role !== "ADMIN") return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Admin Paneli</h1>
        <p className="text-slate-500 mt-1">Sistem ayarlarını ve reklamları yönetin.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
        <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Yeni Reklam Ekle</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Görsel URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Hedef Link URL"
            value={form.linkUrl}
            onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
          >
            <option value="RIGHT_SIDEBAR">Sağ Sidebar</option>
            <option value="LEFT_SIDEBAR">Sol Sidebar</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700">Ekle</button>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
        <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Aktif Reklamlar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ads.map((ad) => (
            <div key={ad.id} className="border border-slate-200 dark:border-slate-700 p-4 rounded-xl flex flex-col gap-4">
              <img src={ad.imageUrl} alt="Ad" className="w-full h-32 object-cover rounded-lg" />
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">{ad.position}</span>
                <button onClick={() => handleDelete(ad.id)} className="text-red-500 font-bold text-sm">Sil</button>
              </div>
            </div>
          ))}
          {ads.length === 0 && <p className="text-slate-500">Henüz reklam bulunmuyor.</p>}
        </div>
      </div>
    </div>
  );
}
