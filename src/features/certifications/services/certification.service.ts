import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { Certification } from "@/types/models.types";
import type { CertificationFilters, CreateCertificationDto } from "../types";

export const certificationService = {
  getAll: (filters?: CertificationFilters) =>
    apiClient.get<PaginatedResponse<Certification>>(
      ENDPOINTS.certifications.base,
      { params: filters },
    ),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Certification>>(
      ENDPOINTS.certifications.detail(id),
    ),

  create: (data: CreateCertificationDto) =>
    apiClient.post<ApiResponse<Certification>>(
      ENDPOINTS.certifications.base,
      data,
    ),

  approuver: (id: string) =>
    apiClient.patch<ApiResponse<Certification>>(
      ENDPOINTS.certifications.approuver(id),
    ),

  refuser: (id: string) =>
    apiClient.patch<ApiResponse<Certification>>(
      ENDPOINTS.certifications.refuser(id),
    ),
};
