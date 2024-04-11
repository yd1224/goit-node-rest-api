import { Contact } from "../models/contactModel.js";

export const createContactService = async (contactData) => {
  const contact = await Contact.create(contactData);

  return contact;
};

export const getContactsService = async () => {
  const list = await Contact.find();

  return list;
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
