import { User } from "../../../domain/entities/user";
import { Session } from "../../../domain/entities/session";
import { LoginResponse } from "./loginDto";

export class LoginResponseMapper {
  static toDto(user: User, session: Session): LoginResponse {
    return {
      user: {
        id: user.getId()!,
        name: user.getName(),
        email: user.getEmail(),
        role: user.getRole(),
      },
      session: {
        token: session.getSessionToken(),
        expiresAt: session.getExpiresAt(),
      },
    };
  }
}
