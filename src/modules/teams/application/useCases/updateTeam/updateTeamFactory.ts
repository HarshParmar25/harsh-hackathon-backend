import { TeamRepositoryImpl } from "../../../infrastructure/repositories/teamRepositoryImpl";
import { UpdateTeam } from "./updateTeam";

export { UpdateTeam };

export class UpdateTeamFactory {
  static create(): UpdateTeam {
    const teamRepository = new TeamRepositoryImpl();
    return new UpdateTeam(teamRepository);
  }
}
