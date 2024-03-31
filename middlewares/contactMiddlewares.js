import { getContactById } from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";

export const checkContactExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  req.contact = contact;
  next();
});
