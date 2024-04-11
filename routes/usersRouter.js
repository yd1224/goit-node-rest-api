import { Router } from "express";
import { checkCreateUserData } from "../middlewares/userMiddlewares.js";
import { createUser } from "../controllers/userControllers.js";

const usersRouter = Router();

usersRouter.post("/register", checkCreateUserData, createUser);

usersRouter.post("/login", checkLoginUserData, loginUser);

export default usersRouter;
