export const ENDPOINTS = {
  // Auth utilisateurs front
  auth: {
    login: "/auth/login",
    register: "/auth/register",
  },

  // Recherche numéro (public)
  numeros: {
    rechercher: (num: string) => `/numeros/rechercher/${num}`,
  },

  // Signalements (front users)
  arnaques: {
    create: "/arnaques",
    mes: "/arnaques/mes-signalements",
  },

  // Catégories & canaux (public)
  categories: "/categories",
  canaux: "/canaux",

  // Certifications / soumissions (front users)
  soumissions: {
    create: "/soumissions",
    mes: "/soumissions/mes-soumissions",
  },

  // Profil
  profil: {
    motDePasse: "/users/moi/motdepasse",
  },

  // Administration (token admin requis)
  admin: {
    arnaques: {
      base: "/arnaques",
      detail: (id: string | number) => `/arnaques/${id}`,
      statut: (id: string | number) => `/arnaques/${id}/statut`,
    },
    soumissions: {
      base: "/soumissions",
    },
    numeros: {
      base: "/numeros",
      detail: (id: string | number) => `/numeros/${id}`,
    },
    users: {
      base: "/users",
      detail: (id: string | number) => `/users/${id}`,
    },
    categories: {
      base: "/categories",
      detail: (id: string | number) => `/categories/${id}`,
    },
    canaux: {
      base: "/canaux",
      detail: (id: string | number) => `/canaux/${id}`,
    },
  },
} as const;
