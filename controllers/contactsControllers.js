import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import {
  createContactValidator,
  updateContactValidator,
} from "../helpers/contactValidator.js";
import { Contact } from "../models/contactModel.js";
import { addContact } from "../services/contactsServices.js";
import { listContacts } from "../services/contactsServices.js";
import { changeContact } from "../services/contactsServices.js";
import { removeContact } from "../services/contactsServices.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const list = await Contact.find();

  res.status(200).json(list);
});

export const getOneContact = catchAsync(async (req, res, next) => {
  const { contact } = req;

  res.status(200).json(contact);
});

export const deleteContact = catchAsync(async (req, res, next) => {
  const deletedContact = await Contact.findByIdAndDelete(req.params.id);

  res.status(200).json(deletedContact);
});

export const createContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.create(req.body);

  res.status(201).json(contact);
});

export const updateContact = catchAsync(async (req, res, next) => {
  const { contact, body } = req;

  const updatedContact = await Contact.findByIdAndUpdate(contact.id, body, {
    new: true,
  });

  res.status(200).json(updatedContact);
});
