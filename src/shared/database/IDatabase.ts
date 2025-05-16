import { Pool, PoolClient } from "pg";

export interface IDatabase {
  getConnection(): Promise<PoolClient>;
  query<T>(text: string, params?: any[]): Promise<T>;
  release(): Promise<void>;
}
