import { DatabaseManager } from "../../../../shared/database/DatabaseManager";
import { Team } from "../../domain/entities/team";
import { ITeamRepository } from "../../domain/repositories/teamRepository";

export class TeamRepositoryImpl implements ITeamRepository {
  async create(team: Team): Promise<void> {
    try {
      const query = `
        INSERT INTO teams (name, description)
        VALUES ($1, $2)
      `;
      await DatabaseManager.query(query, [team.getName(), team.getDescription()]);
    } catch (error) {
      throw new Error("Failed to create team");
    }
  }

  async findById(id: number): Promise<Team | null> {
    const query = `
      SELECT * FROM teams 
      WHERE id = $1 AND deleted_at IS NULL
    `;
    const result = await DatabaseManager.query(query, [id]);
    return result[0] ? Team.create(result[0]) : null;
  }

  async findByName(name: string): Promise<Team | null> {
    const query = `
      SELECT * FROM teams 
      WHERE name = $1 AND deleted_at IS NULL
    `;
    const result = await DatabaseManager.query(query, [name]);
    return result[0] ? Team.create(result[0]) : null;
  }

  async findAll(): Promise<Team[]> {
    const query = `
      SELECT * FROM teams 
      WHERE deleted_at IS NULL
      ORDER BY created_at DESC
    `;
    const result = await DatabaseManager.query(query);
    return result.map((team: any) => Team.create(team));
  }

  async update(team: Team): Promise<void> {
    const query = `
      UPDATE teams 
      SET name = $1, description = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3 AND deleted_at IS NULL
      RETURNING *
    `;
    const values = [team.getName(), team.getDescription(), team.getId()];
    const result = await DatabaseManager.query(query, values);
    return;
  }

  async delete(id: number): Promise<void> {
    const query = `
      UPDATE teams 
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE id = $1
    `;
    await DatabaseManager.query(query, [id]);
  }
}
