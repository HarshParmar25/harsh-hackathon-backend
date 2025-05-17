import { DatabaseManager } from "../../../../shared/database/DatabaseManager";
import { Session } from "../../domain/entities/session";
import { SessionMapper } from "../../mappers/sessionMapper";
import { ISessionRepository } from "../../repositories/sessionRepository";

export class SessionRepositoryImpl implements ISessionRepository {
  async create(session: Session) {
    const query = `
      INSERT INTO sessions (user_id, session_token, expires_at)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [session.getUserId(), session.getSessionToken(), session.getExpiresAt()];
    const result = await DatabaseManager.query(query, values);
    return SessionMapper.toDomain(result[0]);
  }

  async findByToken(token: string) {
    const query = `
      SELECT * FROM sessions 
      WHERE session_token = $1 AND deleted_at IS NULL
    `;
    const values = [token];
    const result = await DatabaseManager.query(query, values);
    return result[0] ? SessionMapper.toDomain(result[0]) : null;
  }

  async delete(token: string) {
    const query = `
      UPDATE sessions 
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE session_token = $1
    `;
    const values = [token];
    await DatabaseManager.query(query, values);
    return true;
  }
}
