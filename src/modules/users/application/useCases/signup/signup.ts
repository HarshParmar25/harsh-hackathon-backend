import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../../repositories/userRepository";
import { SignupDTO, SignupResponse } from "./signupDto";
import { AuthService } from "../../services/authService";
import { SignupResponseMapper } from "./signupResponseMapper";

export class SignupUseCase {
  constructor(private readonly userRepository: IUserRepository, private readonly authService: AuthService) {}

  async execute(dto: SignupDTO): Promise<SignupResponse> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = new User({
      name: dto.name,
      email: dto.email,
      password: dto.password,
      role: dto.role,
    });
    const newUser = await this.userRepository.create(user);
    const userId = newUser.getId();
    if (!userId) {
      throw new Error("User not created");
    }
    const session = await this.authService.createSession(userId);

    return SignupResponseMapper.toDto(newUser, session);
  }
}
