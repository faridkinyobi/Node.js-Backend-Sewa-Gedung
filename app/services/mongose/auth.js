const Users = require("../../api/v1/user/modal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('../../config');
const { BadRequestError400, UnauthorizedError403 } = require("../../error");
// const { createUserRefreshToken } = require('./refreshToken');
const signin = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError400("Please provide email and password");
  }
  const result = await Users.findOne({ email: email });
  if (!result) {
    throw new UnauthorizedError403("Invalid Credentials");
  }

  const isPasswordCorrect = await bcrypt.compare(password, result.password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError403("Invalid Credentials");
  }

  const payload = {
    name: result.name,
    userId: result._id,
    role: result.role,
    email: result.email,
  };
  const token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  });

  //   const refreshToken = createRefreshJWT({ payload: createTokenUser(result) });
  //     await createUserRefreshToken({
  //       refreshToken,
  //       user: result._id,
  //     });
  return { token, role: result.role, email: result.email };
};

module.exports = { signin };
