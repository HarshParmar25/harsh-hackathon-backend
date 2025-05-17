import { ISessionRepository } from "../../repositories/sessionRepository";
import { Session } from "../../domain/entities/session";
import { randomBytes } from "crypto";

export class AuthService {
  constructor(private readonly sessionRepository: ISessionRepository) {}

  async createSession(userId: number): Promise<Session> {
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const session = new Session({
      user_id: userId,
      session_token: token,
      expires_at: expiresAt,
    });
    return this.sessionRepository.create(session);
  }

  async validateSession(token: string): Promise<Session | null> {
    const session = await this.sessionRepository.findByToken(token);
    if (!session) return null;

    if (session.getExpiresAt() < new Date()) {
      await this.sessionRepository.delete(token);
      return null;
    }

    return session;
  }

  async invalidateSession(token: string): Promise<boolean> {
    return this.sessionRepository.delete(token);
  }
}
