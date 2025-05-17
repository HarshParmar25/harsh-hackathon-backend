export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  session: {
    token: string;
    expiresAt: Date;
  };
}
