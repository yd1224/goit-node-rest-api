import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import { Router } from "express";
import {
  checkContactExist,
  checkCreateContactData,
  checkUpdateUserData,
} from "../middlewares/contactMiddlewares.js";

const contactsRouter = Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", checkContactExist, getOneContact);

contactsRouter.delete("/:id", checkContactExist, deleteContact);

contactsRouter.post("/", checkCreateContactData, createContact);

contactsRouter.put(
  "/:id",
  checkContactExist,
  checkUpdateUserData,
  updateContact
);

export default contactsRouter;
