import { Team } from "../../../domain/entities/team";
import { ITeamRepository } from "../../../domain/repositories/teamRepository";

export class GetTeam {
  constructor(private teamRepository: ITeamRepository) {}

  async execute(id: number): Promise<Team> {
    const team = await this.teamRepository.findById(id);
    if (!team) {
      throw new Error("Team not found");
    }
    return team;
  }
}
