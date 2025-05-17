import { User } from "../domain/entities/user";

export class CreateUserMapper {
  static toPersistence(user: User) {
    return {
      name: user.getName(),
      email: user.getEmail(),
      password_hash: user.getPassword(),
      role: user.getRole(),
      image_url: user.getImageUrl(),
    };
  }

  static toDomain(raw: any) {
    return new User({
      id: raw.id,
      name: raw.name,
      email: raw.email,
      password: raw.password_hash,
      role: raw.role,
      imageUrl: raw.image_url,
    });
  }
}
