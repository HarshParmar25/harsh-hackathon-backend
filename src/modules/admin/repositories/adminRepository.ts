import { UserRole } from "../../users/domain/interfaces/interfaces";
import { User } from "../../users/domain/entities/user";

export interface IAdminRepository {
  getMembers(): Promise<User[]>;
  updateMemberRole(memberId: number, role: UserRole): Promise<boolean>;
  deleteMember(memberId: number): Promise<boolean>;
}
