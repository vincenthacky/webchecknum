import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FrontUser } from "@/types/models.types";

interface AuthState {
  user: FrontUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: FrontUser, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setAuth: (user, accessToken) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("numcheck_token", accessToken);
        }
        set({ user, accessToken, isAuthenticated: true });
      },
      clearAuth: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("numcheck_token");
        }
        set({ user: null, accessToken: null, isAuthenticated: false });
      },
    }),
    {
      name: "numcheck-auth",
    },
  ),
);
