const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./costom-error');

class NotFound404 extends CustomAPIError {
  constructor(message) {
    super(message);
    // memberikan statusCode not found
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
module.exports = NotFound404;