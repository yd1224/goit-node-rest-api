import Joi from "joi";
import { joiValidator } from "./validator.js";

export const createContactValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
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
      phone: Joi.string(),
    })
    .validate(data)
);

export const updateContactFavoriteStateValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      favorite: Joi.bool(),
    })
    .validate(data)
);
