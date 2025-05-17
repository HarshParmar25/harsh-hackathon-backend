import { IKudosRepository, Kudos } from "../../../repositories/kudosRepository";

export class GetAllKudosUseCase {
  constructor(private readonly kudosRepository: IKudosRepository) {}

  async execute(): Promise<Kudos[]> {
    const kudos = await this.kudosRepository.findAllWithUsers();

    return kudos;
  }
}
