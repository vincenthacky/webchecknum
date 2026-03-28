import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { certificationService } from "../services/certification.service";
import type { CertificationFilters } from "../types";

export const CERTIFICATIONS_KEY = "certifications";

export function useCertifications(filters?: CertificationFilters) {
  return useQuery({
    queryKey: [CERTIFICATIONS_KEY, filters],
    queryFn: () => certificationService.getAll(filters).then((r) => r.data),
  });
}

export function useCertification(id: string) {
  return useQuery({
    queryKey: [CERTIFICATIONS_KEY, id],
    queryFn: () => certificationService.getById(id).then((r) => r.data),
    enabled: !!id,
  });
}

export function useApprouverCertification() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => certificationService.approuver(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [CERTIFICATIONS_KEY] }),
  });
}

export function useRefuserCertification() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => certificationService.refuser(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [CERTIFICATIONS_KEY] }),
  });
}
