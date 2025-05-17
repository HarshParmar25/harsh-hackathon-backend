import { UserRepositoryImpl } from "../../../infrastructure/repositories/userRepositoryImpl";
import { SignupUseCase } from "./signup";
import { AuthService } from "../../services/authService";
import { SessionRepositoryImpl } from "../../../infrastructure/repositories/sessionRepositoryImpl";

export class SignupFactory {
  static create() {
    const userRepository = new UserRepositoryImpl();
    const sessionRepository = new SessionRepositoryImpl();
    const authService = new AuthService(sessionRepository);
    return new SignupUseCase(userRepository, authService);
  }
}
