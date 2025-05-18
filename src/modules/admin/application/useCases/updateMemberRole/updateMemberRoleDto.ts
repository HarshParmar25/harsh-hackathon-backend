import { UserRole } from "../../../../users/domain/interfaces/interfaces";

export interface UpdateMemberRoleDto {
  memberId: number;
  role: UserRole;
}

export interface UpdateMemberRoleResponse {
  success: boolean;
  message: string;
}
