import nodemailer from "nodemailer"
import pug from "pug"
import { convert } from "html-to-text"
import path from "path"

export class Email {
    constructor(userData, url) {
        this.to = userData.email;
        this.url = url;
        this.from = process.env.META_USER;
    }

    _initTransport() {
        const emailTransportConfig = {
            host: process.env.META_HOST,
            port: process.env.META_PORT,
            auth: {
                user: process.env.META_USER,
                pass: process.env.META_PASS
            }
        };

        return nodemailer.createTransport(emailTransportConfig);
    }

    async _send(template, subject) {
        const html = pug.renderFile(path.join(process.cwd(), "views", "emails", `${template}.pug`), {
            email: this.to,
            url: this.url,
            subject
        })

        const emailConfig = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: convert(html),
        }

        await this._initTransport().sendMail(emailConfig)
    }

    async sendVerify() {
        await this._send("verifyEmail", "Verify your email")
    }
}