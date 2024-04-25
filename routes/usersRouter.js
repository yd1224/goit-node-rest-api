import { Router } from "express";
import {
  checkCreateUserData,
  checkLogInData,
  protect,
  uploadAvatar,
} from "../middlewares/userMiddlewares.js";
import {
  createUser,
  currentUser,
  forgotPassword,
  loginUser,
  logoutUser,
  resetPassword,
  updateUser,
} from "../controllers/userControllers.js";

const usersRouter = Router();

usersRouter.post("/register", checkCreateUserData, createUser);

usersRouter.post("/login", checkLogInData, loginUser);

usersRouter.get("/current", protect, currentUser);

usersRouter.post("/logout", protect, logoutUser);

usersRouter.patch("/avatars", protect, uploadAvatar, updateUser);

usersRouter.post("/forgot-password", forgotPassword);

usersRouter.post("/restore-password/:otp", resetPassword);

export default usersRouter;
