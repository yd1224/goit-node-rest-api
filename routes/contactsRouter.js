import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import { Router } from "express";
import { checkContactExist } from "../middlewares/contactMiddlewares.js";

const contactsRouter = Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", checkContactExist, getOneContact);

contactsRouter.delete("/:id", checkContactExist, deleteContact);

contactsRouter.post("/", createContact);

contactsRouter.put("/:id", checkContactExist, updateContact);

export default contactsRouter;
