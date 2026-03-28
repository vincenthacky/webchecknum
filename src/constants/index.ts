export const APP_NAME = "NumCheck";
export const APP_DESCRIPTION =
  "Application anti-arnaques téléphoniques en Côte d'Ivoire";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export const ROUTES = {
  front: {
    home: "/",
    verifier: "/verifier",
    telechargement: "/telechargement",
  },
  back: {
    dashboard: "/dashboard",
    signalements: "/signalements",
    signalement: (id: string) => `/signalements/${id}`,
    certifications: "/certifications",
    certification: (id: string) => `/certifications/${id}`,
    utilisateurs: "/utilisateurs",
  },
  auth: {
    login: "/auth/login",
  },
} as const;
