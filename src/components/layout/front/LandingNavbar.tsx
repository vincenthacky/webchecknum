"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { ROUTES } from "@/constants";

export function LandingNavbar() {
  const router = useRouter();
  const { isAuthenticated, user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    router.refresh();
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {isAuthenticated ? (
        <>
          <Link
            href={ROUTES.front.profil}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              padding: "7px 16px",
              borderRadius: 999,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{
              width: 24, height: 24, borderRadius: "50%",
              backgroundColor: "#fff", color: "#F97316",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 800, flexShrink: 0,
            }}>
              {user?.nom?.charAt(0).toUpperCase()}
            </span>
            {user?.nom?.split(" ")[0]}
          </Link>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "rgba(255,255,255,0.12)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              padding: "7px 16px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Déconnexion
          </button>
        </>
      ) : (
        <Link
          href={ROUTES.front.connexion}
          style={{
            backgroundColor: "#fff",
            color: "#111827",
            fontSize: 13,
            fontWeight: 600,
            padding: "7px 20px",
            borderRadius: 999,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Se connecter
        </Link>
      )}
    </div>
  );
}
