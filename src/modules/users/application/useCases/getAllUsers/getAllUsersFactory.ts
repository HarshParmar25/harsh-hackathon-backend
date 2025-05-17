import { UserRepositoryImpl } from "../../../infrastructure/repositories/userRepositoryImpl";
import { GetAllUsersUseCase } from "./getAllUsers";

export class GetAllUsersFactory {
  static create() {
    const userRepository = new UserRepositoryImpl();
    return new GetAllUsersUseCase(userRepository);
  }
}
