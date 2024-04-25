import HttpError from "../helpers/HttpError.js";
import { User } from "../models/userModel.js";
import { ImageService } from "./imageService.js";
import { signToken } from "./jwtServices.js";
import crypto from "crypto";

export const checkUserExistsService = (filter) => {
  return User.exists(filter);
};

export const createUserService = async (userData) => {
  const newUser = await User.create(userData);

  // const token = signToken(newUser.id);

  return { newUser };
};

export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) throw HttpError(401, "Email or password is wrong");

  const passwordIsValid = await user.checkUserPassword(password, user.password);

  if (!passwordIsValid) throw HttpError(401, "Email or password is wrong");

  const token = signToken(user.id);

  user.token = token;
  await user.save();

  return { user, token };
};

export const getUserByIdService = (id) => {
  return User.findById(id);
};

export const getUserByEmailService = (email) => {
  return User.findOne({ email });
};

export const logoutUserService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw Error("Not authorized");
  }

  user.token = null;

  await user.save();
};

export const updateUserService = async (userData, user, file) => {
  if (file) {
    // user.avatarUrl = file.path.replace("public", "");

    user.avatarURL = await ImageService.saveImage(file, {
      maxFileSize: 2,
      width: 250,
      height: 250
    }, "public",
      "avatars"
    )
  }

  Object.keys(userData).forEach((key) => {
    user[key] = userData[key];
  });

  return user.save();
};

export const resetPasswordService = async (otp, newPassword) => {
  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

  const user = await User.findOne({
    passwordResetToken: otpHash,
    passwordResetTokenExp: { $gt: Date.now() }
  })

  if (!user) throw HttpError(400, "Token is invalid...");

  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExp = undefined;

  await user.save();
}
