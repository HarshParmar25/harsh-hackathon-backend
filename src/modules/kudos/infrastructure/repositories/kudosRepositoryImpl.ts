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

  async findById(id: number): Promise<Kudos | null> {
    const query = `
      SELECT * FROM kudos 
      WHERE id = $1 AND deleted_at IS NULL
    `;
    const result = await DatabaseManager.query(query, [id]);
    return result.length ? KudosMapper.toDto(result[0]) : null;
  }

  async findByUserId(userId: number): Promise<Kudos[]> {
    const query = `
      SELECT * FROM kudos 
      WHERE user_id = $1 AND deleted_at IS NULL
      ORDER BY created_at DESC
    `;
    const result = await DatabaseManager.query(query, [userId]);
    return result.map(KudosMapper.toDto);
  }

  async findByCreatedByUserId(createdByUserId: number): Promise<Kudos[]> {
    const query = `
      SELECT * FROM kudos 
      WHERE created_by_user_id = $1 AND deleted_at IS NULL
      ORDER BY created_at DESC
    `;
    const result = await DatabaseManager.query(query, [createdByUserId]);
    return result.map(KudosMapper.toDto);
  }

  async softDelete(id: number): Promise<void> {
    const query = `
      UPDATE kudos 
      SET deleted_at = CURRENT_TIMESTAMP 
      WHERE id = $1
    `;
    await DatabaseManager.query(query, [id]);
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
