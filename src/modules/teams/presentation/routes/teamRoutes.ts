import { Router } from "express";
import { TeamController } from "../controllers/controller";
import { teamValidationSchema } from "../validation";
import { createValidator } from "express-joi-validation";

const router = Router();
const validator = createValidator({ passError: true });

router.post("/", validator.body(teamValidationSchema.create), TeamController.create);
router.put("/", validator.body(teamValidationSchema.update), TeamController.update);
router.delete("/", validator.query(teamValidationSchema.delete), TeamController.delete);
router.get("/", validator.query(teamValidationSchema.get), TeamController.get);
router.get("/list", TeamController.getAllTeams);

export default router;
