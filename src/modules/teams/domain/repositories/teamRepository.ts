import { Team } from "../entities/team";

export interface ITeamRepository {
  create(team: Team): Promise<void>;
  findById(id: number): Promise<Team | null>;
  findByName(name: string): Promise<Team | null>;
  findAll(): Promise<Team[]>;
  update(team: Team): Promise<void>;
  delete(id: number): Promise<void>;
}
