import { Router } from "express";
import { userRoutes } from "../../../modules/users/presentation/routes";
import { kudosRoutes } from "../../../modules/kudos/presentation/routes/routes";

const router = Router();

router.use("/users", userRoutes);

router.use("/kudos", kudosRoutes);

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export { router };
