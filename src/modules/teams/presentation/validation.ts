import Joi from "joi";

export const teamValidationSchema = {
  create: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().allow(null, ""),
  }),

  update: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(2).max(100),
    description: Joi.string().allow(null, ""),
  }),

  delete: Joi.object({
    id: Joi.number().required(),
  }),

  get: Joi.object({
    id: Joi.number().required(),
  }),
};
