import { User } from "../../../../users/domain/entities/user";
import { GetPendingTeamLeadRequestsResponse } from "../getPendingTeamLeadRequests/getPendingTeamLeadRequestsDto";
import { MemberDto } from "./getMembersDto";

export class GetMembersMapper {
  static toDto(users: User[]): GetPendingTeamLeadRequestsResponse[] {
    return users.map((user) => ({
      id: user.getId()!,
      name: user.getName(),
      email: user.getEmail(),
      role: user.getRole(),
      imageUrl: user.getImageUrl(),
      isActive: user.getIsActive(),
      activationStatus: user.getActivationStatus(),
    }));
  }
}
