"use client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg" />
          <span className="font-black tracking-tighter text-xl">DIS ADMIN</span>
        </div>
        <nav className="flex-grow px-4 space-y-1">
          {[
            { name: "Panel", icon: "🏠", href: "/admin/dashboard" },
            { name: "Kullanıcılar", icon: "👥", href: "/admin/users" },
            { name: "Lab Onayları", icon: "✅", href: "/admin/approvals" },
            { name: "Finans", icon: "💰", href: "/admin/finance" },
            { name: "Ayarlar", icon: "⚙️", href: "/admin/settings" },
          ].map((item) => (
            <a key={item.name} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-400 hover:bg-white/5 hover:text-white transition-all">
              <span>{item.icon}</span>
              {item.name}
            </a>
          ))}
        </nav>
      </aside>
      <main className="flex-grow p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
