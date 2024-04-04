import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import {
  createContactValidator,
  updateContactValidator,
} from "../helpers/contactValidator.js";
import { addContact } from "../services/contactsServices.js";
import { listContacts } from "../services/contactsServices.js";
import { changeContact } from "../services/contactsServices.js";
import { removeContact } from "../services/contactsServices.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const list = await listContacts();
  res.status(200).json({
    ...list,
  });
});

export const getOneContact = catchAsync(async (req, res, next) => {
  const { contact } = req;
  res.status(200).json({
    ...contact,
  });
});

export const deleteContact = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deletedUser = await removeContact(id);
  res.status(200).json({
    ...deletedUser,
  });
});

export const createContact = catchAsync(async (req, res, next) => {
  const { value, errors } = createContactValidator(req.body);
  const { name, email, phone } = value;

  if (errors) {
    throw HttpError(400, "Invalid user data", errors);
  }

  const newUser = await addContact(name, email, phone);
  res.status(201).json({
    ...newUser,
  });
});

export const updateContact = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { value, errors } = updateContactValidator(req.body);

  if (errors) {
    throw HttpError(400, "Invalid user data", errors);
  }

  if (Object.keys(value).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }

  const updatedUser = await changeContact(id, value);
  res.status(200).json({
    ...updatedUser,
  });
});
