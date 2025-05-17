import { IKudosRepository, KudosWithUsers } from "../../../repositories/kudosRepository";

export class GetKudosUseCase {
  constructor(private readonly kudosRepository: IKudosRepository) {}

  async execute(userId: number): Promise<KudosWithUsers[]> {
    return this.kudosRepository.findByUserIdWithUsers(userId);
  }
}
