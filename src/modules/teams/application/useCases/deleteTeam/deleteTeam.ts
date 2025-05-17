import { ITeamRepository } from "../../../domain/repositories/teamRepository";

export class DeleteTeam {
  constructor(private teamRepository: ITeamRepository) {}

  async execute(id: number): Promise<void> {
    const team = await this.teamRepository.findById(id);
    if (!team) {
      throw new Error("Team not found");
    }

    await this.teamRepository.delete(id);
  }
}
