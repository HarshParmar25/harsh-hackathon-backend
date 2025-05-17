import { TeamRepositoryImpl } from "../../../infrastructure/repositories/teamRepositoryImpl";
import { CreateTeam } from "./createTeam";

export { CreateTeam };

export class CreateTeamFactory {
  static create(): CreateTeam {
    const teamRepository = new TeamRepositoryImpl();
    return new CreateTeam(teamRepository);
  }
}
