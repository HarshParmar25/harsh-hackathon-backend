import { IDatabase } from "./IDatabase";
import { PostgresDatabase } from "./PostgresDatabase";
import { DB_CONFIG } from "./config";

export class DatabaseManager {
  private static instance: DatabaseManager;
  private database: IDatabase;

  private constructor() {
    if (!DB_CONFIG.connectionString) {
      throw new Error("DATABASE_URL is not set");
    }
    console.log("DB_CONFIG", DB_CONFIG);
    this.database = new PostgresDatabase(DB_CONFIG.connectionString);
  }

  public static async getInstance(): Promise<DatabaseManager> {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
      await DatabaseManager.instance.checkConnection();
    }
    return DatabaseManager.instance;
  }

  private async checkConnection(): Promise<void> {
    try {
      await this.database.query("SELECT 1");
      console.log("✅ Database connection successful");
    } catch (error) {
      console.error("❌ Database connection failed:", error);
      throw new Error("Failed to connect to database");
    }
  }

  public getDatabase(): IDatabase {
    return this.database;
  }

  public async closeConnection(): Promise<void> {
    await this.database.release();
  }
}
