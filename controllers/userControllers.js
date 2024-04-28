import { nanoid } from "nanoid";
import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import { User } from "../models/userModel.js";
import {
  createUserService,
  getUserByEmailService,
  loginUserService,
  logoutUserService,
  updateUserService,
  verifyEmailService,
} from "../services/userServices.js";
import { Email } from "../services/emailService.js";
import { sendEmail } from "../helpers/sendEmail.js";

export const createUser = catchAsync(async (req, res) => {
  const verificationToken = await sendEmail(req);

  const { newUser } = await createUserService(req.body, verificationToken);

  res.status(200).json({
    msg: "Instructions sent via email"
  })

});

export const loginUser = catchAsync(async (req, res) => {
  const { user, token } = await loginUserService(req.body);

  res.status(200).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
    token,
  });
});

export const currentUser = (req, res) => {
  const currentUser = req.user;

  res.status(200).json({
    email: currentUser.email,
    subscription: currentUser.subscription,
  });
};

export const logoutUser = catchAsync(async (req, res) => {
  const id = req.userId;

  await logoutUserService(id);
  res.sendStatus(204);
});

export const updateUser = catchAsync(async (req, res) => {
  // add validator
  const updatedUser = await updateUserService(req.body, req.user, req.file);
  res.status(200).json({
    avatarUrl: updatedUser.avatarURL,
  });
});

// export const forgotPassword = catchAsync(async (req, res) => {
// const user = await getUserByEmailService(req.body.email);

// if (!user) return res.status(200)

// const otp = user.createPasswordResetToken();

// try {
//   const emailTransport = nodemailer.createTransport({
//     host: process.env.META_HOST,
//     port: +process.env.META_PORT,
//     auth: {
//       user: process.env.META_USER,
//       pass: process.env.META_PASS
//     }
//   });

//   const emailConfig = {
//     from: "Phone Book app <example@gmail.com>",
//     to: "test@example.com",
//     subject: "Password reset testing",
//     html: "<>Test email</>"
//   }

//   await emailTransport.sendMail(emailConfig);
// } catch (err) {

// }

// await user.save();

// res.status(200).json({
//   msg: "Instructions sent via email"
// })
// })

export const verifyEmail = catchAsync(async (req, res) => {
  await verifyEmailService(req.params.verificationToken.replace(/:/g, ''));

  res.sendStatus(200);
})

export const verifyUser = catchAsync(async (req, res) => {
  const user = await getUserByEmailService(req.body.email);

  if (!user) throw HttpError(400, "Not authorized");

  if (user.verify === false) {
    sendEmail(req);

    res.status(200).json({
      msg: "Instructions sent via email"
    })
  }
  else {
    res.status(400).json({
      message: "Verification has already been passed"
    })
  }

})
