import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { Signalement } from "@/types/models.types";
import type {
  CreateSignalementDto,
  SignalementFilters,
  UpdateSignalementStatutDto,
} from "../types";

export const signalementService = {
  getAll: (filters?: SignalementFilters) =>
    apiClient.get<PaginatedResponse<Signalement>>(ENDPOINTS.signalements.base, {
      params: filters,
    }),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Signalement>>(ENDPOINTS.signalements.detail(id)),

  create: (data: CreateSignalementDto) =>
    apiClient.post<ApiResponse<Signalement>>(ENDPOINTS.signalements.base, data),

  valider: (id: string, data?: UpdateSignalementStatutDto) =>
    apiClient.patch<ApiResponse<Signalement>>(
      ENDPOINTS.signalements.valider(id),
      data,
    ),

  rejeter: (id: string, data?: UpdateSignalementStatutDto) =>
    apiClient.patch<ApiResponse<Signalement>>(
      ENDPOINTS.signalements.rejeter(id),
      data,
    ),
};
