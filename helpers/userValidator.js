import Joi from "joi";
import { joiValidator } from "./validator.js";
import { userSubscription } from "../constants/userSubscription.js";

export const createUserDataValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      subscription: Joi.string().valid(...Object.values(userSubscription)),
      token: Joi.string(),
    })
    .validate(data)
);
