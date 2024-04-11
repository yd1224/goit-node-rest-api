import { catchAsync } from "../helpers/catchAsync.js";
import { createUserService } from "../services/userServices.js";

export const createUser = catchAsync(async (req, res) => {
  const newUser = await createUserService(req.body);

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
});
