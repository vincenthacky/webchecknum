import { useQuery } from "@tanstack/react-query";
import { numeroService } from "../services/numero.service";

export const NUMEROS_KEY = "numeros";

export function useVerifierNumero(numero: string) {
  return useQuery({
    queryKey: [NUMEROS_KEY, "verifier", numero],
    queryFn: () => numeroService.verifier(numero).then((r) => r.data),
    enabled: !!numero && numero.length >= 8,
  });
}
