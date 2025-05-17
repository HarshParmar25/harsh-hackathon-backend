import Joi from "joi";

export const kudosValidationSchema = {
  get: Joi.object({
    id: Joi.number().required(),
  }),
};
