const CustomAPIError = require('./costom-error');
const BadRequestError400 = require('./400_bad-reques');
const NotFoundError404 = require('./404_not-found');
const UnauthorizedError403 = require('./403_unauthorized');
const UnauthenticatedError401 = require('./401_unauthenticated');

module.exports = {
    CustomAPIError,
    BadRequestError400,
    NotFoundError404,
    UnauthorizedError403,
    UnauthenticatedError401
  };