import { Router } from "express";
import { AnalyticsController } from "../controllers/controller";
import { authMiddleware } from "../../../../shared/http/middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, AnalyticsController.getAnalytics);

export { router as analyticsRoutes };
