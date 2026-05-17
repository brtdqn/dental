"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useCampaignStore } from "@/store/useCampaignStore";
import Link from "next/link";

const NAV_ITEMS = [
  { name: "Panel",        icon: "🏠", href: "/admin/dashboard" },
  { name: "Kullanıcılar", icon: "👥", href: "/admin/users" },
  { name: "Kampanyalar",  icon: "📢", href: "/admin/campaigns", badge: "pending" },
  { name: "Lab Onayları", icon: "✅", href: "/admin/approvals" },
  { name: "Finans",       icon: "💰", href: "/admin/finance" },
  { name: "Site Ayarları",icon: "⚙️", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const { getPendingCampaigns } = useCampaignStore();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    setPendingCount(getPendingCampaigns().length);
  }, [getPendingCampaigns]);

  // Redirect non-admins (except demo mode)
  useEffect(() => {
    if (user && user.role !== "ADMIN") {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex transition-colors">
      {/* ── Sidebar ── */}
      <aside className="w-60 bg-slate-900 text-white flex flex-col flex-shrink-0 sticky top-0 h-screen">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
            <span className="text-white font-black text-sm">D</span>
          </div>
          <div>
            <span className="font-black text-sm text-white">dental<span className="text-orange-400">pazar</span></span>
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Admin Panel</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-grow px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const badgeCount = item.badge === "pending" ? pendingCount : 0;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span className="flex-1">{item.name}</span>
                {badgeCount > 0 && (
                  <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                    {badgeCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
            <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
              <span className="text-red-400 text-xs font-black">A</span>
            </div>
            <div className="min-w-0">
              <div className="text-xs font-black text-white truncate">{user?.email?.split("@")[0] ?? "Admin"}</div>
              <div className="text-[10px] text-red-400 font-bold uppercase">Admin</div>
            </div>
          </div>
          <Link href="/dashboard" className="mt-2 block text-center text-xs text-slate-500 hover:text-slate-300 transition-colors py-1">
            ← Siteye Dön
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-grow overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
