"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

const CATEGORIES = [
  "Zirkonyum", "Emax", "Full Denture", "İmplant Üstü", "Ortodonti", 
  "Gece Plağı", "Wax-up", "Dijital Tasarım", "Modelleme", "Cerrahi Guide", "Geçici Diş"
];

export default function NewOrderPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [form, setForm] = useState({
    category: "",
    description: "",
    deadline: "",
    urgency: "NORMAL",
    budget: "",
  });
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would use FormData to upload files + JSON
    alert("Sipariş oluşturma demosu: Dosyalar ve veriler hazır!");
    router.push("/dashboard/orders");
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">Yeni İş Talebi Oluştur</h1>
        <p className="text-slate-500 mt-1">Laboratuvarlara göndermek üzere teknik detayları girin.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">İş Kategorisi</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setForm({ ...form, category: cat })}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all border ${
                      form.category === cat 
                        ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100" 
                        : "bg-white border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Özel Açıklama ve Notlar</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50"
                placeholder="Diş numarası, renk kodu, özel istekler..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">İstenen Teslim Tarihi</label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Tahmini Bütçe (Opsiyonel)</label>
                <input
                  type="number"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50"
                  placeholder="₺"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
             <label className="text-sm font-bold text-slate-700 ml-1 block mb-4">Dijital Dosyalar (STL, OBJ, JPG)</label>
             <div className="border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 hover:border-blue-400 transition-colors bg-slate-50/50 cursor-pointer relative group">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-bold text-slate-900">Dosyaları Sürükle veya Seç</p>
                  <p className="text-sm text-slate-500 mt-1">Exocad veya tarayıcı çıktılarını buraya yükleyin.</p>
                </div>
             </div>
             {files.length > 0 && (
               <div className="mt-6 space-y-2">
                 {files.map((f, i) => (
                   <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                     <div className="flex items-center gap-3">
                       <span className="text-lg">📄</span>
                       <span className="text-sm font-medium text-slate-700">{f.name}</span>
                     </div>
                     <span className="text-xs text-slate-400">{(f.size / 1024).toFixed(1)} KB</span>
                   </div>
                 ))}
               </div>
             )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-6 sticky top-24">
            <h3 className="text-xl font-bold border-b border-white/10 pb-4">Özet</h3>
            <div className="space-y-3">
               <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Kategori:</span>
                  <span className="font-bold">{form.category || "Seçilmedi"}</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Aciliyet:</span>
                  <span className="font-bold text-amber-400">{form.urgency}</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Dosya Sayısı:</span>
                  <span className="font-bold">{files.length}</span>
               </div>
            </div>
            
            <div className="pt-4 space-y-4">
              <button
                type="submit"
                disabled={!form.category}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-50"
              >
                Talebi Yayınla
              </button>
              <p className="text-[10px] text-center text-slate-500 leading-tight">
                Talebi yayınladığınızda teknisyenler teklif vermeye başlayacaktır.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
