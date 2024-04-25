import HttpError from "../helpers/HttpError.js";
import { contactNameHandler } from "../helpers/contactNamesHandler.js";
import { Contact } from "../models/contactModel.js";

export const createContactService = async ({ name, ...restcontactData }, owner) => {
  const contact = await Contact.create({ ...restcontactData, name: contactNameHandler(name), owner: owner.id });

  return contact;
};

export const getContactsService = async (query, user) => {
  if (
    !query.favorite &&
    !query.limit &&
    !query.page &&
    Object.keys(query).length !== 0
  ) {
    throw HttpError(404, "Not found");
  }

  const findOptions = query.favorite ? { favorite: query.favorite } : {};

  if (
    findOptions.favorite !== "true" &&
    findOptions.favorite !== "false" &&
    Object.keys(findOptions).length !== 0
  ) {
    throw HttpError(404, "Not found");
  }

  findOptions.owner = user;

  const listQuery = Contact.find(findOptions);

  const page = query.page ? +query.page : 1;
  const limit = query.limit ? +query.limit : 10;
  const contactsToSkip = (page - 1) * limit;

  listQuery.skip(contactsToSkip).limit(limit);

  const list = await listQuery;
  const total = await Contact.countDocuments(findOptions);

  return { list, total };
};

export const updateContactService = async (contact, body, user) => {
  if (contact.owner.toString() !== user.id) throw HttpError(404, "Not found");

  const updatedContact = await Contact.findByIdAndUpdate(contact.id, body, {
    new: true,
  });

  return updatedContact;
};

export const deleteContactService = async (id, contact, user) => {
  if (contact.owner.toString() !== user.id) throw HttpError(404, "Not found");
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

export const updateStatusContact = async (contact, body, user) => {
  if (contact.owner.toString() !== user.id) throw HttpError(404, "Not found");

  const updatedContact = await Contact.findByIdAndUpdate(contact.id, body, {
    new: true,
  });

  return updatedContact;
};

export const getOneContactService = (contact, user) => {
  if (contact.owner.toString() !== user.id) throw HttpError(404, "Not found");

  return contact;
};
