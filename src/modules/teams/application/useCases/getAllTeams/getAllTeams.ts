import { Team } from "../../../domain/entities/team";
import { ITeamRepository } from "../../../domain/repositories/teamRepository";

export class GetAllTeams {
  constructor(private teamRepository: ITeamRepository) {}

  async execute(): Promise<Team[]> {
    return this.teamRepository.findAll();
  }
}
