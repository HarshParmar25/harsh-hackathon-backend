import { Team } from "../../../domain/entities/team";
import { ITeamRepository } from "../../../domain/repositories/teamRepository";
import { CreateTeamDto } from "./createTeamDto";

export class CreateTeam {
  constructor(private teamRepository: ITeamRepository) {}

  async execute(data: CreateTeamDto): Promise<void> {
    const existingTeam = await this.teamRepository.findByName(data.name);
    if (existingTeam) {
      throw new Error("Team with this name already exists");
    }

    const team = Team.create({
      name: data.name,
      description: data.description || null,
    });

    await this.teamRepository.create(team);

    return;
  }
}
