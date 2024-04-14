import { catchAsync } from "../helpers/catchAsync.js";
import {
  createContactService,
  deleteContactService,
  getContactsService,
  getOneContactService,
  updateContactService,
  updateStatusContact,
} from "../services/contactServices.js";
import { currentUser } from "./userControllers.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const { list, total } = await getContactsService(req.query, req.user);

  res.status(200).json({ list, total });
});

export const getOneContact = catchAsync(async (req, res, next) => {
  const { contact } = req;
  const { user } = req;
  const gotContact = getOneContactService(contact, user);

  res.status(200).json(gotContact);
});

export const deleteContact = catchAsync(async (req, res, next) => {
  const deletedContact = await deleteContactService(req.params.id);

  res.status(200).json(deletedContact);
});

export const createContact = catchAsync(async (req, res, next) => {
  const owner = req.user;

  const contact = await createContactService(req.body, owner);

  res.status(201).json({ contact });
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
