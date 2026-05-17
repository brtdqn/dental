import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">DIS Platform</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="#features" className="hover:text-blue-600 transition-colors">Özellikler</Link>
            <Link href="#how-it-works" className="hover:text-blue-600 transition-colors">Nasıl Çalışır?</Link>
            <Link href="#technicians" className="hover:text-blue-600 transition-colors">Teknisyenler</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Giriş Yap</Link>
            <Link href="/register" className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95">
              Hemen Başla
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow pt-16">
        <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-48">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]" />
            <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-teal-50/50 rounded-full blur-[100px]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              YENİ NESİL DİŞ TEKNOLOJİSİ
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              Diş Hekimleri ve <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                Teknisyenleri Buluşturan
              </span> <br />
              Dijital Köprü.
            </h1>
            <p className="max-w-2xl mx-auto text-lg lg:text-xl text-slate-600 mb-10 leading-relaxed">
              Zirkonyumdan implant üstü protezlere, tüm dental işlerinizi tek bir platformdan yönetin. 
              Hızlı teklif alın, iş süreçlerini anlık takip edin ve 3D önizleme ile kaliteyi yakalayın.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl active:scale-95">
                Klinik Olarak Kaydol
              </Link>
              <Link href="/register?role=producer" className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-sm hover:shadow-md active:scale-95">
                Laboratuvar Olarak Katıl
              </Link>
            </div>

            {/* Dashboard Mockup Preview */}
            <div className="mt-20 relative max-w-5xl mx-auto group">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-transparent blur-3xl opacity-50 -z-10 group-hover:opacity-70 transition-opacity duration-1000" />
              <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden aspect-[16/9] flex items-center justify-center p-4">
                 {/* Placeholder for 3D Viewer or Dashboard UI */}
                 <div className="w-full h-full bg-slate-50 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                        </svg>
                    </div>
                    <div className="text-slate-400 font-medium">3D STL Önizleme Deneyimi</div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Neden DIS Platform?</h2>
                    <p className="text-slate-600 max-w-xl mx-auto">Modern diş teknisyenliği için gereken tüm araçlar tek bir profesyonel çatıda toplandı.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Escrow Ödeme", desc: "Ödemeniz iş tamamlanana kadar güvende kalır. Hak ediş anında teknisyene aktarılır.", icon: "🔒" },
                        { title: "Exocad Desteği", desc: "STL ve OBJ dosyalarınızı tarayıcıda 3 boyutlu olarak inceleyin, hatasız üretim yapın.", icon: "🦷" },
                        { title: "Gerçek Zamanlı Takip", desc: "İşin her aşamasında (Üretimde, Kargoda vb.) anlık bildirimler alın.", icon: "⚡" }
                    ].map((f, i) => (
                        <div key={i} className="p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300">
                            <div className="text-4xl mb-4">{f.icon}</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{f.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">D</span>
                </div>
                <span className="text-white font-bold tracking-tight">DIS Platform</span>
            </div>
            <div className="text-sm">© 2026 DIS Platform. Tüm hakları saklıdır.</div>
            <div className="flex gap-6 text-sm underline-offset-4">
                <Link href="#" className="hover:text-white underline">KVKK</Link>
                <Link href="#" className="hover:text-white underline">Kullanım Koşulları</Link>
            </div>
        </div>
      </footer>
    </div>
  );
}
