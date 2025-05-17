import { ISessionRepository } from "../../../repositories/sessionRepository";
import { AuthService } from "../../services/authService";

export class LogoutUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(sessionToken: string) {
    await this.authService.invalidateSession(sessionToken);
    return true;
  }
}
