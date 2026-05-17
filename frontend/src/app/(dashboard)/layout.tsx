"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuthStore();
  const { notifications, connect, disconnect } = useNotificationStore();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      // Connect to notification socket
      const token = localStorage.getItem('auth-storage') 
        ? JSON.parse(localStorage.getItem('auth-storage')!).state.token 
        : null;
      if (token) {
        connect(token);
      }
    }
    return () => disconnect();
  }, [user, router, connect, disconnect]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">D</span>
          </div>
          <span className="font-bold text-slate-800 tracking-tight">DIS Dashboard</span>
        </div>
        
        <nav className="flex-grow p-4 space-y-1">
          {[
            { name: "Genel Bakış", href: "/dashboard", icon: "📊" },
            { name: "Siparişlerim", href: "/dashboard/orders", icon: "📦" },
            { name: "Laboratuvar Bul", href: "/dashboard/explore", icon: "🔍" },
            { name: "Mesajlar", href: "/dashboard/messages", icon: "💬" },
            { name: "Cüzdanım", href: "/dashboard/wallet", icon: "💳" },
            { name: "Profilim", href: "/dashboard/profile", icon: "👤" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all"
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all"
          >
            <span>🚪</span> Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="text-sm font-medium text-slate-500">
            Hoş geldin, <span className="text-slate-900 font-bold">{user.email}</span>
          </div>
          <div className="flex items-center gap-4 relative">
             <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-400 hover:text-blue-600 transition-colors relative"
             >
                🔔
                {notifications.length > 0 && (
                  <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
                )}
             </button>
             
             {showNotifications && (
               <div className="absolute top-12 right-0 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 py-4 z-50 animate-in fade-in slide-in-from-top-2">
                 <div className="px-6 pb-4 border-b border-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">Bildirimler</h3>
                    <span className="text-[10px] text-blue-600 font-bold cursor-pointer">Hepsini Oku</span>
                 </div>
                 <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? notifications.map((n) => (
                      <div key={n.id} className="px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0">
                         <div className="text-sm text-slate-700 leading-tight">{n.message}</div>
                         <div className="text-[10px] text-slate-400 font-bold mt-1 uppercase">AZ ÖNCE</div>
                      </div>
                    )) : (
                      <div className="py-10 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">Bildiriminiz Yok</div>
                    )}
                 </div>
               </div>
             )}

             <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-xs font-bold text-blue-600 uppercase">
                {user.email[0]}
             </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
