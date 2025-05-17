import { SessionRepositoryImpl } from "../../../infrastructure/repositories/sessionRepositoryImpl";
import { AuthService } from "../../services/authService";
import { LogoutUseCase } from "./logout";

export class LogoutFactory {
  static create() {
    const sessionRepository = new SessionRepositoryImpl();
    const authService = new AuthService(sessionRepository);
    return new LogoutUseCase(authService);
  }
}
