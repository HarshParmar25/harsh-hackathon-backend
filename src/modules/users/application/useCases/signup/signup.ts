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
  private readonly DOMAIN_URL = process.env.DOMAIN_URL || "https://yourdomain.com";

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
      const admins = await this.userRepository.findByRole(UserRole.ADMIN);
      if (!admins.length) throw new Error("No admin found to notify");
      const adminEmails = admins.map((admin) => admin.getEmail());

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3498db;">🔔 New Team Lead Signup Request</h2>
          <p>A new team lead has requested to join the platform:</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c3e50;">Applicant Details:</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 10px 0;"><strong>Name:</strong> ${newUser.getName()}</li>
              <li style="margin: 10px 0;"><strong>Email:</strong> ${newUser.getEmail()}</li>
            </ul>
          </div>

          <div style="background-color: #e8f4f8; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c3e50;">Quick Actions:</h3>
            <p>Review and manage this request through the admin dashboard:</p>
            <a href="${
              this.DOMAIN_URL
            }/" style="display: inline-block; background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 10px;">Go to Admin Dashboard</a>
          </div>

          <p style="color: #7f8c8d; font-size: 0.9em;">This is an automated notification. Please review this request at your earliest convenience.</p>
        </div>
      `;

      await this.emailService.sendEmail(adminEmails, "🔔 New Team Lead Signup Request - Action Required", emailHtml);
      throw new Error("Your account is pending verification. You will be notified once approved.");
    }

    if (!userId) {
      throw new Error("User not created");
    }
    const session = await this.authService.createSession(userId);

    return SignupResponseMapper.toDto(newUser, session);
  }
}
