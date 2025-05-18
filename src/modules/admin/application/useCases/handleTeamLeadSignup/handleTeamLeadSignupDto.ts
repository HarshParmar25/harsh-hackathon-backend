import { ActivationStatus } from "../../../../users/domain/interfaces/interfaces";

export interface HandleTeamLeadSignupDto {
  memberId: number;
  status: ActivationStatus;
}

export interface HandleTeamLeadSignupResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  imageUrl?: string;
  isActive: boolean;
  activationStatus: string;
}
