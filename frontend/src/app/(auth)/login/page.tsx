"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api/axios";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", { email, password });
      setAuth(response.data.user, response.data.access_token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Giriş yapılamadı. Bilgilerinizi kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setAuth(
      { id: "demo-id", email: "demo@displatform.com", role: "CUSTOMER" },
      "mock-demo-token"
    );
    router.push("/dashboard");
  };

  const handleAdminDemoLogin = () => {
    setAuth(
      { id: "admin-demo", email: "admin@dentalpazar.com", role: "ADMIN" },
      "mock-admin-token"
    );
    router.push("/admin");
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 animate-fade-in">
      <div className="mb-8 text-center">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-100 dark:shadow-blue-900/20">
          <span className="text-white font-bold text-xl">D</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Hoş Geldiniz</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Devam etmek için giriş yapın</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium animate-shake">
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">E-posta</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100/50 dark:hover:bg-slate-700/50"
            placeholder="örnek@klinik.com"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Şifre</label>
            <Link href="/forgot-password" className="text-xs text-blue-600 font-bold hover:underline">Şifremi Unuttum</Link>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100/50 dark:hover:bg-slate-700/50"
            placeholder="••••••••"
          />
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3.5 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
          
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white py-3.5 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            🚀 Demo Modu ile Gir (Hekim)
          </button>
          <button
            type="button"
            onClick={handleAdminDemoLogin}
            className="w-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 py-3.5 rounded-2xl font-bold hover:bg-red-100 dark:hover:bg-red-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            🛡️ Admin Paneli Demo
          </button>
        </div>
      </form>

      <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Hesabınız yok mu?{" "}
          <Link href="/register" className="text-blue-600 font-bold hover:underline">
            Hemen Kaydolun
          </Link>
        </p>
      </div>
    </div>
  );
}
