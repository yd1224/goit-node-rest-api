import { catchAsync } from "../helpers/catchAsync.js";
import {
  createUserService,
  loginUserService,
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
