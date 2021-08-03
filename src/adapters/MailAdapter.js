import nodemailer from "nodemailer";
import {
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_SERVER,
  SMTP_USERNAME,
} from "../../keys.js";

const transporter = nodemailer.createTransport({
  host: SMTP_SERVER,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
});

export default class MailAdapter {
  static sendMail(to, subject, mail) {
    return transporter.sendMail({
      from: `"E-Commerce" <${SMTP_USERNAME}>`,
      to: to,
      subject: subject,
      text: mail,
    });
  }
}
