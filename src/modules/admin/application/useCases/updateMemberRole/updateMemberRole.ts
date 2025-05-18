import { IAdminRepository } from "../../../repositories/adminRepository";
import { UpdateMemberRoleDto, UpdateMemberRoleResponse } from "./updateMemberRoleDto";
import { GetMembersMapper } from "../getMembers/getMembersMapper";

export class UpdateMemberRoleUseCase {
  constructor(private readonly adminRepository: IAdminRepository) {}

  async execute(dto: UpdateMemberRoleDto): Promise<UpdateMemberRoleResponse> {
    const updatedMember = await this.adminRepository.updateMemberRole(dto.memberId, dto.role);
    return {
      success: true,
      message: "Member role updated successfully",
    };
  }
}
