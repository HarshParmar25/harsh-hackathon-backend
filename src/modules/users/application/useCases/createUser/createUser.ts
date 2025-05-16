import { User } from "../../../domain/entities/user";
import { UserEmail } from "../../../domain/entities/userEmail";
import { UserPassword } from "../../../domain/entities/userPassword";
import { CreateUserDTO } from "./createUser.dto";

export class CreateUserUseCase {
  constructor() {}

  execute(props: CreateUserDTO) {
    const user = User.create({
      email: UserEmail.create(props.email),
      firstName: props.firstName,
      lastName: props.lastName,
      password: UserPassword.create({
        value: props.password,
        hashed: true,
      }),
    });
    return user;
  }
}
