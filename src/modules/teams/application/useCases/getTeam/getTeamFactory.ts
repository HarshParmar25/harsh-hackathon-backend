import { TeamRepositoryImpl } from "../../../infrastructure/repositories/teamRepositoryImpl";
import { GetTeam } from "./getTeam";

export { GetTeam };

export class GetTeamFactory {
  static create(): GetTeam {
    const teamRepository = new TeamRepositoryImpl();
    return new GetTeam(teamRepository);
  }
}
