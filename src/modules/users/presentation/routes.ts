import { Router } from "express";
import { UserController } from "./controller";

const router = Router();

router.get("/", UserController.getUser);

export { router as userRoutes };
