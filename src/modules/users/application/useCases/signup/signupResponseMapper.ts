import { User } from "../../../domain/entities/user";
import { Session } from "../../../domain/entities/session";
import { SignupResponse } from "./signupDto";

export class SignupResponseMapper {
  static toDto(user: User, session: Session): SignupResponse {
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
