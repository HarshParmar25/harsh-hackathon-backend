import { Pool, PoolClient } from "pg";
import { IDatabase } from "./IDatabase";

export class PostgresDatabase implements IDatabase {
  private pool: Pool;
  private client: PoolClient | null = null;

  constructor(connectionString: string) {
    this.pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async getConnection(): Promise<PoolClient> {
    if (!this.client) {
      this.client = await this.pool.connect();
    }
    return this.client;
  }

  async query<T>(text: string, params?: any[]): Promise<T> {
    const client = await this.getConnection();
    try {
      const result = await client.query(text, params);
      return result.rows as T;
    } catch (error) {
      throw new Error(`Database query error: ${error}`);
    }
  }

  async release(): Promise<void> {
    if (this.client) {
      await this.client.release();
      this.client = null;
    }
    await this.pool.end();
  }
}
