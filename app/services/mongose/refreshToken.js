const UserRefreshToken = require("../../api/v1/userRefreshtoken/modal");
const {
  jwtSecret,
  jwtExpiration,
  jwtRefreshTokenSecret,
} = require("../../../app/config");
const Users = require("../../api/v1/user/modal");
const { NotFoundError404 } = require("../../error");

const createUserRefreshToken = async (payload) => {
  const result = await UserRefreshToken.create(payload);

  return result;
};

const getUserRefreshToken = async (req) => {
  const { refreshToken } = req.params;
  const result = await UserRefreshToken.findOne({
    refreshToken,
  });

  if (!result) throw new NotFoundError404(`refreshToken tidak valid `);

  const chek = jwt.verify(result.refreshToken, jwtRefreshTokenSecret);

  const userCheck = await Users.findOne({ email: chek.email });

  const payload = {
    lastName: userCheck.lastName,
    firstName: userCheck.firstName,
    userId: userCheck._id,
    role: userCheck.role,
    email: userCheck.email,
  };
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  });

  return token;
};

module.exports = { createUserRefreshToken, getUserRefreshToken };
