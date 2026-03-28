import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

export const profilService = {
  async changerMotDePasse(payload: {
    ancien?: string;
    nouveau: string;
  }): Promise<void> {
    await apiClient.put(ENDPOINTS.profil.motDePasse, payload);
  },
};
