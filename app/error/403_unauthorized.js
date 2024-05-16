const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./costom-error');

class Unauthorized403 extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
module.exports = Unauthorized403;