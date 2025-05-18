import { IAdminRepository } from "../../../repositories/adminRepository";
import { HandleTeamLeadSignupDto, HandleTeamLeadSignupResponse } from "./handleTeamLeadSignupDto";
import { GetMembersMapper } from "../getMembers/getMembersMapper";

export class HandleTeamLeadSignupUseCase {
  constructor(private readonly adminRepository: IAdminRepository) {}

  async execute(dto: HandleTeamLeadSignupDto): Promise<HandleTeamLeadSignupResponse> {
    const updatedMember = await this.adminRepository.handleTeamLeadSignup(dto.memberId, dto.status);
    return GetMembersMapper.toDto([updatedMember])[0];
  }
}
