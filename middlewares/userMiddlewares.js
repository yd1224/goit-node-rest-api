import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import {
  createUserDataValidator,
  logInUserDataValidator,
} from "../helpers/userValidator.js";
import { checkToken } from "../services/jwtServices.js";
import {
  checkUserExistsService,
  getUserByIdService,
} from "../services/userServices.js";

export const checkCreateUserData = catchAsync(async (req, res, next) => {
  const { value, errors } = createUserDataValidator(req.body);

  if (errors) throw HttpError(400, "Invalid user data..", errors);

  const userExists = await checkUserExistsService({ email: value.email });

  if (userExists) throw HttpError(409, "Email in use");

  req.body = value;

  next();
});

export const checkLogInData = (req, res, next) => {
  const { value, errors } = logInUserDataValidator(req.body);

  if (errors) throw HttpError(401, "Unauthorized");

  req.body = value;

  next();
};

export const protect = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer ") &&
    req.headers.authorization.split(" ")[1];

  const userId = checkToken(token);

  if (!userId) throw HttpError(401, "Unauthorized");

  const currentUser = await getUserByIdService(userId);

  if (!currentUser) throw HttpError(401, "Unauthorized");

  req.user = currentUser;
  req.userId = userId;

  next();
});
