import nodemailer from "nodemailer";
import { EMAIL_PASSWORD } from "./config.js";

export const accountEmail = "himibaba10@gmail.com";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: accountEmail,
    pass: EMAIL_PASSWORD,
  },
});
