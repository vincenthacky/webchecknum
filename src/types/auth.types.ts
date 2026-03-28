export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface AuthSession {
  user: {
    id: string;
    email: string;
    nom: string;
    prenom: string;
    role: string;
  };
  accessToken: string;
}
