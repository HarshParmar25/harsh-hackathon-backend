import { Router } from "express";

import { AdminController } from "../controllers/controller";
import { adminValidation } from "../validation";

import { createValidator } from "express-joi-validation";
import { authMiddleware } from "../../../../shared/http/middlewares/authMiddleware";

const validator = createValidator();

const adminRoutes = Router();

adminRoutes.get("/members", authMiddleware, AdminController.getMembers);
adminRoutes.put(
  "/members/",
  authMiddleware,
  validator.body(adminValidation.updateMemberRole),
  AdminController.updateMemberRole
);
adminRoutes.delete(
  "/members/:memberId",
  authMiddleware,
  validator.params(adminValidation.deleteMember),
  AdminController.deleteMember
);
adminRoutes.post(
  "/team-lead-requests/handle",
  authMiddleware,
  validator.body(adminValidation.handleTeamLeadSignup),
  AdminController.handleTeamLeadSignup
);
adminRoutes.get("/team-lead-requests/pending", authMiddleware, AdminController.getPendingTeamLeadRequests);

export { adminRoutes };
