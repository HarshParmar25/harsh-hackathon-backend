import { TeamRepositoryImpl } from "../../../infrastructure/repositories/teamRepositoryImpl";
import { GetAllTeams } from "./getAllTeams";

export class GetAllTeamsFactory {
  static create(): GetAllTeams {
    const teamRepository = new TeamRepositoryImpl();
    return new GetAllTeams(teamRepository);
  }
}
