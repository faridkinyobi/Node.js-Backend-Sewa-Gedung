// import http-status-codes
const { StatusCodes } = require('http-status-codes');
// import custom-api
const CustomAPIError = require('./costom-error');

class BadRequest400 extends CustomAPIError {
  constructor(message) {
    super(message);
    // memberikan statusCode bad request
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
module.exports = BadRequest400;