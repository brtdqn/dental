"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import Link from "next/link";
import {
  ArrowLeft, Upload, X, FileText, Zap, Clock,
  ChevronRight, AlertCircle, Check
} from "lucide-react";
import api from "@/lib/api/axios";

const CATEGORIES = [
  { name: "Zirkonyum", icon: "💎", desc: "Tam veya parsiyel zirkonyum" },
  { name: "Emax & Porselen", icon: "🦷", desc: "Cam seramik restorasyonlar" },
  { name: "İmplant Üstü", icon: "🔩", desc: "İmplant destekli protez" },
  { name: "Lamine", icon: "✨", desc: "Estetik lamine veneer" },
  { name: "Ortodonti", icon: "📐", desc: "Braket ve aligner" },
  { name: "Gülüş Tasarımı", icon: "😁", desc: "Dijital smile design" },
  { name: "Gece Plağı", icon: "🌙", desc: "Bruksizm koruyucusu" },
  { name: "Cerrahi Guide", icon: "🎯", desc: "İmplant cerrahi rehberi" },
  { name: "Geçici Diş", icon: "⏱️", desc: "Provizyon restorasyon" },
  { name: "Wax-up", icon: "🖊️", desc: "Diagnostik mum modeli" },
];

const STEPS = ["Kategori", "Detaylar", "Dosyalar", "Özet"];

function StepBar({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {STEPS.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div className={`flex items-center gap-2 text-sm font-bold transition-all ${i < step ? "text-emerald-500" : i === step ? "text-orange-500" : "text-slate-400 dark:text-slate-600"}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
              i < step ? "bg-emerald-500 text-white" :
              i === step ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" :
              "bg-slate-100 dark:bg-slate-800 text-slate-400"
            }`}>
              {i < step ? <Check size={13} /> : i + 1}
            </div>
            <span className="hidden sm:block">{s}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-0.5 w-8 sm:w-16 transition-all ${i < step ? "bg-emerald-500" : "bg-slate-100 dark:bg-slate-800"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function NewOrderContent() {
  const { user } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const [form, setForm] = useState({
    category: "",
    description: "",
    toothNumbers: "",
    shade: "",
    deadline: "",
    urgency: "NORMAL",
    budget: "",
    producerId: searchParams.get("producerId") || "",
    notes: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  const addFiles = useCallback((newFiles: File[]) => {
    const allowed = newFiles.filter(f =>
      ["stl", "obj", "dcm", "jpg", "jpeg", "png", "pdf"].some(ext => f.name.toLowerCase().endsWith(ext))
    );
    if (allowed.length < newFiles.length) toast.error("Sadece STL, OBJ, DICOM, JPG, PNG ve PDF dosyaları yüklenebilir.");
    setFiles(prev => [...prev, ...allowed].slice(0, 5));
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(Array.from(e.dataTransfer.files));
  }, [addFiles]);

  if (!user) return null;

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      files.forEach(f => formData.append("files", f));
      await api.post("/orders", formData);
      toast.success("İş talebi oluşturuldu! Teklifler bekleniyor...");
      router.push("/dashboard/orders");
    } catch {
      // Demo mode
      toast.success("İş talebi oluşturuldu! (Demo modu)");
      setTimeout(() => router.push("/dashboard/orders"), 1000);
    } finally {
      setSubmitting(false);
    }
  };

  // ── STEP 0: Category ──
  if (step === 0) return (
    <div className="max-w-3xl mx-auto animate-fade-in pb-20">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/orders" className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
          <ArrowLeft size={18} className="text-slate-600 dark:text-slate-300" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Yeni İş Talebi</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Laboratuvarlara göndermek için iş talebinizi oluşturun.</p>
        </div>
      </div>
      <StepBar step={step} />
      <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4">Kategori Seçin</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {CATEGORIES.map(cat => (
          <button key={cat.name} onClick={() => { setForm({ ...form, category: cat.name }); setStep(1); }}
            className={`group flex flex-col items-center gap-2 p-4 rounded-2xl border-2 text-center transition-all hover:-translate-y-1 hover:shadow-lg ${
              form.category === cat.name
                ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10"
                : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-orange-300 dark:hover:border-orange-500/50"
            }`}>
            <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{cat.name}</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">{cat.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // ── STEP 1: Details ──
  if (step === 1) return (
    <div className="max-w-2xl mx-auto animate-fade-in pb-20">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setStep(0)} className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
          <ArrowLeft size={18} className="text-slate-600 dark:text-slate-300" />
        </button>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">İş Detayları</h1>
      </div>
      <StepBar step={step} />

      {/* Category Badge */}
      <div className="flex items-center gap-2 mb-6 p-3 bg-orange-50 dark:bg-orange-500/10 rounded-xl border border-orange-100 dark:border-orange-500/20 w-fit">
        <span className="text-xl">{CATEGORIES.find(c => c.name === form.category)?.icon}</span>
        <span className="font-bold text-orange-600 dark:text-orange-400 text-sm">{form.category}</span>
        <button onClick={() => setStep(0)} className="text-slate-400 hover:text-slate-600 ml-1"><X size={14} /></button>
      </div>

      <div className="space-y-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
        {/* Urgency */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Aciliyet</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: "NORMAL", label: "Normal", icon: <Clock size={16} />, desc: "5-7 iş günü", color: "blue" },
              { val: "URGENT", label: "Acil", icon: <Zap size={16} />, desc: "24-48 saat", color: "orange" },
            ].map(opt => (
              <button key={opt.val} onClick={() => setForm({ ...form, urgency: opt.val })}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                  form.urgency === opt.val
                    ? opt.color === "orange"
                      ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10"
                      : "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
                    : "border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600"
                }`}>
                <div className={form.urgency === opt.val ? (opt.color === "orange" ? "text-orange-500" : "text-blue-500") : "text-slate-400"}>
                  {opt.icon}
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{opt.label}</div>
                  <div className="text-xs text-slate-400">{opt.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tooth Numbers */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Diş Numaraları</label>
          <input value={form.toothNumbers} onChange={e => setForm({ ...form, toothNumbers: e.target.value })}
            placeholder="Örn: 14, 15, 16" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all" />
        </div>

        {/* Shade */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Renk (Shade)</label>
          <input value={form.shade} onChange={e => setForm({ ...form, shade: e.target.value })}
            placeholder="Örn: A2, A3, BL2..." className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all" />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">İş Açıklaması <span className="text-red-500">*</span></label>
          <textarea required rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder="Dişeti formunu, bağlantı tipi, malzeme tercihleri gibi teknik detayları belirtin..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all resize-none" />
        </div>

        {/* Deadline + Budget */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Teslim Tarihi</label>
            <input type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Bütçe (₺)</label>
            <input type="number" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}
              placeholder="0" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all" />
          </div>
        </div>

        <button onClick={() => {
          if (!form.description.trim()) { toast.error("İş açıklaması gerekli."); return; }
          setStep(2);
        }} className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20">
          Devam Et <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );

  // ── STEP 2: Files ──
  if (step === 2) return (
    <div className="max-w-2xl mx-auto animate-fade-in pb-20">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setStep(1)} className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
          <ArrowLeft size={18} className="text-slate-600 dark:text-slate-300" />
        </button>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Dosya Yükleme</h1>
      </div>
      <StepBar step={step} />

      <div className="space-y-5">
        {/* Drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
            dragOver ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10 scale-[1.01]" : "border-slate-200 dark:border-slate-700 hover:border-orange-400 dark:hover:border-orange-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50"
          }`}
        >
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all ${dragOver ? "bg-orange-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}>
            <Upload size={28} />
          </div>
          <h3 className="font-black text-slate-900 dark:text-white mb-1">Dosyaları Sürükle & Bırak</h3>
          <p className="text-sm text-slate-400 dark:text-slate-500 mb-3">veya dosya seçmek için tıkla</p>
          <div className="flex gap-2 justify-center flex-wrap">
            {["STL", "OBJ", "DICOM", "JPG", "PNG", "PDF"].map(ext => (
              <span key={ext} className="text-[10px] font-black px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full">{ext}</span>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-2">Maks. 5 dosya, her biri 50MB</p>
          <input ref={fileInputRef} type="file" multiple accept=".stl,.obj,.dcm,.jpg,.jpeg,.png,.pdf" onChange={e => addFiles(Array.from(e.target.files || []))} className="hidden" />
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, i) => (
              <div key={i} className="flex items-center gap-3 p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 bg-orange-50 dark:bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500 flex-shrink-0">
                  <FileText size={16} />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="font-bold text-slate-900 dark:text-white text-sm truncate">{file.name}</div>
                  <div className="text-xs text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
                <button onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {files.length === 0 && (
          <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-500/10 rounded-xl border border-amber-100 dark:border-amber-500/20">
            <AlertCircle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-700 dark:text-amber-400">STL/OBJ dosyanız yoksa laboratuvar ek bilgi isteyebilir. Yine de devam edebilirsiniz.</p>
          </div>
        )}

        <button onClick={() => setStep(3)} className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20">
          {files.length > 0 ? `${files.length} Dosyayla Devam Et` : "Dosyasız Devam Et"} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );

  // ── STEP 3: Summary ──
  return (
    <div className="max-w-2xl mx-auto animate-fade-in pb-20">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setStep(2)} className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
          <ArrowLeft size={18} className="text-slate-600 dark:text-slate-300" />
        </button>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Talebi Gözden Geçir</h1>
      </div>
      <StepBar step={step} />

      <div className="space-y-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-4">
          <h3 className="font-black text-slate-900 dark:text-white border-b border-slate-50 dark:border-slate-800 pb-3">Sipariş Özeti</h3>
          {[
            { label: "Kategori", value: form.category },
            { label: "Diş Numaraları", value: form.toothNumbers || "—" },
            { label: "Renk", value: form.shade || "—" },
            { label: "Aciliyet", value: form.urgency === "URGENT" ? "⚡ Acil" : "Normal" },
            { label: "Teslim Tarihi", value: form.deadline || "Belirtilmedi" },
            { label: "Bütçe", value: form.budget ? `₺${Number(form.budget).toLocaleString("tr-TR")}` : "Belirtilmedi" },
          ].map((row, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">{row.label}</span>
              <span className="font-bold text-slate-900 dark:text-white">{row.value}</span>
            </div>
          ))}
          <div className="pt-3 border-t border-slate-50 dark:border-slate-800">
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Açıklama</div>
            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{form.description}</div>
          </div>
          {files.length > 0 && (
            <div className="pt-3 border-t border-slate-50 dark:border-slate-800">
              <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">Yüklenen Dosyalar ({files.length})</div>
              <div className="space-y-1">
                {files.map((f, i) => (
                  <div key={i} className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <FileText size={11} className="text-orange-500" /> {f.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl border border-emerald-100 dark:border-emerald-500/20 p-4 flex gap-3">
          <Check size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-emerald-700 dark:text-emerald-400">
            Talebiniz onaylandıktan sonra laboratuvarlar 1-4 saat içinde teklif gönderecektir. Teklifleri karşılaştırarak uygun olanı seçebilirsiniz.
          </p>
        </div>

        <button onClick={handleSubmit} disabled={submitting}
          className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-4 rounded-xl font-black text-base transition-all shadow-xl shadow-orange-500/25 hover:-translate-y-0.5">
          {submitting ? "Gönderiliyor..." : "İş Talebini Gönder 🚀"}
        </button>
      </div>
    </div>
  );
}

export default function NewOrderPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center text-slate-500 dark:text-slate-400">
        <div className="w-8 h-8 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mb-3"></div>
        <p className="font-medium text-sm">Sayfa yükleniyor...</p>
      </div>
    }>
      <NewOrderContent />
    </Suspense>
  );
}
