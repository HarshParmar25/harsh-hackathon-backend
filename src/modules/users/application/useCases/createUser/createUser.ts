import { User } from "../../../domain/entities/user";
import { CreateUserDTO } from "./createUser.dto";

export class CreateUserUseCase {
  constructor() {}

  execute(props: CreateUserDTO) {
    const user = User.create({
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
      password: props.password,
    });
    return user;
  }
}
