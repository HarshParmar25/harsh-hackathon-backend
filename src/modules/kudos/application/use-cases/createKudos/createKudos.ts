import { IKudosRepository, Kudos } from "../../../repositories/kudosRepository";
import { CreateKudosDto } from "./createKudosDto";

export class CreateKudosUseCase {
  constructor(private readonly kudosRepository: IKudosRepository) {}

  async execute(data: CreateKudosDto): Promise<Kudos> {
    return this.kudosRepository.create(data);
  }
}
