import { User } from "../domain/entities/user";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
}
