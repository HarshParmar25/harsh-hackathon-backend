const fs = require("fs").promises;
const path = require("path");
const pool = require("./connection");

async function setupDatabase() {
  try {
    const schemaDir = path.join(__dirname, "schema");
    const schemaFiles = await fs.readdir(schemaDir);

    for (const file of schemaFiles) {
      if (file.endsWith(".sql")) {
        const schemaPath = path.join(schemaDir, file);
        const schema = await fs.readFile(schemaPath, "utf8");
        await pool.query(schema);
        console.log(`Executed schema from ${file}`);
      }
    }

    console.log("Database setup completed successfully");
  } catch (error) {
    console.error("Database setup failed:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run if this file is executed directly
if (require.main === module) {
  setupDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = setupDatabase;
