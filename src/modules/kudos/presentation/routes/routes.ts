import { Router } from "express";
import { KudosController } from "../controllers/controller";
import { authMiddleware } from "../../../../shared/http/middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, KudosController.create);
router.get("/", authMiddleware, KudosController.getAll);
router.get("/my", authMiddleware, KudosController.getKudos);

export { router as kudosRoutes };
