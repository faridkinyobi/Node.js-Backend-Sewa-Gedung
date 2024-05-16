const jwt = require('jsonwebtoken');
const { UnauthenticatedError401, UnauthorizedError403 } = require('../error');

const authenticateUser = async (req, res, next) => {
  try {
    let token;
    // check header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      throw new UnauthenticatedError401('Authentication invalid');
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
    
    // melampirkan pengguna dan izin ke objek req
    req.user = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        role: payload.role,
        id: payload.userId,
    };
    next(); 
  } catch (error) {
    next(error);
  }
};
const authenticatePelanggan = async (req, res, next) => {
  try {
    let token;
    // check header
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      throw new UnauthenticatedError401('Authentication invalid');
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
    
    // melampirkan pengguna dan izin ke objek req
    req.pelanggan = {
      email: payload.email,
      lastName: payload.lastName,
      firstName: payload.firstName,
      id: payload.participantId,
    };
    next(); 
  } catch (error) {
    next(error);
  }
};


const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError403('Unauthorized to access this route');
        }
        next();
    };
};

module.exports = { authenticateUser, authorizeRoles, authenticatePelanggan };