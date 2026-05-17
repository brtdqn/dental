import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
              <span className="text-white font-black text-sm">D</span>
            </div>
            <span className="font-black text-lg">dental<span className="text-orange-400">pazar</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Özellikler</a>
            <a href="#how" className="hover:text-white transition-colors">Nasıl Çalışır</a>
            <a href="#labs" className="hover:text-white transition-colors">Laboratuvarlar</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-bold text-slate-300 hover:text-white transition-colors px-4 py-2">
              Giriş Yap
            </Link>
            <Link href="/register" className="text-sm font-black bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl transition-all shadow-lg shadow-orange-500/20 hover:-translate-y-0.5">
              Ücretsiz Başla
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 px-6">
        {/* BG decorations */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-xs font-black uppercase tracking-widest mb-8">
            🇹🇷 Türkiye&apos;nin #1 Dental Marketplace&apos;i
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-6">
            Diş Laboratuvarı<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-500">
              İşlerini Kolaylaştır
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            1,240+ onaylı laboratuvardan anlık teklif alın. STL dosyanızı yükleyin,
            en uygun fiyatı seçin, güvenle ödeme yapın.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/register" className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-black text-base transition-all shadow-2xl shadow-orange-500/30 hover:-translate-y-1">
              Ücretsiz Hesap Aç →
            </Link>
            <Link href="/dashboard" className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold text-base transition-all">
              Demo&apos;yu Dene
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { val: "1,240+", label: "Onaylı Lab" },
              { val: "8,500+", label: "Tamamlanan İş" },
              { val: "98%", label: "Memnuniyet" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black text-white">{s.val}</div>
                <div className="text-slate-500 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual - Dashboard preview mockup */}
        <div className="max-w-5xl mx-auto mt-16 relative">
          <div className="bg-gradient-to-b from-slate-800/60 to-slate-900/60 border border-white/10 rounded-3xl p-1 shadow-2xl backdrop-blur-sm">
            <div className="bg-slate-900 rounded-2xl overflow-hidden">
              {/* Fake browser bar */}
              <div className="h-10 bg-slate-800/80 flex items-center px-4 gap-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                </div>
                <div className="flex-1 mx-4 h-5 bg-slate-700/60 rounded-md flex items-center px-3">
                  <span className="text-slate-400 text-[10px]">dentalpazar.com/dashboard</span>
                </div>
              </div>
              {/* Mock dashboard content */}
              <div className="p-6 space-y-4">
                <div className="h-32 bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl flex items-center px-8 gap-6">
                  <div className="space-y-2">
                    <div className="h-3 w-32 bg-white/10 rounded-full" />
                    <div className="h-6 w-48 bg-orange-500/30 rounded-full" />
                    <div className="h-3 w-24 bg-white/5 rounded-full" />
                    <div className="h-8 w-28 bg-orange-500/40 rounded-xl mt-2" />
                  </div>
                  <div className="ml-auto text-7xl opacity-10">🦷</div>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-16 bg-slate-800/60 rounded-xl flex items-center px-3 gap-3">
                      <div className="w-8 h-8 bg-orange-500/20 rounded-lg" />
                      <div className="space-y-1">
                        <div className="h-3 w-12 bg-white/20 rounded-full" />
                        <div className="h-2 w-8 bg-white/10 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-8 gap-2">
                  {[1,2,3,4,5,6,7,8].map(i => (
                    <div key={i} className="h-20 bg-slate-800/40 rounded-xl flex flex-col items-center justify-center gap-1 p-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500/30 to-blue-500/20 rounded-lg" />
                      <div className="h-2 w-10 bg-white/10 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Glow */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-orange-500/20 blur-3xl rounded-full" />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Her Şey Tek Platformda</h2>
            <p className="text-slate-400 text-lg">Diş hekimliği pratiğinizin laboratuvar süreçlerini dijitalleştirin.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "🔍", title: "Akıllı Lab Arama", desc: "Uzaklık, fiyat, uzmanlık ve teslim süresine göre filtreleme yapın. 1,240+ laboratuvar tek ekranda.", color: "from-blue-500/20 to-blue-600/10" },
              { icon: "⚡", title: "Anlık Teklif Al", desc: "STL dosyanızı yükleyin, dakikalar içinde birden fazla laboratuvardan rekabetçi teklifler alın.", color: "from-orange-500/20 to-yellow-600/10" },
              { icon: "🛡️", title: "Güvenli Ödeme", desc: "Emanet ödeme sistemi ile paranız laboratuvara sadece iş teslim edildiğinde aktarılır.", color: "from-emerald-500/20 to-teal-600/10" },
              { icon: "📦", title: "Gerçek Zamanlı Takip", desc: "Siparişinizin üretim, kalite kontrol ve kargo aşamalarını anlık olarak izleyin.", color: "from-purple-500/20 to-violet-600/10" },
              { icon: "💬", title: "Entegre Mesajlaşma", desc: "Laboratuvar teknisyenleriyle sipariş bazlı sohbet edin. Dosya ve görsel paylaşın.", color: "from-pink-500/20 to-rose-600/10" },
              { icon: "📊", title: "İş Analitiği", desc: "Aylık harcama, sipariş sayısı ve laboratuvar performansını raporlayın.", color: "from-cyan-500/20 to-sky-600/10" },
            ].map((f, i) => (
              <div key={i} className={`bg-gradient-to-br ${f.color} border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-1 transition-all group`}>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{f.icon}</div>
                <h3 className="font-black text-white text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">3 Adımda Başla</h2>
            <p className="text-slate-400">Kayıt olmadan 5 dakika içinde ilk teklifinizi alın.</p>
          </div>
          <div className="space-y-6">
            {[
              { step: "01", icon: "📋", title: "İş Talebi Oluştur", desc: "Kategori seçin (Zirkonyum, Emax, İmplant Üstü vb.), diş numarasını, rengi ve açıklamayı girin. STL dosyanızı sürükleyip bırakın.", tag: "2 dakika" },
              { step: "02", icon: "💬", title: "Teklifleri Karşılaştır", desc: "Onaylı laboratuvarlar ortalama 2 saatte teklif gönderir. Fiyat, teslim süresi ve puanı karşılaştırın, en uygununu seçin.", tag: "Ortalama 2 saat" },
              { step: "03", icon: "✅", title: "Güvenle Öde & Teslim Al", desc: "Seçtiğiniz laboratuvar iş üretimine başlar. Siparişi anlık takip edin. Teslimatta memnuniyetinizi onaylayın, ödeme aktarılır.", tag: "Garantili" },
            ].map((s, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                  {i < 2 && <div className="w-px h-12 bg-gradient-to-b from-orange-500/30 to-transparent mt-2" />}
                </div>
                <div className="pt-2 pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-orange-400 font-black text-xs uppercase tracking-widest">{s.step}</span>
                    <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 font-bold">{s.tag}</span>
                  </div>
                  <h3 className="font-black text-white text-xl mb-2">{s.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Hekimler Ne Diyor?</h2>
            <div className="flex items-center justify-center gap-1 text-amber-400 mt-2">
              {"★★★★★"} <span className="text-slate-400 text-sm ml-2">4.9 / 5.0 · 1,240+ değerlendirme</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Dr. Ayşe Kaya", clinic: "Kaya Dental, İstanbul", text: "Platformdan önce laboratuvar bulmak için saatler harcıyordum. Artık 30 dakikada teklif alıp iş veriyorum. Zirkonyum kalitesi de gerçekten üst düzey.", avatar: "AK", rating: 5 },
              { name: "Dr. Mehmet Demir", clinic: "Demir Ağız Sağlığı, Ankara", text: "Emanet ödeme sistemi güvenimi kazandı. Laboratuvar işi bitirmeden para almıyor. Bu kadar basit ve güvenli bir sistem daha önce yoktu.", avatar: "MD", rating: 5 },
              { name: "Dr. Selin Arslan", clinic: "Arslan Diş, İzmir", text: "Acil vakalarım için 24 saatte teslim eden laboratuvar bulmak artık çok kolay. Gerçekten hayat kurtarıyor.", avatar: "SA", rating: 5 },
            ].map((t, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all hover:-translate-y-1">
                <div className="text-amber-400 text-sm mb-4">{"★".repeat(t.rating)}</div>
                <p className="text-slate-300 text-sm leading-relaxed mb-5 italic">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-white font-black text-xs flex-shrink-0">{t.avatar}</div>
                  <div>
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-slate-500 text-xs">{t.clinic}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-transparent border border-orange-500/20 rounded-3xl p-12 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-500/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-4">Hemen Başla</h2>
              <p className="text-slate-400 mb-8">Kayıt ücretsiz. Kredi kartı gerekmez. Dakikalar içinde ilk teklifinizi alın.</p>
              <Link href="/register" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-2xl shadow-orange-500/30 hover:-translate-y-1">
                Ücretsiz Kaydol →
              </Link>
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500">
                <span>✓ Kredi kartı yok</span>
                <span>✓ Kurulum yok</span>
                <span>✓ Ücretsiz başlangıç</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xs">D</span>
            </div>
            <span className="font-black text-slate-400">dental<span className="text-orange-400">pazar</span></span>
          </div>
          <div className="flex gap-6 text-xs text-slate-500">
            <Link href="/login" className="hover:text-slate-300 transition-colors">Giriş Yap</Link>
            <Link href="/register" className="hover:text-slate-300 transition-colors">Kaydol</Link>
            <span>© 2026 DentalPazar. Tüm hakları saklıdır.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
