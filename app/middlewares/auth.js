const jwt = require("jsonwebtoken");
const { UnauthenticatedError401, UnauthorizedError403 } = require("../error");

const authenticateUser = async (req, res, next) => {
  try {
    let token;
    // check header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new UnauthenticatedError401("Authentication invalid");
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // melampirkan pengguna dan izin ke objek req
    req.user = {
      name: payload.name,
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

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new UnauthenticatedError401("Authentication invalid");
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // melampirkan pengguna dan izin ke objek req
    req.pelanggan = {
      email: payload.email,
      lastName: payload.lastName,
      firstName: payload.firstName,
      id: payload.pelangganId,
    };
    next();
  } catch (error) {
    next(error);
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError403("Unauthorized to access this route");
    }
    next();
  };
};

const verifyToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded;
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new UnauthenticatedError401(
        "Token reset password sudah kadaluarsa. Silakan minta tautan reset password baru."
      );
    }
    throw new UnauthenticatedError401(
      "Token reset password tidak valid. Silakan minta tautan reset password baru."
    );
  }
};

module.exports = {
  authenticateUser,
  authorizeRoles,
  authenticatePelanggan,
  verifyToken,
};
