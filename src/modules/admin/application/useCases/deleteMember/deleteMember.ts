import { IAdminRepository } from "../../../repositories/adminRepository";
import { DeleteMemberDto, DeleteMemberResponse } from "./deleteMemberDto";

export class DeleteMemberUseCase {
  constructor(private readonly adminRepository: IAdminRepository) {}

  async execute(dto: DeleteMemberDto): Promise<DeleteMemberResponse> {
    await this.adminRepository.deleteMember(dto.memberId);
    return {
      success: true,
      message: "Member deleted successfully",
    };
  }
}
