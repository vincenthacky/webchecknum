import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { Categorie, Canal, MonSignalement, Signalement } from "@/types/models.types";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { SignalementFilters } from "../types";

export const signalementService = {
  async getCategories(): Promise<Categorie[]> {
    const res = await apiClient.get(ENDPOINTS.categories);
    return res.data.data ?? [];
  },

  async getCanaux(): Promise<Canal[]> {
    const res = await apiClient.get(ENDPOINTS.canaux);
    return res.data.data ?? [];
  },

  async publier(payload: {
    num: string;
    description: string;
    id_canal: number;
    id_categorie: number;
  }): Promise<void> {
    await apiClient.post(ENDPOINTS.arnaques.create, payload);
  },

  async mesSignalements(): Promise<MonSignalement[]> {
    const res = await apiClient.get(ENDPOINTS.arnaques.mes);
    return res.data.data ?? [];
  },

  // Admin methods
  getAll: (filters?: SignalementFilters) =>
    apiClient.get<PaginatedResponse<Signalement>>(ENDPOINTS.admin.signalements.base, { params: filters }),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Signalement>>(ENDPOINTS.admin.signalements.detail(id)),

  valider: (id: string) =>
    apiClient.patch<ApiResponse<Signalement>>(ENDPOINTS.admin.signalements.valider(id)),

  rejeter: (id: string) =>
    apiClient.patch<ApiResponse<Signalement>>(ENDPOINTS.admin.signalements.rejeter(id)),
};
