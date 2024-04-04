import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join("db", "contacts.json");

export async function listContacts() {
  try {
    const readResult = await fs.readFile(contactsPath);
    const parsedRes = JSON.parse(readResult);
    return parsedRes;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function getContactById(contactId) {
  try {
    const contactsArr = await listContacts();
    const contact = contactsArr.find((contact) => contact.id === contactId);
    const result = contact ? contact : null;
    return result;
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function removeContact(contactId) {
  try {
    const contactsArr = await listContacts();
    const contacts = contactsArr.filter((contact) => contact.id !== contactId);
    const deletedContact = await getContactById(contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return deletedContact;
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function addContact(name, email, phone) {
  try {
    const id = nanoid();
    const userObj = await listContacts();
    const newUserObj = { id, name, email, phone };
    userObj.push(newUserObj);
    await fs.writeFile(contactsPath, JSON.stringify(userObj));
    return newUserObj;
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function changeContact(id, value) {
  try {
    const prevContact = await getContactById(id);
    const changedContact = {
      ...prevContact,
      ...value,
    };

    const userList = await listContacts();
    const index = userList.findIndex((contact) => contact.id === id);
    if (index !== -1) {
      userList[index] = changedContact;
    }

    await fs.writeFile(contactsPath, JSON.stringify(userList));

    return changedContact;
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
