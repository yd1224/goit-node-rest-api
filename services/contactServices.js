import { Contact } from "../models/contactModel.js";

export const createContactService = async (contactData, owner) => {
  console.log(contactData);
  const contact = await Contact.create({ ...contactData, owner });

  return contact;
};

export const getContactsService = async (userId) => {
  try {
    const list = await Contact.find({ owner: userId }).select("-owner");
    return list;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
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

export const checkFindByIdService = async (id, ownerId) => {
  try {
    const contact = await Contact.findOne({ _id: id, owner: ownerId });
    return contact;
  } catch (error) {
    console.error("Error fetching contact:", error);
    throw error;
  }
};

export const updateStatusContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  return updatedContact;
};
