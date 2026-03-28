import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { signalementService } from "../services/signalement.service";
import type { SignalementFilters } from "../types";

export const SIGNALEMENTS_KEY = "signalements";

export function useSignalements(filters?: SignalementFilters) {
  return useQuery({
    queryKey: [SIGNALEMENTS_KEY, filters],
    queryFn: () => signalementService.getAll(filters).then((r) => r.data),
  });
}

export function useSignalement(id: string) {
  return useQuery({
    queryKey: [SIGNALEMENTS_KEY, id],
    queryFn: () => signalementService.getById(id).then((r) => r.data),
    enabled: !!id,
  });
}

export function useValiderSignalement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => signalementService.valider(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [SIGNALEMENTS_KEY] }),
  });
}

export function useRejeterSignalement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => signalementService.rejeter(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [SIGNALEMENTS_KEY] }),
  });
}
