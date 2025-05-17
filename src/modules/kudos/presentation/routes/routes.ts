import { Router } from "express";
import { KudosController } from "../controllers/controller";
import { authMiddleware } from "../../../../shared/http/middlewares/authMiddleware";
import { createValidator } from "express-joi-validation";
import { kudosValidationSchema } from "../validation";

const router = Router();
const validator = createValidator({ passError: true });
router.post("/", authMiddleware, KudosController.create);
router.get("/", authMiddleware, KudosController.getAll);
router.get("/:id", validator.params(kudosValidationSchema.get), authMiddleware, KudosController.getKudos);

export { router as kudosRoutes };
