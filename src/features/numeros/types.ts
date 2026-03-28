export type { Numero, NumeroStatut } from "@/types/models.types";

export interface VerifierNumeroDto {
  numero: string;
}

export interface NumeroVerificationResult {
  numero: string;
  statut: string;
  score: number;
  nombreSignalements: number;
  estCertifie: boolean;
  details?: string;
}
