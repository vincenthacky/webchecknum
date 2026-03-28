export type { Certification, CertificationStatut } from "@/types/models.types";

export interface CreateCertificationDto {
  numero: string;
  entreprise: string;
  contact: string;
}

export interface CertificationFilters {
  statut?: string;
  page?: number;
  limit?: number;
}
