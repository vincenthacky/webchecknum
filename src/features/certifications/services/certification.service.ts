import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { Soumission } from "@/types/models.types";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { Certification, CertificationFilters } from "../types";

export const certificationService = {
  async soumettre(num: string): Promise<void> {
    await apiClient.post(ENDPOINTS.soumissions.create, { num });
  },

  async mesSoumissions(): Promise<Soumission[]> {
    const res = await apiClient.get(ENDPOINTS.soumissions.mes);
    return res.data.data ?? [];
  },

  // Admin methods
  getAll: (filters?: CertificationFilters) =>
    apiClient.get<PaginatedResponse<Certification>>(ENDPOINTS.admin.certifications.base, { params: filters }),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Certification>>(ENDPOINTS.admin.certifications.detail(id)),

  approuver: (id: string) =>
    apiClient.patch<ApiResponse<Certification>>(ENDPOINTS.admin.certifications.approuver(id)),

  refuser: (id: string) =>
    apiClient.patch<ApiResponse<Certification>>(ENDPOINTS.admin.certifications.refuser(id)),
};
