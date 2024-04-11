import { User } from "../models/userModel.js";

export const checkUserExistsService = (filter) => {
  return User.exists(filter);
};

export const createUserService = async (userData) => {
  const newUser = await User.create(userData);

  return newUser;
};
