import Joi from "joi";
import { UserRole } from "../../users/domain/interfaces/interfaces";

export const adminValidation = {
  updateMemberRole: Joi.object({
    role: Joi.string().required().valid(UserRole.TEAM_MEMBER, UserRole.TEAM_LEAD),
    memberId: Joi.number().required(),
  }),
  deleteMember: Joi.object({
    memberId: Joi.number().required(),
  }),
};
