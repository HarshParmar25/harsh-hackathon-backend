import { Router } from "express";
import { userValidationSchema } from "./validation";
import { createValidator } from "express-joi-validation";
import { UserController } from "./controller";
import { authMiddleware } from "../../../shared/http/middlewares/authMiddleware";

const router = Router();
const validator = createValidator({ passError: true });

router.post("/signup", validator.body(userValidationSchema.signup), UserController.signup);
router.post("/logout", authMiddleware, UserController.logout);
router.post("/login", validator.body(userValidationSchema.login), UserController.login);

export { router as userRoutes };
