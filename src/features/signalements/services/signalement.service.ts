import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { Categorie, Canal, MonSignalement } from "@/types/models.types";

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
};
