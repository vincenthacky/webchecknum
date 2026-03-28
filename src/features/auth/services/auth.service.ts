import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { FrontUser } from "@/types/models.types";

interface LoginResponse {
  token: string;
  user: FrontUser;
}

export const authService = {
  async login(num: string, motdepasse: string): Promise<LoginResponse> {
    const res = await apiClient.post(ENDPOINTS.auth.login, { num, motdepasse });
    const { data } = res.data;
    return { token: data.token, user: data.user };
  },

  async register(nom: string, num: string, motdepasse: string): Promise<void> {
    await apiClient.post(ENDPOINTS.auth.register, { nom, num, motdepasse });
  },
};
