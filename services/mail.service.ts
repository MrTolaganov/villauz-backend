import { config } from "dotenv";
import { createTransport, Transporter, TransportOptions } from "nodemailer";
import BaseError from "../errors/base.error";

class MailService {
  private transporter: Transporter;
  constructor() {
    config();
    this.transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    } as TransportOptions);
  }
  async sendActivationLink(email: string, link: string) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: `Villauz: Activation account link ${link}`,
        html: `<div>
         <h1 style="text-align: center; color: green;">Click the button bellow if you want to activate your account.</h1>
        <div style="text-align:center">
         <a href="${link}">
           <button style="padding: 16px 32px 16px 32px; color: white; background-color: green; font-size:24px; cursor:pointer; border:none;">Activate account</button>
         </a>
         </div>
         <h4 style="color: red; text-align: center;">This is available within 15mins.</h4>
        </div>`,
      });
    } catch (error: any) {
      throw BaseError.BadRequest(`${error}`);
    }
  }
  async sendForgotPass(email: string, link: string) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: `Villauz: Recovery Account ${link}`,
        html: `<div>
         <h1 style="text-align: center; color: green;">Click the button bellow if you want to recover your account.</h1>
        <div style="text-align:center">
         <a href="${link}">
           <button style="padding: 16px 32px 16px 32px; color: white; background-color: green; font-size:24px; cursor:pointer; border:none;">Recovery account</button>
         </a>
         </div>
         <h4 style="color: red; text-align: center;">This is available within 15mins.</h4>
        </div>`,
      });
    } catch (error) {
      throw BaseError.BadRequest(`${error}`);
    }
  }
}

export default new MailService();
