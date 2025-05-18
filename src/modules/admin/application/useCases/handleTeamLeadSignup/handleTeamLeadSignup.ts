import { IAdminRepository } from "../../../repositories/adminRepository";
import { HandleTeamLeadSignupDto, HandleTeamLeadSignupResponse } from "./handleTeamLeadSignupDto";
import { GetMembersMapper } from "../getMembers/getMembersMapper";
import { ActivationStatus } from "../../../../users/domain/interfaces/interfaces";
import { EmailService } from "../../../../../shared/services/emailService";

export class HandleTeamLeadSignupUseCase {
  private emailService: EmailService;
  constructor(private readonly adminRepository: IAdminRepository) {
    this.emailService = new EmailService();
  }

  async execute(dto: HandleTeamLeadSignupDto): Promise<HandleTeamLeadSignupResponse> {
    const updatedMember = await this.adminRepository.handleTeamLeadSignup(dto.memberId, dto.status);
    if (dto.status === ActivationStatus.APPROVED) {
      await this.emailService.sendEmail(
        updatedMember.getEmail(),
        "Team Lead Signup Approved",
        "Your team lead signup has been approved"
      );
    }

    if (dto.status === ActivationStatus.REJECTED) {
      await this.emailService.sendEmail(
        updatedMember.getEmail(),
        "Team Lead Signup Rejected",
        "Your team lead signup has been rejected"
      );
    }

    return GetMembersMapper.toDto([updatedMember])[0];
  }
}
