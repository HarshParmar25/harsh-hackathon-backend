import { Session } from "../domain/entities/session";

export class SessionMapper {
  static toDomain(raw: any) {
    return new Session({
      user_id: raw.user_id,
      session_token: raw.session_token,
      expires_at: raw.expires_at,
    });
  }
}
