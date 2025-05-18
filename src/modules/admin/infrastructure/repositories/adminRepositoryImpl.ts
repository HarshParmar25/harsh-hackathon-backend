import { UserRole } from "../../../users/domain/interfaces/interfaces";
import { DatabaseManager } from "../../../../shared/database/DatabaseManager";
import { User } from "../../../users/domain/entities/user";
import { CreateUserMapper } from "../../../users/mappers/createUserMapper";
import { IAdminRepository } from "../../repositories/adminRepository";
import { ActivationStatus } from "../../../users/domain/interfaces/interfaces";

export class AdminRepositoryImpl implements IAdminRepository {
  async getMembers(): Promise<User[]> {
    const query = `
      SELECT * FROM users 
      WHERE deleted_at IS NULL 
      AND is_active = true
    `;
    const result = await DatabaseManager.query(query);
    return result.map((user: any) => CreateUserMapper.toDomain(user));
  }

  async updateMemberRole(memberId: number, role: UserRole): Promise<boolean> {
    const query = `
      UPDATE users 
      SET role = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2 AND deleted_at IS NULL
      RETURNING id
    `;
    const values = [role, memberId];
    const result = await DatabaseManager.query(query, values);

    if (!result[0]) {
      throw new Error("Member not found");
    }

    return true;
  }

  async deleteMember(memberId: number): Promise<boolean> {
    const query = `
      UPDATE users 
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE id = $1 AND deleted_at IS NULL
      RETURNING id
    `;
    const values = [memberId];
    const result = await DatabaseManager.query(query, values);

    if (!result[0]) {
      throw new Error("Member not found");
    }

    return true;
  }

  async handleTeamLeadSignup(memberId: number, status: ActivationStatus): Promise<User> {
    const query = `
      UPDATE users 
      SET activation_status = $1,
          is_active = $2,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $3 
        AND deleted_at IS NULL 
        AND role = 'team-lead'
        AND activation_status = 'pending'
      RETURNING *
    `;
    const values = [status, status === ActivationStatus.APPROVED, memberId];
    const result = await DatabaseManager.query(query, values);

    if (!result[0]) {
      throw new Error("Team lead not found or already processed");
    }

    return CreateUserMapper.toDomain(result[0]);
  }

  async getPendingTeamLeadRequests(): Promise<User[]> {
    const query = `
      SELECT * FROM users 
      WHERE deleted_at IS NULL 
      AND role = $1
      AND activation_status = $2
      ORDER BY created_at DESC
    `;
    const values = [UserRole.TEAM_LEAD, ActivationStatus.PENDING];
    const result = await DatabaseManager.query(query, values);
    return result.map((user: any) => CreateUserMapper.toDomain(user));
  }
}
