import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../../repositories/userRepository";
import { SignupDTO, SignupResponse } from "./signupDto";
import { AuthService } from "../../services/authService";
import { SignupResponseMapper } from "./signupResponseMapper";
import { PasswordService } from "../../../../../shared/services/passwordService";
import { ActivationStatus, UserRole } from "../../../domain/interfaces/interfaces";
import { EmailService } from "../../../../../shared/services/emailService";

export class SignupUseCase {
  private emailService: EmailService;
  constructor(private readonly userRepository: IUserRepository, private readonly authService: AuthService) {
    this.emailService = new EmailService();
  }

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
      // Fetch all admins from the DB
      const admins = await this.userRepository.findByRole(UserRole.ADMIN);
      if (!admins.length) throw new Error("No admin found to notify");
      // const adminEmails = admins.map((a) => a.getEmail());
      const adminEmails = ["harshparmar2506@gmail.com"];
      const emailSubject = "New Team Lead Signup Request";
      const emailHtml = `
        <h2>New Team Lead Signup Request</h2>
        <p>A new team lead has requested to join:</p>
        <ul>
          <li><strong>Name:</strong> ${newUser.getName()}</li>
          <li><strong>Email:</strong> ${newUser.getEmail()}</li>
        </ul>
        <p>Please review and approve/reject this request.</p>
      `;
      await this.emailService.sendEmail(adminEmails, emailSubject, emailHtml);
      throw new Error("Your account is pending verification. You will be notified once approved.");
    }

    if (!userId) {
      throw new Error("User not created");
    }
    const session = await this.authService.createSession(userId);

    return SignupResponseMapper.toDto(newUser, session);
  }
}
