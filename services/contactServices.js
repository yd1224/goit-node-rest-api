import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/contactModel.js";

export const createContactService = async (contactData, owner) => {
  const contact = await Contact.create({ ...contactData, owner: owner.id });

  return contact;
};

export const getContactsService = async (query, user) => {
  const findOptions = query.favorite ? { favorite: query.favorite } : {};

  findOptions.owner = user;

  const list = await Contact.find(findOptions);

  return { list, total: list.length };
};

export const updateContactService = async (contact, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contact.id, body, {
    new: true,
  });

  return updatedContact;
};

export const deleteContactService = async (id) => {
  const deletedContact = await Contact.findByIdAndDelete(id);

  return deletedContact;
};

export const checkContactExistService = async (filter) => {
  const contactExists = await Contact.exists(filter);

  return contactExists;
};

export const checkFindByIdService = async (id) => {
  const contact = await Contact.findById(id);

  return contact;
};

export const updateStatusContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  return updatedContact;
};

export const getOneContactService = (contact, user) => {
  if (contact.owner.toString() !== user.id) throw HttpError(404, "Not found");

  return contact;
};
