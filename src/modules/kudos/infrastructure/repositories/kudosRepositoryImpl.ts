import { DatabaseManager } from "../../../../shared/database/DatabaseManager";
import { CreateKudosDto } from "../../application/use-cases/createKudos/createKudosDto";
import { KudosMapper } from "../../mappers/kudosMapper";
import { KudosWithUserMapper } from "../../mappers/kudosWithUserMapper";
import { IKudosRepository, Kudos, KudosWithUsers } from "../../repositories/kudosRepository";

export class KudosRepositoryImpl implements IKudosRepository {
  async create(data: CreateKudosDto): Promise<Kudos> {
    const query = `
      INSERT INTO kudos (user_id, created_by_user_id, team_name, category, message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [data.userId, data.createdByUserId, data.teamName, data.category, data.message];
    const result = await DatabaseManager.query(query, values);
    return KudosMapper.toDto(result[0]);
  }

  async findAllWithUsers(): Promise<KudosWithUsers[]> {
    const query = `
      SELECT 
        kudos.*,
        receiver.name as receiver_name,
        receiver.image_url as receiver_image_url,
        creator.name as creator_name,
        creator.image_url as creator_image_url
      FROM kudos 
      LEFT JOIN users receiver ON kudos.user_id = receiver.id
      LEFT JOIN users creator ON kudos.created_by_user_id = creator.id
      WHERE kudos.deleted_at IS NULL AND creator.deleted_at IS NULL AND receiver.deleted_at IS NULL
      ORDER BY kudos.created_at DESC
    `;
    const result = await DatabaseManager.query(query);
    return result.map(KudosWithUserMapper.toDto);
  }

  async findByUserIdWithUsers(userId: number): Promise<KudosWithUsers[]> {
    const query = `
      SELECT 
        kudos.*,
        receiver.name as receiver_name,
        receiver.image_url as receiver_image_url,
        creator.name as creator_name,
        creator.image_url as creator_image_url
      FROM kudos 
      LEFT JOIN users receiver ON kudos.user_id = receiver.id
      LEFT JOIN users creator ON kudos.created_by_user_id = creator.id
      WHERE kudos.user_id = $1 AND kudos.deleted_at IS NULL AND creator.deleted_at IS NULL AND receiver.deleted_at IS NULL
      ORDER BY kudos.created_at DESC
    `;
    const result = await DatabaseManager.query(query, [userId]);
    return result.map(KudosWithUserMapper.toDto);
  }
}
