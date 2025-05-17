import { KudosRepositoryImpl } from "../../../infrastructure/repositories/kudosRepositoryImpl";
import { UserRepositoryImpl } from "../../../infrastructure/repositories/userRepositoryImpl";
import { CreateKudosUseCase } from "./createKudos";

export class CreateKudosFactory {
  static create() {
    const kudosRepository = new KudosRepositoryImpl();
    const userRepository = new UserRepositoryImpl();
    return new CreateKudosUseCase(kudosRepository, userRepository);
  }
}
