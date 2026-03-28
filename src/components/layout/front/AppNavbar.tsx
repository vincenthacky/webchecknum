"use client";

import { useState, useEffect } from "react";
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

// Orange-tinted frosted glass — utilisé sur landing ET pages app
const SCROLLED_BG = "rgba(249, 115, 22, 0.10)";
const SCROLLED_BORDER = "rgba(249, 115, 22, 0.20)";
const SCROLLED_SHADOW = "0 2px 12px rgba(249, 115, 22, 0.10)";

interface AppNavbarProps {
  /** heroMode = positionné fixed, texte blanc au sommet (landing page) */
  heroMode?: boolean;
}

export function AppNavbar({ heroMode = false }: AppNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, clearAuth } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    clearAuth();
    setMenuOpen(false);
    router.push(ROUTES.front.home);
  };

  const isActive = (href: string) => pathname === href;

  // En heroMode au sommet : transparent total, texte blanc
  // Sinon (scrollé ou pages app) : orange-frosted
  const atHeroTop = heroMode && !scrolled;

  const containerStyle: React.CSSProperties = {
    position: heroMode ? "fixed" : "sticky",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    width: "100%",
    transition: "background 0.25s ease, backdrop-filter 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
    background: atHeroTop ? "transparent" : SCROLLED_BG,
    backdropFilter: atHeroTop ? "none" : "blur(16px)",
    WebkitBackdropFilter: atHeroTop ? "none" : "blur(16px)",
    borderBottom: `1px solid ${atHeroTop ? "transparent" : SCROLLED_BORDER}`,
    boxShadow: atHeroTop ? "none" : SCROLLED_SHADOW,
  };

  const textColor = atHeroTop ? "#fff" : "#111827";
  const mutedColor = atHeroTop ? "rgba(255,255,255,0.75)" : "#6b7280";
  const activeBg = atHeroTop ? "rgba(255,255,255,0.15)" : "rgba(249,115,22,0.12)";
  const activeText = atHeroTop ? "#fff" : "#ea580c";
  const hoverBg = atHeroTop ? "rgba(255,255,255,0.1)" : "rgba(249,115,22,0.08)";

  return (
    <header style={containerStyle}>
      <div
        className="mx-auto flex items-center justify-between px-4 md:px-8"
        style={{ maxWidth: 1180, height: 70 }}
      >
        {/* Logo */}
        <Link href={ROUTES.front.home} className="flex items-center gap-2 shrink-0">
          <div className="relative" style={{ width: 56, height: 38 }}>
            <Image
              src="/images/logo.png"
              alt="NumCheck"
              fill
              sizes="56px"
              style={{ objectFit: "contain" }}
              unoptimized
            />
          </div>
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: textColor,
              transition: "color 0.25s ease",
            }}
          >
            NumCheck
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                transition: "background 0.15s, color 0.15s",
                background: isActive(link.href) ? activeBg : "transparent",
                color: isActive(link.href) ? activeText : mutedColor,
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.href)) {
                  (e.currentTarget as HTMLAnchorElement).style.background = hoverBg;
                  (e.currentTarget as HTMLAnchorElement).style.color = textColor;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.href)) {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = mutedColor;
                }
              }}
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
                className="flex items-center gap-2"
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 500,
                  transition: "background 0.15s, color 0.15s",
                  background: "transparent",
                  color: textColor,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = hoverBg;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: atHeroTop ? "#fff" : "#F97316",
                    color: atHeroTop ? "#F97316" : "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 800,
                    flexShrink: 0,
                    transition: "background 0.25s, color 0.25s",
                  }}
                >
                  {user?.nom?.charAt(0).toUpperCase()}
                </span>
                <span style={{ color: textColor, transition: "color 0.25s" }}>
                  {user?.nom}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 500,
                  background: "transparent",
                  color: atHeroTop ? "rgba(255,255,255,0.8)" : "#ef4444",
                  transition: "background 0.15s, color 0.25s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = atHeroTop
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(239,68,68,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                href={ROUTES.front.connexion}
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 500,
                  color: mutedColor,
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = hoverBg;
                  (e.currentTarget as HTMLAnchorElement).style.color = textColor;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = mutedColor;
                }}
              >
                Se connecter
              </Link>
              <Link
                href={ROUTES.front.inscription}
                style={{
                  padding: "7px 18px",
                  borderRadius: 999,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  transition: "background 0.15s, color 0.15s",
                  background: atHeroTop ? "#fff" : "#F97316",
                  color: atHeroTop ? "#F97316" : "#fff",
                }}
              >
                S&apos;inscrire
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg transition-colors"
          style={{ color: textColor }}
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
        <div
          style={{
            background: "rgba(255,250,247,0.97)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderTop: `1px solid ${SCROLLED_BORDER}`,
          }}
          className="md:hidden px-4 py-4 flex flex-col gap-1"
        >
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

          <div className="border-t border-orange-100 mt-2 pt-2">
            {isAuthenticated ? (
              <>
                <Link
                  href={ROUTES.front.profil}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-orange-50"
                >
                  <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold">
                    {user?.nom?.charAt(0).toUpperCase()}
                  </div>
                  Mon profil
                </Link>
                <Link href={ROUTES.front.mesSignalements} onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-orange-50 block">
                  Mes signalements
                </Link>
                <Link href={ROUTES.front.mesCertifications} onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-orange-50 block">
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
                <Link href={ROUTES.front.connexion} onClick={() => setMenuOpen(false)} className="w-full text-center py-3 rounded-xl text-sm font-semibold border border-orange-200 text-orange-700 hover:bg-orange-50">
                  Se connecter
                </Link>
                <Link href={ROUTES.front.inscription} onClick={() => setMenuOpen(false)} className="w-full text-center py-3 rounded-xl text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600">
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
