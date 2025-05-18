import { IAdminRepository } from "../../../repositories/adminRepository";

import { GetMembersMapper } from "../getMembers/getMembersMapper";
import { GetPendingTeamLeadRequestsResponse } from "./getPendingTeamLeadRequestsDto";

export class GetPendingTeamLeadRequestsUseCase {
  constructor(private readonly adminRepository: IAdminRepository) {}

  async execute(): Promise<GetPendingTeamLeadRequestsResponse[]> {
    const pendingRequests = await this.adminRepository.getPendingTeamLeadRequests();
    return GetMembersMapper.toDto(pendingRequests);
  }
}
