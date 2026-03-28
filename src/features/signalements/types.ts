export type { Signalement, SignalementStatut, SignalementType } from "@/types/models.types";

export interface CreateSignalementDto {
  numero: string;
  type: string;
  description: string;
}

export interface UpdateSignalementStatutDto {
  statut: "valide" | "rejete";
  commentaire?: string;
}

export interface SignalementFilters {
  statut?: string;
  type?: string;
  page?: number;
  limit?: number;
}
