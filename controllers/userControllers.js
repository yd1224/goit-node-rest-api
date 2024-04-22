import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import { User } from "../models/userModel.js";
import {
  createUserService,
  getUserByEmailService,
  loginUserService,
  logoutUserService,
  resetPasswordService,
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
    avatarUrl: updatedUser.avatarURL,
  });
});

export const forgotPassword = catchAsync(async (req, res) => {
  const user = await getUserByEmailService(req.body.email);

  if (!user) return res.status(200)

  const otp = user.createPasswordResetToken();
  console.log(otp);
  await user.save();

  res.status(200).json({
    msg: "Instructions sent via email"
  })
})

export const resetPassword = catchAsync(async (req, res) => {
  //password validator

  await resetPasswordService(req.params.otp, req.body.password);

  res.sendStatus(200);
})