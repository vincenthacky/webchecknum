export const ENDPOINTS = {
  // Auth utilisateurs front
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    social: "/auth/social",
  },
  // Recherche numéro
  numeros: {
    rechercher: (num: string) => `/numeros/rechercher/${num}`,
  },
  // Signalements
  arnaques: {
    create: "/arnaques",
    mes: "/arnaques/mes-signalements",
  },
  // Catégories & canaux
  categories: "/categories",
  canaux: "/canaux",
  // Certifications / soumissions
  soumissions: {
    create: "/soumissions",
    mes: "/soumissions/mes-soumissions",
  },
  // Profil
  profil: {
    motDePasse: "/users/moi/motdepasse",
    num: "/users/moi/num",
  },
  // Back office admin (conservés)
  admin: {
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
  },
} as const;
