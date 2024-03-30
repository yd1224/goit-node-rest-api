import { addContact } from "../services/contactsServices.js";
import { listContacts } from "../services/contactsServices.js";
import { getContactById } from "../services/contactsServices.js";
import { changeContact } from "../services/contactsServices.js";
import { removeContact } from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const list = await listContacts();
  res.status(200).json({
    ...list,
  });
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const user = await getContactById(id);
  res.status(200).json({
    ...user,
  });
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await removeContact(id);
  res.status(200).json({
    ...deletedUser,
  });
};

export const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const newUser = await addContact(name, email, phone);
  res.status(201).json({
    ...newUser,
  });
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await changeContact(id, req);
  res.status(200).json({
    ...updatedUser,
  });
};
