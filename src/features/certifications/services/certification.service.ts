import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { Soumission } from "@/types/models.types";

export const certificationService = {
  async soumettre(num: string): Promise<void> {
    await apiClient.post(ENDPOINTS.soumissions.create, { num });
  },

  async mesSoumissions(): Promise<Soumission[]> {
    const res = await apiClient.get(ENDPOINTS.soumissions.mes);
    return res.data.data ?? [];
  },
};
