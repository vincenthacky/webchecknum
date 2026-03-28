// ── Types alignés sur l'API Flutter/Backend ─────────────────────────────────

// Admin user (back office)
export type UserRole = "admin" | "moderateur";
export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: UserRole;
  actif: boolean;
  createdAt: string;
}

// Front office user (app mobile)
export interface FrontUser {
  id: number;
  nom: string;
  num: string;
  role: string;
  has_password: boolean;
}

// Recherche numéro
export type NumeroEtat =
  | "inconnu"
  | "arnaqueur_verifie"
  | "arnaqueur_en_attente"
  | "certifie_verifie"
  | "certifie_en_attente";

export interface ArnaqueItem {
  id: number;
  description: string;
  categorie: string;
  canal: string;
  plaignant: string;
}

export interface NumeroResult {
  num: string;
  etat: NumeroEtat;
  message: string;
  totalSignalements: number;
  arnaques: ArnaqueItem[];
}

// Signalement
export type SignalementStatut = "valide" | "rejete" | "en_attente";

export interface MonSignalement {
  id: number;
  description: string;
  statut: SignalementStatut;
  num: string;
  categorie: string;
  canal: string;
}

export interface Categorie {
  id: number;
  libelle: string;
}

export interface Canal {
  id: number;
  libelle: string;
}

// Certification / Soumission
export type SoumissionStatut = "verifie" | "en_attente" | "rejete";

export interface Soumission {
  id: number;
  id_num: number;
  num: string;
  fiabilite: string;
  statut_numero: SoumissionStatut;
  date_de_soumission: string;
}

// Legacy — garde la compatibilité back office
export type NumeroStatut = "safe" | "suspect" | "danger" | "certifie" | "inconnu";
export interface Numero {
  id: string;
  numero: string;
  indicatif: string;
  statut: NumeroStatut;
  score: number;
  nombreSignalements: number;
  createdAt: string;
  updatedAt: string;
}

export type SignalementType = "arnaque" | "spam" | "phishing" | "harcelement" | "autre";
export interface Signalement {
  id: string;
  numero: string;
  type: SignalementType;
  description: string;
  statut: SignalementStatut;
  signalePar?: string;
  validePar?: string;
  createdAt: string;
  updatedAt: string;
}

export type CertificationStatut = "en_attente" | "approuvee" | "refusee" | "expiree";
export interface Certification {
  id: string;
  numero: string;
  entreprise: string;
  contact: string;
  statut: CertificationStatut;
  validePar?: string;
  dateExpiration?: string;
  createdAt: string;
  updatedAt: string;
}
