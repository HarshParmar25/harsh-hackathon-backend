import { UserRepositoryImpl } from "../../../infrastructure/repositories/userRepositoryImpl";
import { SessionRepositoryImpl } from "../../../infrastructure/repositories/sessionRepositoryImpl";
import { AuthService } from "../../services/authService";
import { LoginUseCase } from "./login";

export class LoginFactory {
  static create() {
    const userRepository = new UserRepositoryImpl();
    const sessionRepository = new SessionRepositoryImpl();
    const authService = new AuthService(sessionRepository);
    return new LoginUseCase(userRepository, authService);
  }
}
