import Joi from "joi";
import { UserRole, ActivationStatus } from "../../users/domain/interfaces/interfaces";

export const adminValidation = {
  updateMemberRole: Joi.object({
    memberId: Joi.number().required(),
    role: Joi.string().valid(UserRole.ADMIN, UserRole.TEAM_MEMBER, UserRole.TEAM_LEAD).required(),
  }),
  deleteMember: Joi.object({
    memberId: Joi.number().required(),
  }),
  handleTeamLeadSignup: Joi.object({
    memberId: Joi.number().required(),
    status: Joi.string().valid(ActivationStatus.APPROVED, ActivationStatus.REJECTED).required(),
  }),
};
