export interface SignupDTO {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface SignupResponse {
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
