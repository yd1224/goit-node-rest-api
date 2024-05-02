import { nanoid } from "nanoid";
import { Email } from "../services/emailService.js";

export const sendEmail = async (req) => {
    let verificationToken = nanoid();
    try {
        const verifyUrl = `${req.protocol}://${req.get('host')}/users/verify/:${verificationToken}`;
        await new Email(req.body, verifyUrl).sendVerify();
    } catch (err) {
        console.log(err);
        verificationToken = null;
    }

    return verificationToken;
}
