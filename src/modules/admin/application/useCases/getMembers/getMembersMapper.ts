import { User } from "../../../../users/domain/entities/user";
import { MemberDto } from "./getMembersDto";

export class GetMembersMapper {
  static toDto(users: User[]): MemberDto[] {
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
