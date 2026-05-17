"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";
import { Search, ShoppingCart, User, Bell, Package, ChevronDown, Menu, LogOut, Wallet } from "lucide-react";

const CATEGORIES = [
  "Tüm Kategoriler",
  "Zirkonyum",
  "Emax & Porselen",
  "İmplant Üstü",
  "Lamine",
  "Ortodonti",
  "Hareketli Protez",
  "Dijital Gülüş",
  "Kampanyalar %",
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuthStore();
  const { notifications, connect, disconnect } = useNotificationStore();
  const router = useRouter();
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem('auth-storage') 
        ? JSON.parse(localStorage.getItem('auth-storage')!).state.token 
        : null;
      if (token) {
        connect(token);
      }
    }
    return () => disconnect();
  }, [user, connect, disconnect]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard/explore?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        
        {/* Main Navbar Row */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-4 md:gap-8">
          
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-xl">D</span>
            </div>
            <span className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white hidden sm:block">
              dental<span className="text-orange-500">pazar</span>
            </span>
          </Link>

          {/* Search Bar (E-commerce Style) */}
          <form onSubmit={handleSearch} className="flex-grow max-w-2xl relative hidden md:block">
            <input 
              type="text" 
              placeholder="Laboratuvar, teknisyen veya uzmanlık alanı arayın..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white pl-4 pr-12 py-3 rounded-xl border border-transparent focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
            />
            <button type="submit" className="absolute right-2 top-1.5 p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
               <Search size={18} />
            </button>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
             
             {/* Mobile Search Icon */}
             <button className="p-2 md:hidden text-slate-600 dark:text-slate-300">
               <Search size={24} />
             </button>

             <ThemeToggle />

             {user ? (
               <>
                 {/* Notifications */}
                 <div className="relative">
                   <button 
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all relative flex flex-col items-center gap-1 group"
                   >
                      <Bell size={20} className="group-hover:text-orange-500 transition-colors" />
                      {notifications.length > 0 && (
                        <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                          {notifications.length}
                        </span>
                      )}
                   </button>

                   {showNotifications && (
                     <div className="absolute top-14 right-0 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 py-2 z-50">
                       <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                          <h3 className="font-bold text-slate-900 dark:text-white">Bildirimler</h3>
                          <button onClick={() => toast.success("Okundu işaretlendi")} className="text-xs text-orange-500 font-bold hover:underline">Tümünü Oku</button>
                       </div>
                       <div className="max-h-80 overflow-y-auto">
                          {notifications.length > 0 ? notifications.map((n) => (
                            <div key={n.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer border-b border-slate-50 dark:border-slate-800/50">
                               <p className="text-sm text-slate-700 dark:text-slate-300">{n.message}</p>
                               <span className="text-[10px] text-slate-400 mt-1 block">Az önce</span>
                            </div>
                          )) : (
                            <div className="p-8 text-center text-slate-400 text-sm">Yeni bildirim yok</div>
                          )}
                       </div>
                     </div>
                   )}
                 </div>

                 {/* Orders */}
                 <Link href="/dashboard/orders" className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex flex-col items-center gap-0.5 group hidden sm:flex">
                    <Package size={20} className="group-hover:text-orange-500 transition-colors" />
                    <span className="text-[10px] font-bold">Siparişlerim</span>
                 </Link>

                 {/* Account Menu */}
                 <div className="relative">
                    <button 
                      onClick={() => setShowAccountMenu(!showAccountMenu)}
                      className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-2 group border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                    >
                       <User size={20} className="group-hover:text-orange-500 transition-colors" />
                       <div className="hidden lg:flex flex-col items-start text-left">
                          <span className="text-[10px] text-slate-400 font-bold leading-none">Giriş Yaptınız</span>
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate w-24 leading-tight">{user.email.split('@')[0]}</span>
                       </div>
                       <ChevronDown size={14} className="hidden lg:block text-slate-400" />
                    </button>

                    {showAccountMenu && (
                      <div className="absolute top-14 right-0 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 py-2 z-50">
                         <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 mb-2">
                            <div className="font-bold text-slate-900 dark:text-white truncate">{user.email}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{user.role}</div>
                         </div>
                         <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-orange-500">
                            <User size={16} /> Kullanıcı Bilgilerim
                         </Link>
                         <Link href="/dashboard/orders" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-orange-500 sm:hidden">
                            <Package size={16} /> Siparişlerim
                         </Link>
                         <Link href="/dashboard/wallet" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-orange-500">
                            <Wallet size={16} /> Cüzdanım
                         </Link>
                         <div className="border-t border-slate-100 dark:border-slate-800 mt-2 pt-2">
                            <button onClick={() => { logout(); router.push("/"); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10">
                               <LogOut size={16} /> Çıkış Yap
                            </button>
                         </div>
                      </div>
                    )}
                 </div>
                 
                 {/* New Order CTA */}
                 <Link href="/dashboard/orders/new" className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-0.5">
                    <ShoppingCart size={18} />
                    <span className="text-sm">Yeni İş</span>
                 </Link>
               </>
             ) : (
               <div className="flex items-center gap-2 md:gap-4 ml-2">
                 <Link href="/login" className="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-orange-500 transition-colors hidden sm:block">
                   Giriş Yap
                 </Link>
                 <Link href="/register" className="bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">
                   Üye Ol
                 </Link>
               </div>
             )}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="border-t border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md hidden md:block">
           <div className="max-w-[1400px] mx-auto px-8 flex items-center gap-8 overflow-x-auto no-scrollbar">
              {CATEGORIES.map((cat, i) => (
                <Link 
                  key={i} 
                  href={`/dashboard/explore?category=${cat}`}
                  className={`py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 hover:text-orange-500 ${i === 0 ? 'border-orange-500 text-orange-500' : 'border-transparent text-slate-600 dark:text-slate-400 hover:border-orange-300'}`}
                >
                   {cat}
                </Link>
              ))}
           </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-[1400px] w-full mx-auto p-4 md:p-8">
        {children}
      </main>

    </div>
  );
}
