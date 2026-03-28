import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { utilisateurService } from "../services/utilisateur.service";
import type { UserFilters, CreateUserDto } from "../types";

export const UTILISATEURS_KEY = "utilisateurs";

export function useUtilisateurs(filters?: UserFilters) {
  return useQuery({
    queryKey: [UTILISATEURS_KEY, filters],
    queryFn: () => utilisateurService.getAll(filters).then((r) => r.data),
  });
}

export function useCreateUtilisateur() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserDto) => utilisateurService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [UTILISATEURS_KEY] }),
  });
}

export function useDeleteUtilisateur() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => utilisateurService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [UTILISATEURS_KEY] }),
  });
}
