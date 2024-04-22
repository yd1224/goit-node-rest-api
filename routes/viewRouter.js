import { Router } from "express"
import { contactsPage, home } from "../controllers/viewController.js";

export const viewRouter = Router();

viewRouter.get("/home", home);
viewRouter.get("/contacts", contactsPage);

