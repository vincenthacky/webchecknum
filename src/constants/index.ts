export const APP_NAME = "NumCheck";
export const APP_DESCRIPTION =
  "Application anti-arnaques téléphoniques en Côte d'Ivoire";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://192.168.252.83:3003/api";

export const ROUTES = {
  front: {
    home: "/",
    verifier: "/verifier",
    signaler: "/signaler",
    certifier: "/certifier",
    mesSignalements: "/mes-signalements",
    mesCertifications: "/mes-certifications",
    profil: "/profil",
    connexion: "/connexion",
    inscription: "/inscription",
    revendication: "/revendication",
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
