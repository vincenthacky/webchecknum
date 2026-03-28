import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { User } from "@/types/models.types";
import type { CreateUserDto, UserFilters } from "../types";

export const utilisateurService = {
  getAll: (filters?: UserFilters) =>
    apiClient.get<PaginatedResponse<User>>(ENDPOINTS.admin.utilisateurs.base, {
      params: filters,
    }),

  getById: (id: string) =>
    apiClient.get<ApiResponse<User>>(ENDPOINTS.admin.utilisateurs.detail(id)),

  create: (data: CreateUserDto) =>
    apiClient.post<ApiResponse<User>>(ENDPOINTS.admin.utilisateurs.base, data),

  update: (id: string, data: Partial<CreateUserDto>) =>
    apiClient.patch<ApiResponse<User>>(ENDPOINTS.admin.utilisateurs.detail(id), data),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<void>>(ENDPOINTS.admin.utilisateurs.detail(id)),
};
