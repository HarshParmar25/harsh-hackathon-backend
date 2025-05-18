import { ActivationStatus } from "../../../../users/domain/interfaces/interfaces";

export interface GetPendingTeamLeadRequestsResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  imageUrl?: string;
  isActive: boolean;
  activationStatus: ActivationStatus;
}
