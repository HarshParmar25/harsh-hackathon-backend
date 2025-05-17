import { KudosRepositoryImpl } from "../../../infrastructure/repositories/kudosRepositoryImpl";
import { CreateKudosUseCase } from "./createKudos";

export class CreateKudosFactory {
  static create() {
    const kudosRepository = new KudosRepositoryImpl();
    return new CreateKudosUseCase(kudosRepository);
  }
}
