import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import {
  createUserDataValidator,
  logInUserDataValidator,
  verifyUserValidator,
} from "../helpers/userValidator.js";
import { checkToken } from "../services/jwtServices.js";
import {
  checkUserExistsService,
  getUserByIdService,
} from "../services/userServices.js";
import { ImageService } from "../services/imageService.js";

export const checkCreateUserData = catchAsync(async (req, res, next) => {
  const { value, errors } = createUserDataValidator(req.body);

  if (errors) throw HttpError(401, "Invalid user data..", errors);

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

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cbk) => {
//     cbk(null, path.join("tmp"));
//   },
//   filename: (req, file, cbk) => {
//     const extension = file.mimetype.split("/")[1];

//     cbk(null, `${req.user.id}-${v4()}.${extension}`);
//   },
// });

// const multerFilter = (req, file, cbk) => {
//   if (file.mimetype.startsWith("image/")) {
//     cbk(null, true);
//   } else {
//     cbk(HttpError(400, "Upload images"), false);
//   }
// };

// export const uploadAvatar = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
//   limits: {
//     fieldSize: 2 * 1024 * 1024,
//   },
// }).single("avatar");

export const uploadAvatar = ImageService.initUploadImageMiddleware("avatar");

export const checkVerifyUserData = catchAsync(async (req, res, next) => {
  const { value, errors } = verifyUserValidator(req.body);

  if (errors) throw HttpError(400, "missing required field email");

  req.body = value;

  next();
});