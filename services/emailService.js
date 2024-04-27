import nodemailer from "nodemailer"
import pug from "pug"
import { convert } from "html-to-text"
import path from "path"

export class Email {
    constructor(userData, url) {
        console.log("userData", userData);
        this.to = userData.email;
        this.url = url;
        this.from = "yelyzaveta_demchenko@meta.ua";
    }

    _initTransport() {
        const emailTransportConfig = {
            host: "smtp.meta.ua",
            port: "465",
            auth: {
                user: "yelyzaveta_demchenko@meta.ua",
                pass: "VladDergun05"
            }
        };
        console.log(emailTransportConfig);
        return nodemailer.createTransport(emailTransportConfig);
    }

    async _send(template, subject) {
        console.log(template);
        // const html = pug.renderFile(path.join(process.cwd(), "views", "emails", `${template}.pug`))

        const emailConfig = {
            from: this.from,
            to: this.to,
            subject,
            // html,
            // text: convert(html),
            text: "!",
        }
        console.log("emailConfig", emailConfig);
        await this._initTransport().sendMail(emailConfig)
    }

    async sendVerify() {
        await this._send("verifyEmail", "Verify your email")
    }
}