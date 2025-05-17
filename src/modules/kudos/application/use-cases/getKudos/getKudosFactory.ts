import { GetKudosUseCase } from "./getKudosUseCase";
import { KudosRepositoryImpl } from "../../../infrastructure/repositories/kudosRepositoryImpl";

export class GetKudosFactory {
  static create(): GetKudosUseCase {
    const kudosRepository = new KudosRepositoryImpl();
    return new GetKudosUseCase(kudosRepository);
  }
}
