import { TeamRepositoryImpl } from "../../../infrastructure/repositories/teamRepositoryImpl";
import { DeleteTeam } from "./deleteTeam";

export { DeleteTeam };

export class DeleteTeamFactory {
  static create(): DeleteTeam {
    const teamRepository = new TeamRepositoryImpl();
    return new DeleteTeam(teamRepository);
  }
}
