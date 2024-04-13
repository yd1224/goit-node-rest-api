import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import {
  createContactValidator,
  updateContactFavoriteStateValidator,
  updateContactValidator,
} from "../helpers/contactValidator.js";
import { Types } from "mongoose";
import {
  checkContactExistService,
  checkFindByIdService,
} from "../services/contactServices.js";

export const checkCreateContactData = catchAsync(async (req, res, next) => {
  const { value, errors } = createContactValidator(req.body);

  if (errors) {
    throw HttpError(400, "Invalid contact data", errors);
  }

  const contactExists = await checkContactExistService({ phone: value.phone });

  if (contactExists) {
    throw HttpError(409, "Contact with that number already exists...", errors);
  }

  next();
});

export const checkUpdateContactData = (req, res, next) => {
  const { value, errors } = updateContactValidator(req.body);

  if (errors) {
    throw HttpError(400, "Invalid contact data", errors);
  }

  if (Object.keys(value).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }

  next();
};

export const checkContactExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const isIdValid = Types.ObjectId.isValid(id);

  if (!isIdValid) {
    throw HttpError(404, "Not found");
  }

  const contact = await checkFindByIdService(id, req.userId);

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  req.contact = contact;

  next();
});

export const checkUpdateContactFavoriteState = (req, res, next) => {
  const { value, errors } = updateContactFavoriteStateValidator(req.body);

  if (errors) {
    throw HttpError(400, "Invalid contact data", errors);
  }

  if (Object.keys(value).length === 0 || Object.keys(value).length > 1) {
    throw HttpError(400, "Body must have one field");
  }

  next();
};
