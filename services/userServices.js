import HttpError from "../helpers/HttpError.js";
import { User } from "../models/userModel.js";
import { signToken } from "./jwtServices.js";

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

export const logoutUserService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw Error("Not authorized");
  }

  user.token = null;

  await user.save();
};