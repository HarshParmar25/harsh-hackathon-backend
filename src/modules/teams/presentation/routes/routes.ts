import { Router } from "express";
import { TeamController } from "../controllers/controller";
import { createValidator } from "express-joi-validation";
import { teamValidationSchema } from "../validation";

const router = Router();
const validator = createValidator({ passError: true });

router.post("/", validator.body(teamValidationSchema.create), TeamController.create);
router.put("/", validator.body(teamValidationSchema.update), TeamController.update);
router.get("/list", TeamController.getAllTeams);
router.get("/:id", validator.params(teamValidationSchema.get), TeamController.get);
router.delete("/:id", validator.params(teamValidationSchema.delete), TeamController.delete);

export { router as teamRoutes };
