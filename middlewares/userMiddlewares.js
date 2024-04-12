import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import {
  createUserDataValidator,
  logInUserDataValidator,
} from "../helpers/userValidator.js";
import { checkUserExistsService } from "../services/userServices.js";

export const checkCreateUserData = catchAsync(async (req, res, next) => {
  const { value, errors } = createUserDataValidator(req.body);

  if (errors) throw HttpError(400, "Invalid user data..", errors);

  const userExists = await checkUserExistsService({ email: value.email });

  if (userExists) throw HttpError(409, "Email in use");

  req.body = value;

  next();
});

export const checkLogInData = catchAsync(async (req, res, next) => {
  const { value, errors } = logInUserDataValidator(req.body);

  if (errors) throw HttpError(401, "Unauthorized");

  req.body = value;

  next();
});
