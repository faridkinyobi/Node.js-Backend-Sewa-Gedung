const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./costom-error');

class UnauthenticatedError401 extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnauthenticatedError401;