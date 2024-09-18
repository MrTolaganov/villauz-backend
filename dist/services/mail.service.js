"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const nodemailer_1 = require("nodemailer");
const base_error_1 = __importDefault(require("../errors/base.error"));
class MailService {
    constructor() {
        (0, dotenv_1.config)();
        this.transporter = (0, nodemailer_1.createTransport)({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }
    sendActivationLink(email, link) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.transporter.sendMail({
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
            }
            catch (error) {
                throw base_error_1.default.BadRequest(`${error}`);
            }
        });
    }
    sendForgotPass(email, link) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.transporter.sendMail({
                    from: process.env.SMTP_USER,
                    to: email,
                    subject: `Villauz: Forgot password`,
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
            }
            catch (error) {
                throw base_error_1.default.BadRequest(`${error}`);
            }
        });
    }
}
exports.default = new MailService();
