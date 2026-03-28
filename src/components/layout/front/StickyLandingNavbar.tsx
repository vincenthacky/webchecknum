"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { ROUTES } from "@/constants";

export function StickyLandingNavbar() {
  const router = useRouter();
  const { isAuthenticated, user, clearAuth } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    clearAuth();
    router.refresh();
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 72,
        transition: "background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        background: scrolled ? "rgba(255,255,255,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 6px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
        }}
      >
        {/* Logo */}
        <Link
          href={ROUTES.front.home}
          style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}
        >
          <div style={{ position: "relative", width: 80, height: 52 }}>
            <Image
              src="/images/logo.png"
              alt="NumCheck"
              fill
              sizes="80px"
              style={{ objectFit: "contain" }}
              unoptimized
            />
          </div>
          <span
            style={{
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: scrolled ? "#111827" : "#fff",
              transition: "color 0.25s ease",
            }}
          >
            NumCheck
          </span>
        </Link>

        {/* Auth buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {isAuthenticated ? (
            <>
              <Link
                href={ROUTES.front.profil}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "7px 16px",
                  borderRadius: 999,
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  transition: "background 0.2s, color 0.2s",
                  background: scrolled ? "#f3f4f6" : "rgba(255,255,255,0.18)",
                  color: scrolled ? "#111827" : "#fff",
                }}
              >
                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: scrolled ? "#F97316" : "#fff",
                    color: scrolled ? "#fff" : "#F97316",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 800,
                    flexShrink: 0,
                    transition: "background 0.2s, color 0.2s",
                  }}
                >
                  {user?.nom?.charAt(0).toUpperCase()}
                </span>
                {user?.nom?.split(" ")[0]}
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  padding: "7px 16px",
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  transition: "background 0.2s, color 0.2s",
                  background: scrolled ? "transparent" : "rgba(255,255,255,0.12)",
                  color: scrolled ? "#ef4444" : "#fff",
                }}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              href={ROUTES.front.connexion}
              style={{
                padding: "8px 22px",
                borderRadius: 999,
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 600,
                whiteSpace: "nowrap",
                transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
                background: scrolled ? "#F97316" : "#fff",
                color: scrolled ? "#fff" : "#111827",
                boxShadow: scrolled ? "0 1px 4px rgba(249,115,22,0.35)" : "none",
              }}
            >
              Se connecter
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
