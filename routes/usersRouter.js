import { Router } from "express";
import {
  checkCreateUserData,
  checkLogInData,
  protect,
} from "../middlewares/userMiddlewares.js";
import {
  createUser,
  currentUser,
  loginUser,
} from "../controllers/userControllers.js";

const usersRouter = Router();

usersRouter.post("/register", checkCreateUserData, createUser);

usersRouter.post("/login", checkLogInData, loginUser);

usersRouter.get("/current", protect, currentUser);

export default usersRouter;
