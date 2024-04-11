import { catchAsync } from "../helpers/catchAsync.js";
import {
  createContactService,
  deleteContactService,
  getContactsService,
  updateContactService,
  updateStatusContact,
} from "../services/contactServices.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const list = await getContactsService();

  res.status(200).json(list);
});

export const getOneContact = catchAsync(async (req, res, next) => {
  const { contact } = req;

  res.status(200).json(contact);
});

export const deleteContact = catchAsync(async (req, res, next) => {
  const deletedContact = await deleteContactService(req.params.id);

  res.status(200).json(deletedContact);
});

export const createContact = catchAsync(async (req, res, next) => {
  const contact = await createContactService(req.body);

  res.status(201).json(contact);
});

export const updateContact = catchAsync(async (req, res, next) => {
  const { contact, body } = req;

  const updatedContact = await updateContactService(contact, body);

  res.status(200).json(updatedContact);
});

export const updateContactFavotiteState = catchAsync(async (req, res, next) => {
  const { contact, body } = req;

  const updatedContactWithNewFavotiteField = await updateStatusContact(
    contact.id,
    body
  );

  res.status(200).json(updatedContactWithNewFavotiteField);
});
