const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  urlDb: process.env.URL_MONGODB_DEV,
  jwtSecret: process.env.JWT_SECRET_KEY,
  jwtExpiration: process.env.JWT_EXPIRATION,
  gmail: process.env.GMAIL,
  password: process.env.PASSWORD,
  HostGmail: process.env.HOST_GMAIL,
  PortGmailHost: process.env.PORT_GMAIL,
  jwtRefreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
  jwtExpirationForgot: process.env.JWT_EXPIRATION_FORGOT,
  urlClient: process.env.URL_CLIENT,
};