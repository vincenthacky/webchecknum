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

export type SignalementStatut = "en_attente" | "valide" | "rejete";
export type SignalementType =
  | "arnaque"
  | "spam"
  | "phishing"
  | "harcelement"
  | "autre";

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
