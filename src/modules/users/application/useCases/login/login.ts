import { IUserRepository } from "../../../repositories/userRepository";
import { LoginDTO, LoginResponse } from "./loginDto";
import { AuthService } from "../../services/authService";
import { LoginResponseMapper } from "./loginResponseMapper";
import { PasswordService } from "../../../../../shared/services/passwordService";
import { ActivationStatus } from "../../../domain/interfaces/interfaces";

export class LoginUseCase {
  constructor(private readonly userRepository: IUserRepository, private readonly authService: AuthService) {}

  async execute(dto: LoginDTO): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    if (user.getActivationStatus() === ActivationStatus.PENDING) {
      throw new Error("Your account is pending verification. You will be notified once approved.");
    }

    const isPasswordValid = await PasswordService.verify(dto.password, user.getPassword());
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const userId = user.getId();
    if (!userId) {
      throw new Error("User not found");
    }

    const session = await this.authService.createSession(userId);

    return LoginResponseMapper.toDto(user, session);
  }
}
