import { DatabaseManager } from "../../../../shared/database/DatabaseManager";
import { User } from "../../repositories/userRepository";
import { IUserRepository } from "../../repositories/userRepository";
import { UserMapper } from "../../mappers/userMapper";

export class UserRepositoryImpl implements IUserRepository {
  async findByIds(ids: number[]): Promise<User[]> {
    const query = `SELECT * FROM users WHERE id = ANY($1::int[])`;
    const result = await DatabaseManager.query(query, [ids]);
    return result.map(UserMapper.toDto);
  }
}
