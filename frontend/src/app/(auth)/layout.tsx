import Link from "next/link";

const FEATURES = [
  { icon: "🦷", title: "1,240+ Onaylı Laboratuvar", desc: "Türkiye'nin dört bir yanından sertifikalı lab'lar" },
  { icon: "⚡", title: "Hızlı Teklif Sistemi", desc: "Ortalama 2 saatte teklif alın" },
  { icon: "🛡️", title: "Güvenli Ödeme", desc: "İş teslim edilene kadar ödeme bekleme" },
  { icon: "📦", title: "Anlık Takip", desc: "Sipariş durumunu canlı izleyin" },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors">
      {/* Left: Brand Panel */}
      <div className="hidden lg:flex lg:w-[55%] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex-col justify-between p-12 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[320px] opacity-[0.03] pointer-events-none select-none">🦷</div>

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 w-fit">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <span className="text-white font-black text-lg">D</span>
            </div>
            <span className="text-white font-black text-xl">dental<span className="text-orange-400">pazar</span></span>
          </Link>
        </div>

        {/* Main copy */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-400 text-xs font-black uppercase tracking-widest">
              🇹🇷 Türkiye&apos;nin Dental Marketplace&apos;i
            </div>
            <h1 className="text-4xl font-black text-white leading-tight">
              Dijital Diş Laboratuvarı<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
                Deneyimi Başlıyor
              </span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Onaylı laboratuvarlardan anında teklif alın, işlerinizi takip edin ve güvenle ödeyin.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/10 transition-all">
                <div className="text-2xl mb-2">{f.icon}</div>
                <div className="font-bold text-white text-sm mb-1">{f.title}</div>
                <div className="text-slate-400 text-xs leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-10 flex gap-8 pt-8 border-t border-white/10">
          {[
            { val: "1,240+", label: "Aktif Lab" },
            { val: "8,500+", label: "Tamamlanan İş" },
            { val: "3,200+", label: "Kayıtlı Hekim" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-2xl font-black text-white">{s.val}</div>
              <div className="text-slate-400 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Auth Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Link href="/" className="flex items-center gap-3 w-fit">
            <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <span className="text-white font-black">D</span>
            </div>
            <span className="text-slate-900 dark:text-white font-black text-lg">dental<span className="text-orange-500">pazar</span></span>
          </Link>
        </div>

        <div className="w-full max-w-md">
          {children}
        </div>

        <p className="mt-8 text-xs text-slate-400 dark:text-slate-600 text-center max-w-xs">
          Giriş yaparak <span className="text-slate-500 dark:text-slate-500 font-semibold">Kullanım Koşulları</span> ve{" "}
          <span className="text-slate-500 dark:text-slate-500 font-semibold">Gizlilik Politikası</span>&apos;nı kabul etmiş sayılırsınız.
        </p>
      </div>
    </div>
  );
}
