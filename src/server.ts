import "dotenv/config";
import { app } from "./shared/http/app";
import { DatabaseManager } from "./shared/database/DatabaseManager";

const PORT = process.env.PORT || 3333;

async function startServer() {
  try {
    // Connect to database first
    const dbManager = await DatabaseManager.getInstance();

    // write a test query to the database that creates a table if it doesn't exist
    const result = await dbManager
      .getDatabase()
      .query("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL)");
    console.log("result", result);

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
