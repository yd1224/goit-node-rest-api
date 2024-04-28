import { Router } from "express";
import {
  checkCreateUserData,
  checkLogInData,
  checkVerifyUserData,
  protect,
  uploadAvatar,
} from "../middlewares/userMiddlewares.js";
import {
  createUser,
  currentUser,
  loginUser,
  logoutUser,
  updateUser,
  verifyEmail,
  verifyUser,
} from "../controllers/userControllers.js";

const usersRouter = Router();

usersRouter.post("/register", checkCreateUserData, createUser);

usersRouter.post("/login", checkLogInData, loginUser);

usersRouter.get("/current", protect, currentUser);

usersRouter.post("/logout", protect, logoutUser);

usersRouter.patch("/avatars", protect, uploadAvatar, updateUser);

usersRouter.get("/verify/:verificationToken", verifyEmail);

usersRouter.post("/verify", checkVerifyUserData, verifyUser);

export default usersRouter;
