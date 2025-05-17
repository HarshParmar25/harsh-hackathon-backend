import { User } from "../../users/domain/entities/user";

export interface IUserRepository {
  findByIds(ids: number[]): Promise<User[]>;
}
