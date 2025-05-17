import { Kudos } from "../repositories/kudosRepository";

export class KudosMapper {
  static toDto(raw: any): Kudos {
    return {
      id: raw.id,
      userId: raw.user_id,
      createdByUserId: raw.created_by_user_id,
      teamName: raw.team_name,
      category: raw.category,
      message: raw.message,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
      deletedAt: raw.deleted_at,
    };
  }
}
