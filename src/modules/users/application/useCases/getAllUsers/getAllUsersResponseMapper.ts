import { User } from "../../../domain/entities/user";
import { GetAllUsersDto } from "./getAllUsersDto";

export class GetAllUsersResponseMapper {
  static toDto(users: User[]): GetAllUsersDto[] {
    return users.map((user) => ({
      id: user.getId()!,
      name: user.getName(),
      email: user.getEmail(),
      role: user.getRole(),
      imageUrl: user.getImageUrl(),
    }));
  }
}
