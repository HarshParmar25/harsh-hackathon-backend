import { Kudos } from "../repositories/kudosRepository";

export class KudosMapper {
  static toDto(raw: any): Kudos {
    return {
      id: raw.id,
      userId: raw.user_id,
      creatorName: raw.creator_name,
      creatorImageUrl: raw.creator_image_url,
      receiverName: raw.receiver_name,
      receiverImageUrl: raw.receiver_image_url,
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
