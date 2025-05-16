import { Pool, PoolClient } from "pg";
import { IDatabase } from "./IDatabase";
import { DB_CONFIG } from "./config";

export class PostgresDatabase implements IDatabase {
  private pool: Pool;
  private client: PoolClient | null = null;

  constructor() {
    if (!DB_CONFIG.host || !DB_CONFIG.port || !DB_CONFIG.database || !DB_CONFIG.user || !DB_CONFIG.password) {
      throw new Error("Database configuration is missing");
    }
    this.pool = new Pool({
      host: DB_CONFIG.host,
      port: DB_CONFIG.port,
      database: DB_CONFIG.database,
      user: DB_CONFIG.user,
      password: DB_CONFIG.password,
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
