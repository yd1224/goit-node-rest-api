import { catchAsync } from "../helpers/catchAsync.js";
import {
  createUserService,
  loginUserService,
  logoutUserService,
  updateUserService,
} from "../services/userServices.js";

export const createUser = catchAsync(async (req, res) => {
  const { newUser } = await createUserService(req.body);

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
});

export const loginUser = catchAsync(async (req, res) => {
  const { user, token } = await loginUserService(req.body);

  res.status(200).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
    token,
  });
});

export const currentUser = (req, res) => {
  const currentUser = req.user;

  res.status(200).json({
    email: currentUser.email,
    subscription: currentUser.subscription,
  });
};

export const logoutUser = catchAsync(async (req, res) => {
  const id = req.userId;

  await logoutUserService(id);
  res.sendStatus(204);
});

export const updateUser = catchAsync(async (req, res) => {
  // add validator
  const updatedUser = await updateUserService(req.body, req.user, req.file);
  res.status(200).json({
    avatarUrl: updatedUser.avatarUrl,
  });
});
