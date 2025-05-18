import { UserRole } from "../../users/domain/interfaces/interfaces";
import { User } from "../../users/domain/entities/user";
import { ActivationStatus } from "../../users/domain/interfaces/interfaces";

export interface IAdminRepository {
  getMembers(): Promise<User[]>;
  updateMemberRole(memberId: number, role: UserRole): Promise<boolean>;
  deleteMember(memberId: number): Promise<boolean>;
  handleTeamLeadSignup(memberId: number, status: ActivationStatus): Promise<User>;
  getPendingTeamLeadRequests(): Promise<User[]>;
}
