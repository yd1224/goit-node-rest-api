import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateContactFavotiteState,
} from "../controllers/contactsControllers.js";
import { Router } from "express";
import {
  checkContactExist,
  checkCreateContactData,
  checkUpdateContactData,
  checkUpdateContactFavoriteState,
} from "../middlewares/contactMiddlewares.js";
import { protect } from "../middlewares/userMiddlewares.js";

const contactsRouter = Router();

contactsRouter.use(protect);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", checkContactExist, getOneContact);

contactsRouter.delete("/:id", checkContactExist, deleteContact);

contactsRouter.post("/", checkCreateContactData, createContact);

contactsRouter.put(
  "/:id",
  checkContactExist,
  checkUpdateContactData,
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  checkContactExist,
  checkUpdateContactFavoriteState,
  updateContactFavotiteState
);

export default contactsRouter;
