"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  AlertTriangle,
  BadgeCheck,
  Smartphone,
  Users,
  Tag,
  Radio,
  LogOut,
  X,
} from "lucide-react";
import { ROUTES, APP_NAME } from "@/constants";

const mainNav = [
  { href: ROUTES.back.dashboard, label: "Dashboard", icon: LayoutDashboard },
  { href: ROUTES.back.signalements, label: "Signalements", icon: AlertTriangle },
  { href: ROUTES.back.certifications, label: "Certifications", icon: BadgeCheck },
  // { href: ROUTES.back.numeros, label: "Numéros", icon: Smartphone },
  { href: ROUTES.back.utilisateurs, label: "Utilisateurs", icon: Users },
];

const configNav = [
  { href: ROUTES.back.categories, label: "Catégories", icon: Tag },
  { href: ROUTES.back.canaux, label: "Canaux", icon: Radio },
];

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const adminName = session?.user?.name ?? "Admin";

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="flex flex-col w-64 bg-gray-900 text-white min-h-screen shrink-0">
      {/* Header */}
      <div className="px-5 py-5 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
            <Image
              src="/images/logo.png"
              alt={APP_NAME}
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div>
            <span className="font-extrabold text-white text-base leading-none">{APP_NAME}</span>
            <span className="block text-xs text-gray-400 mt-0.5">Administration</span>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="md:hidden p-1 rounded-lg hover:bg-gray-800">
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {mainNav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive(href)
                ? "bg-orange-500 text-white shadow-sm"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        ))}

        {/* Divider - Référentiels */}
        <div className="pt-4 pb-2 px-3">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Référentiels
          </span>
        </div>

        {configNav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive(href)
                ? "bg-orange-500 text-white shadow-sm"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      {/* User + Déconnexion */}
      <div className="px-3 py-4 border-t border-gray-800 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-white">
              {adminName.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-sm text-gray-300 font-medium truncate">{adminName}</span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: `${window.location.origin}${ROUTES.auth.login}` })}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-all"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
