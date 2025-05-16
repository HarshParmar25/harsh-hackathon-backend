export const DB_CONFIG = {
  host: process.env.DB_HOST || "",
  port: parseInt(process.env.DB_PORT || "0"),
  database: process.env.DB_NAME || "",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  // maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || "20"),
  // idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || "30000"),
  // connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT || "2000"),
  // pool_mode: process.env.DB_POOL_MODE || "transaction",
};
