import { DatabaseManager } from "../../../../shared/database/DatabaseManager";
import { IProfileRepository } from "../../domain/repositories/profileRepository";
import { Profile } from "../../domain/entities/profile";
import { Kudos } from "../../../kudos/repositories/kudosRepository";
import { CreateUserMapper } from "../../../users/mappers/createUserMapper";
import { KudosMapper } from "../../../kudos/mappers/kudosMapper";
import { UserRole } from "../../../users/domain/interfaces/interfaces";

export class ProfileRepositoryImpl implements IProfileRepository {
  async findByUserId(userId: number): Promise<Profile | null> {
    // Get user info
    const userQuery = `
      SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL
    `;
    const userResult = await DatabaseManager.query(userQuery, [userId]);
    if (!userResult[0]) return null;

    const user = CreateUserMapper.toDomain(userResult[0]);

    // Get received kudos
    const receivedKudosQuery = `
      SELECT k.*, 
        u1.name as receiver_name, u1.image_url as receiver_image_url,
        u2.name as creator_name, u2.image_url as creator_image_url
      FROM kudos k
      LEFT JOIN users u1 ON k.user_id = u1.id
      LEFT JOIN users u2 ON k.created_by_user_id = u2.id
      WHERE k.user_id = $1 AND k.deleted_at IS NULL
    `;
    const receivedKudosResult = await DatabaseManager.query(receivedKudosQuery, [userId]);
    const receivedKudos = receivedKudosResult.map(KudosMapper.toDto);

    // If user is team lead, get created kudos
    let createdKudos: Kudos[] | undefined;
    if (user.getRole() === UserRole.TEAM_LEAD || user.getRole() === UserRole.ADMIN) {
      const createdKudosQuery = `
        SELECT k.*, 
          u1.name as receiver_name, u1.image_url as receiver_image_url,
          u2.name as creator_name, u2.image_url as creator_image_url
        FROM kudos k
        LEFT JOIN users u1 ON k.user_id = u1.id
        LEFT JOIN users u2 ON k.created_by_user_id = u2.id
        WHERE k.created_by_user_id = $1 AND k.deleted_at IS NULL
      `;
      const createdKudosResult = await DatabaseManager.query(createdKudosQuery, [userId]);
      createdKudos = createdKudosResult.map(KudosMapper.toDto);
    }

    return new Profile({
      user,
      receivedKudos,
      createdKudos,
    });
  }
}
