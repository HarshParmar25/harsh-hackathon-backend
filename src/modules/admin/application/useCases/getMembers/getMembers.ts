import { IAdminRepository } from "../../../repositories/adminRepository";
import { MemberDto } from "./getMembersDto";
import { GetMembersMapper } from "./getMembersMapper";

export class GetMembersUseCase {
  constructor(private readonly adminRepository: IAdminRepository) {}

  async execute(): Promise<MemberDto[]> {
    const members = await this.adminRepository.getMembers();
    return GetMembersMapper.toDto(members);
  }
}
