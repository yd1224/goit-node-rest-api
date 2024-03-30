import { addContact } from "../services/contactsServices.js";
import { listContacts } from "../services/contactsServices.js";
import { getContactById } from "../services/contactsServices.js";
import { changeContact } from "../services/contactsServices.js";
import { removeContact } from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  try {
    const list = await listContacts();
    res.status(200).json({
      ...list,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getOneContact = async (req, res) => {
  try {
    const { user } = req;
    res.status(200).json({
      ...user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await removeContact(id);
    res.status(200).json({
      ...deletedUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newUser = await addContact(name, email, phone);
    res.status(201).json({
      ...newUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await changeContact(id, req);
    res.status(200).json({
      ...updatedUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
