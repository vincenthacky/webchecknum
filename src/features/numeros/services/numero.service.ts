import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { NumeroResult } from "@/types/models.types";

export const numeroService = {
  async rechercher(num: string): Promise<NumeroResult> {
    const res = await apiClient.get(ENDPOINTS.numeros.rechercher(num));
    const { etat, message, data } = res.data;
    return {
      num,
      etat,
      message,
      totalSignalements: data?.numero?.total_signalements ?? 0,
      arnaques: data?.arnaques ?? [],
    };
  },

  // Alias kept for back-office hook compatibility
  verifier(num: string) {
    return this.rechercher(num).then((data) => ({ data }));
  },
};
