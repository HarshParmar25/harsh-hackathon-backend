import { Router } from "express";
import { userRoutes } from "../../../modules/users/presentation/routes";
import { kudosRoutes } from "../../../modules/kudos/presentation/routes/routes";
import { profileRoutes } from "../../../modules/profile/presentation/routes/routes";
import { teamRoutes } from "../../../modules/teams/presentation/routes/routes";
import { analyticsRoutes } from "../../../modules/analytics/presentation/routes/routes";

const router = Router();

router.use("/users", userRoutes);

router.use("/kudos", kudosRoutes);

router.use("/profile", profileRoutes);

router.use("/teams", teamRoutes);

router.use("/analytics", analyticsRoutes);

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export { router };
