import { KudosRepositoryImpl } from "../../../infrastructure/repositories/kudosRepositoryImpl";
import { GetAllKudosUseCase } from "./getAllKudos";

export class GetAllKudosFactory {
  static create() {
    const kudosRepository = new KudosRepositoryImpl();
    return new GetAllKudosUseCase(kudosRepository);
  }
}
