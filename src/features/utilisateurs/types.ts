export type { User, UserRole } from "@/types/models.types";

export interface CreateUserDto {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role: string;
}

export interface UserFilters {
  role?: string;
  actif?: boolean;
  page?: number;
  limit?: number;
}
