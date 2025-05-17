import { User } from "../repositories/userRepository";

export class UserMapper {
  static toDto(raw: any): User {
    return {
      id: raw.id,
      name: raw.name,
      email: raw.email,
    };
  }
}
