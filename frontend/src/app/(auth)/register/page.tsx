"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api/axios";
import { useAuthStore } from "@/store/useAuthStore";

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    role: "CUSTOMER",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");
  
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/register", form);
      setRegisteredEmail(response.data.email);
      setIsVerifying(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Kayıt sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/verify", { email: registeredEmail, code: verificationCode });
      setAuth(response.data.user, response.data.access_token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Doğrulama kodu hatalı.");
    } finally {
      setLoading(false);
    }
  };

  if (isVerifying) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 animate-fade-in">
        <div className="mb-8 text-center">
          <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-100">
            <span className="text-white font-bold text-xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">E-posta Onayı</h1>
          <p className="text-slate-500 text-sm mt-2">{registeredEmail} adresine gönderilen 6 haneli kodu giriniz.</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              maxLength={6}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-slate-50 text-center font-bold text-2xl tracking-[0.5em]"
              placeholder="000000"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-3.5 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            {loading ? "Doğrulanıyor..." : "Hesabı Onayla"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
      <div className="mb-8 text-center">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-100">
          <span className="text-white font-bold text-xl">D</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Aramıza Katılın</h1>
        <p className="text-slate-500 text-sm mt-2">Hızlıca hesabınızı oluşturun</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-2xl border border-slate-100">
          <button
            type="button"
            onClick={() => setForm({ ...form, role: "CUSTOMER" })}
            className={`py-2 px-4 rounded-xl text-sm font-bold transition-all ${
              form.role === "CUSTOMER" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Diş Hekimi
          </button>
          <button
            type="button"
            onClick={() => setForm({ ...form, role: "PRODUCER" })}
            className={`py-2 px-4 rounded-xl text-sm font-bold transition-all ${
              form.role === "PRODUCER" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Teknisyen
          </button>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1">Ad Soyad / Klinik Adı</label>
          <input
            type="text"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-slate-100/50"
            placeholder="Dr. Ahmet Yılmaz"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1">E-posta</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-slate-100/50"
            placeholder="örnek@klinik.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1">Şifre</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            minLength={6}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-slate-100/50"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white py-3.5 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          {loading ? "Hesap Oluşturuluyor..." : "Ücretsiz Kaydol"}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-slate-100 text-center">
        <p className="text-sm text-slate-500">
          Zaten hesabınız var mı?{" "}
          <Link href="/login" className="text-blue-600 font-bold hover:underline">
            Giriş Yapın
          </Link>
        </p>
      </div>
    </div>
  );
}
