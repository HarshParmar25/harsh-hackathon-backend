import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../../repositories/userRepository";
import { SignupDTO, SignupResponse } from "./signupDto";
import { AuthService } from "../../services/authService";
import { SignupResponseMapper } from "./signupResponseMapper";
import { PasswordService } from "../../../../../shared/services/passwordService";
import { ActivationStatus, UserRole } from "../../../domain/interfaces/interfaces";

export class SignupUseCase {
  constructor(private readonly userRepository: IUserRepository, private readonly authService: AuthService) {}

  async execute(dto: SignupDTO): Promise<SignupResponse> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await PasswordService.hash(dto.password);
    const user = new User({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: dto.role,
      isActive: dto.role === UserRole.TEAM_LEAD ? false : true,
      activationStatus: dto.role === UserRole.TEAM_LEAD ? ActivationStatus.PENDING : ActivationStatus.APPROVED,
    });
    const newUser = await this.userRepository.create(user);
    const userId = newUser.getId();

    if (newUser.getActivationStatus() === ActivationStatus.PENDING) {
      //send message that account is pending
      throw new Error("Your account is pending verification. You will be notified once approved.");
    }

    if (!userId) {
      throw new Error("User not created");
    }
    const session = await this.authService.createSession(userId);

    return SignupResponseMapper.toDto(newUser, session);
  }
}
