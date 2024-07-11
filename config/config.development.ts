import { Dialect } from 'sequelize/types';
import * as process from "node:process";

export const config = {
  database: {
    dialect: 'mysql' as Dialect,
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    logging: false,
  },
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
  expiresIn: process.env.JWT_EXPIRES_IN,
  secret: process.env.JWT_SECRET,
  emailConfig: {
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    fromEmail: process.env.EMAIL_FROM,
  },
  applicationRedirectUrl: process.env.APPLICATION_REDIRECT_URL,
  ttl: process.env.TTL,
  limit: process.env.LIMIT,
  privateKey: process.env.JWT_PRIVATE_KEY,
  publicKey: process.env.JWT_PUBLIC_KEY,
  sendGridApiKey: process.env.SENDGRID_API_KEY,
  port: process.env.PORT,
};
