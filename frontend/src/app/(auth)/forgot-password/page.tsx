"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. (Demo modu - gerçek e-posta gönderimi için SMTP kurulumu gerekli)");
    router.push("/login");
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 animate-fade-in">
      <div className="mb-8 text-center">
        <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-100 dark:shadow-orange-900/20">
          <span className="text-white font-bold text-xl">🔑</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Şifremi Unuttum</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">E-posta adresinize sıfırlama bağlantısı göndereceğiz.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">E-posta Adresiniz</label>
          <input
            type="email"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            placeholder="örnek@klinik.com"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3.5 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg active:scale-95"
        >
          Sıfırlama Bağlantısı Gönder
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link href="/login" className="text-sm text-slate-500 dark:text-slate-400 hover:text-orange-500 transition-colors">
          ← Giriş sayfasına dön
        </Link>
      </div>
    </div>
  );
}
