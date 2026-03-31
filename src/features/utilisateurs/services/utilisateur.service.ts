// Service front-end utilisateur (profil, mot de passe)
// Les méthodes admin sont gérées directement dans les pages via createAdminAxios
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

export const utilisateurService = {
  changerMotDePasse: (ancien: string, nouveau: string) =>
    apiClient.put(ENDPOINTS.profil.motDePasse, { ancien, nouveau }),
};
