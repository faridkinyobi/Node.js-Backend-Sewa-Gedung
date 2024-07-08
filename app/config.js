const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  urlDb: process.env.URL_MONGODB_DEV,
  jwtSecret: process.env.JWT_SECRET_KEY,
  jwtExpiration: process.env.JWT_EXPIRATION,
  SmtpUsergmail: process.env.SMTP_USER_GMAIL,
  SmtpPassword: process.env.SMTP_PASSWORD,
  SmtpHost: process.env.SMTP_HOST,
  SmtpPort: process.env.SMTP_PORT,
  jwtRefreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
  jwtExpirationForgot: process.env.JWT_EXPIRATION_FORGOT,
  urlClient: process.env.URL_CLIENT,
};