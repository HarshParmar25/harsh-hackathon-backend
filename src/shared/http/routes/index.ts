import { Router } from "express";
import { employeeRoutes } from "../../../modules/employees/presentation/routes";
import { userRoutes } from "../../../modules/users/presentation/routes";

const router = Router();

router.use("/users", userRoutes);

router.use("/employees", employeeRoutes);

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export { router };
