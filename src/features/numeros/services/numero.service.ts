import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types/api.types";
import type { Numero } from "@/types/models.types";
import type { NumeroVerificationResult } from "../types";

export const numeroService = {
  verifier: (numero: string) =>
    apiClient.get<ApiResponse<NumeroVerificationResult>>(
      ENDPOINTS.numeros.verifier(numero),
    ),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Numero>>(ENDPOINTS.numeros.detail(id)),
};
