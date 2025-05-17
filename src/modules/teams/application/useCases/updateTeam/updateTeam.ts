import { ITeamRepository } from "../../../domain/repositories/teamRepository";
import { UpdateTeamDto } from "./updateTeamDto";

export class UpdateTeam {
  constructor(private teamRepository: ITeamRepository) {}

  async execute(data: UpdateTeamDto): Promise<void> {
    const team = await this.teamRepository.findById(data.id);
    if (!team) {
      throw new Error("Team not found");
    }

    if (data.name) {
      const existingTeam = await this.teamRepository.findByName(data.name);
      if (existingTeam && existingTeam.getId() !== data.id) {
        throw new Error("Team with this name already exists");
      }
    }

    team.update({
      name: data.name,
      description: data.description,
    });

    await this.teamRepository.update(team);

    return;
  }
}
