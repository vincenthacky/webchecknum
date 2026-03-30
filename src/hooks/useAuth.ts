"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { authService } from "@/features/auth/services/auth.service";
import { ROUTES } from "@/constants";

export function useAuth(requireAuth = false) {
  const router = useRouter();
  const { user, isAuthenticated, _hasHydrated, setAuth, clearAuth } = useAuthStore();

  useEffect(() => {
    // Attendre que Zustand ait fini de lire localStorage avant de rediriger
    if (!_hasHydrated) return;
    if (requireAuth && !isAuthenticated) {
      router.replace(ROUTES.front.connexion);
    }
  }, [requireAuth, isAuthenticated, _hasHydrated, router]);

  const login = async (num: string, motdepasse: string) => {
    const data = await authService.login(num, motdepasse);
    setAuth(data.user, data.token);
  };

  const register = async (nom: string, num: string, motdepasse: string) => {
    await authService.register(nom, num, motdepasse);
    const data = await authService.login(num, motdepasse);
    setAuth(data.user, data.token);
  };

  const logout = () => {
    clearAuth();
    router.push(ROUTES.front.home);
  };

  return { user, isAuthenticated, hydrated: _hasHydrated, login, register, logout };
}
