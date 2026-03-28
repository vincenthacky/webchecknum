"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { ROUTES } from "@/constants";

const NAV_LINKS = [
  { href: ROUTES.front.verifier, label: "Vérifier" },
  { href: ROUTES.front.signaler, label: "Signaler" },
  { href: ROUTES.front.certifier, label: "Se certifier" },
  { href: ROUTES.front.revendication, label: "Revendication" },
];

export function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, clearAuth } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    clearAuth();
    setMenuOpen(false);
    router.push(ROUTES.front.home);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="mx-auto flex h-16 items-center justify-between px-4 md:px-8" style={{ maxWidth: 1180 }}>

        {/* Logo */}
        <Link href={ROUTES.front.home} className="flex items-center gap-2">
          <div className="relative w-9 h-6">
            <Image src="/images/logo.png" alt="NumCheck" fill sizes="36px" style={{ objectFit: "contain" }} unoptimized />
          </div>
          <span className="font-extrabold text-lg text-gray-900 tracking-tight">NumCheck</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-orange-50 text-orange-600"
                  : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link
                href={ROUTES.front.profil}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">
                  {user?.nom?.charAt(0).toUpperCase()}
                </div>
                {user?.nom}
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                href={ROUTES.front.connexion}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Se connecter
              </Link>
              <Link
                href={ROUTES.front.inscription}
                className="px-4 py-2 rounded-full text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors"
              >
                S&apos;inscrire
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l10 10M16 6l-10 10" />
            </svg>
          ) : (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h14M4 11h14M4 16h14" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-orange-50 text-orange-600"
                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-2">
            {isAuthenticated ? (
              <>
                <Link
                  href={ROUTES.front.profil}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold">
                    {user?.nom?.charAt(0).toUpperCase()}
                  </div>
                  Mon profil
                </Link>
                <Link
                  href={ROUTES.front.mesSignalements}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 block"
                >
                  Mes signalements
                </Link>
                <Link
                  href={ROUTES.front.mesCertifications}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 block"
                >
                  Mes certifications
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href={ROUTES.front.connexion}
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Se connecter
                </Link>
                <Link
                  href={ROUTES.front.inscription}
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600"
                >
                  S&apos;inscrire
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
