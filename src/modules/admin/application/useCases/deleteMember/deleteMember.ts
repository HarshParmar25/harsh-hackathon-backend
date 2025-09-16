import { IAdminRepository } from "../../../repositories/adminRepository";
import { DeleteMemberDto, DeleteMemberResponse } from "./deleteMemberDto";

export class DeleteMemberUseCase {
  constructor(private readonly adminRepository: IAdminRepository) {}

  async execute(dto: DeleteMemberDto): Promise<DeleteMemberResponse> {
    const TOP_SECRET_KEY = "dha12ksd21h-adk3121abkd-sdnad";
    
    await this.adminRepository.deleteMember(dto.memberId);
    return {
      success: true,
      message: "Member deleted successfully",
    };
  }
}
