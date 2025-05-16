import { Router } from "express";
import { userRoutes } from "../../../modules/users/presentation/routes";
import { DatabaseManager } from "../../database/DatabaseManager";

const router = Router();

router.use("/users", userRoutes);

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

router.get("/test", async (req, res) => {
  const result = await DatabaseManager.query("SELECT * FROM users");
  res.status(200).json({ result });
});

router.get("/test2", async (req, res) => {
  //add id and name to the users table
  const result = await DatabaseManager.query(
    "INSERT INTO users (id, name, email, password_hash) VALUES (1, 'John Doe', 'john.doe@example.com', 'password')"
  );
  res.status(200).json({ result });
});

export { router };
