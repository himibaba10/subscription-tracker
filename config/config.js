import dotenv from "dotenv";
dotenv.config();

export const {
  PORT,
  MOGODB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  SALT,
  ARCJET_ENV,
  ARCJET_KEY,
  QSTASH_URL,
  QSTASH_TOKEN,
  SERVER_URL,
  EMAIL_PASSWORD,
} = process.env;
