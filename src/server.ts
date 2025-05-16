import "dotenv/config";
import { app } from "./shared/http/app";
import { DatabaseManager } from "./shared/database/DatabaseManager";

const PORT = process.env.PORT || 3333;

async function startServer() {
  try {
    // Connect to database first
    const dbManager = await DatabaseManager.getInstance();

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
