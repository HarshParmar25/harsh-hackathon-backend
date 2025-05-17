export interface User {
  id: number;
  name: string;
  email: string;
}

export interface IUserRepository {
  findByIds(ids: number[]): Promise<User[]>;
}
