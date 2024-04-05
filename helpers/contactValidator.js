import Joi from "joi";
import { joiValidator } from "./validator.js";

export const createContactValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .regex(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
        .required(),
      favorite: Joi.bool(),
    })
    .validate(data)
);

export const updateContactValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email(),
      phone: Joi.string().regex(
        /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
      ),
      favorite: Joi.bool(),
    })
    .validate(data)
);
