import { Router } from "express";
import { EmployeeController } from "./controller";
import { authMiddleware } from "../../../shared/http/middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, EmployeeController.getEmployees);

export { router as employeeRoutes };
