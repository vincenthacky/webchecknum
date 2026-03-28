export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    me: "/auth/me",
  },
  numeros: {
    base: "/numeros",
    verifier: (numero: string) => `/numeros/verifier/${numero}`,
    detail: (id: string) => `/numeros/${id}`,
  },
  signalements: {
    base: "/signalements",
    detail: (id: string) => `/signalements/${id}`,
    valider: (id: string) => `/signalements/${id}/valider`,
    rejeter: (id: string) => `/signalements/${id}/rejeter`,
  },
  certifications: {
    base: "/certifications",
    detail: (id: string) => `/certifications/${id}`,
    approuver: (id: string) => `/certifications/${id}/approuver`,
    refuser: (id: string) => `/certifications/${id}/refuser`,
  },
  utilisateurs: {
    base: "/utilisateurs",
    detail: (id: string) => `/utilisateurs/${id}`,
  },
} as const;
