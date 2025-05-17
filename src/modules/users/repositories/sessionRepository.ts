import { Session } from "../domain/entities/session";

export interface ISessionRepository {
  create(session: Session): Promise<Session>;
  findByToken(token: string): Promise<Session | null>;
  delete(token: string): Promise<boolean>;
}
