import { catchAsync } from "../helpers/catchAsync.js";
import { Contact } from "../models/contactModel.js";

export const home = (req, res) => {
    res.status(200).render("home", {
        title: "Contacts app home page!!!!",
        active: "home",
    });
}

export const contactsPage = catchAsync(async (req, res) => {
    const contacts = await Contact.find().populate("owner");

    res.status(200).render("contacts", {
        title: "Contacts list page!!!!",
        active: "contacts",
        contacts
    });
})

