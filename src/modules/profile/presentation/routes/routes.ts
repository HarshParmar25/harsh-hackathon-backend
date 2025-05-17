import { Router } from "express";
import { ProfileController } from "../controllers/controller";
import { authMiddleware } from "../../../../shared/http/middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, ProfileController.getProfile);

export { router as profileRoutes };
