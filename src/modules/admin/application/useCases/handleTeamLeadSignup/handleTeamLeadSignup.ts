import { IAdminRepository } from "../../../repositories/adminRepository";
import { HandleTeamLeadSignupDto, HandleTeamLeadSignupResponse } from "./handleTeamLeadSignupDto";
import { GetMembersMapper } from "../getMembers/getMembersMapper";
import { ActivationStatus } from "../../../../users/domain/interfaces/interfaces";
import { EmailService } from "../../../../../shared/services/emailService";

export class HandleTeamLeadSignupUseCase {
  private emailService: EmailService;
  private readonly DOMAIN_URL = process.env.DOMAIN_URL || "https://yourdomain.com";

  constructor(private readonly adminRepository: IAdminRepository) {
    this.emailService = new EmailService();
  }

  async execute(dto: HandleTeamLeadSignupDto): Promise<HandleTeamLeadSignupResponse> {
    const updatedMember = await this.adminRepository.handleTeamLeadSignup(dto.memberId, dto.status);

    if (dto.status === ActivationStatus.APPROVED) {
      const approvedHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2ecc71;">🎉 Welcome Aboard! Your Team Lead Signup is Approved</h2>
          <p>Dear ${updatedMember.getName()},</p>
          <p>Great news! Your team lead signup request has been approved. You're now ready to start managing your team and making an impact.</p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c3e50;">Next Steps:</h3>
            <ul>
              <li>Log in to your dashboard at <a href="${this.DOMAIN_URL}/">${this.DOMAIN_URL}/</a></li>
              <li>Set up your team profile</li>
              <li>Start inviting team members</li>
            </ul>
          </div>
          <p>Need help getting started? Check out our <a href="${
            this.DOMAIN_URL
          }/docs">documentation</a> or contact our support team.</p>
          <p>Best regards,<br>The Team</p>
        </div>
      `;
      await this.emailService.sendEmail(
        updatedMember.getEmail(),
        "🎉 Team Lead Signup Approved - Welcome Aboard!",
        approvedHtml
      );
    }

    if (dto.status === ActivationStatus.REJECTED) {
      const rejectedHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e74c3c;">Team Lead Signup Status Update</h2>
          <p>Dear ${updatedMember.getName()},</p>
          <p>We regret to inform you that your team lead signup request has not been approved at this time.</p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c3e50;">What's Next?</h3>
            <ul>
              <li>Please contact admin for more information</li>
              <li>Feel free to reapply in the future</li>
            </ul>
          </div>
          <p>If you have any questions, please don't hesitate to contact our support team at <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>.</p>
          <p>Best regards,<br>The Team</p>
        </div>
      `;
      await this.emailService.sendEmail(updatedMember.getEmail(), "Team Lead Signup Status Update", rejectedHtml);
    }

    return GetMembersMapper.toDto([updatedMember])[0];
  }
}
