import axios from "axios";
import { API_URL } from "@/constants";

/**
 * Crée un client Axios configuré avec le token admin NextAuth.
 * Utiliser dans les composants client avec : useMemo(() => createAdminAxios(token), [token])
 */
export function createAdminAxios(token: string) {
  return axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}
