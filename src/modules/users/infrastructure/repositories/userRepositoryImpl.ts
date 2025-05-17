import { DatabaseManager } from "../../../../shared/database/DatabaseManager";
import { User } from "../../domain/entities/user";
import { CreateUserMapper } from "../../mappers/createUserMapper";
import { IUserRepository } from "../../repositories/userRepository";

export class UserRepositoryImpl implements IUserRepository {
  async findByEmail(email: string) {
    const query = `
      SELECT * FROM users WHERE email = $1
    `;
    const values = [email];
    const result = await DatabaseManager.query(query, values);
    return result[0] ? CreateUserMapper.toDomain(result[0]) : null;
  }

  async create(user: User) {
    const userData = CreateUserMapper.toPersistence(user);
    const query = `
      INSERT INTO users (name, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [userData.name, userData.email, userData.password_hash, userData.role];
    const result = await DatabaseManager.query(query, values);
    return CreateUserMapper.toDomain(result[0]);
  }

  async findAll(): Promise<User[]> {
    const query = `SELECT * FROM users`;
    const result = await DatabaseManager.query(query);
    return result.map((user: any) => CreateUserMapper.toDomain(user));
  }
}
