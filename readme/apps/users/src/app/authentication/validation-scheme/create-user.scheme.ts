import Joi = require("joi");

export const createUserValidationScheme = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  surname: Joi.string(),
  password: Joi.string(),
});
