import { Router } from "express";
import {
  checkCreateUserData,
  checkLogInData,
} from "../middlewares/userMiddlewares.js";
import { createUser, loginUser } from "../controllers/userControllers.js";

const usersRouter = Router();

usersRouter.post("/register", checkCreateUserData, createUser);

usersRouter.post("/login", checkLogInData, loginUser);

export default usersRouter;
