"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  AlertTriangle,
  BadgeCheck,
  Users,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { APP_NAME, ROUTES } from "@/constants";

const navItems = [
  { href: ROUTES.back.dashboard, label: "Dashboard", icon: LayoutDashboard },
  { href: ROUTES.back.signalements, label: "Signalements", icon: AlertTriangle },
  { href: ROUTES.back.certifications, label: "Certifications", icon: BadgeCheck },
  { href: ROUTES.back.utilisateurs, label: "Utilisateurs", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-60 bg-gray-900 text-white min-h-screen shrink-0">
      <div className="px-6 py-5 border-b border-gray-700">
        <span className="font-bold text-green-400 text-lg">{APP_NAME}</span>
        <span className="block text-xs text-gray-400">Administration</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              pathname === href || pathname.startsWith(href + "/")
                ? "bg-green-700 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-gray-700">
        <button
          onClick={() => signOut({ callbackUrl: ROUTES.auth.login })}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
