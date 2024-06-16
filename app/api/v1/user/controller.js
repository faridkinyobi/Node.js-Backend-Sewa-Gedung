const { StatusCodes } = require("http-status-codes");
const {
  changPasswordUser,
  getAllUser,
  updateUser,
  getOneUser,
  deletUser,
  createUsers,
  getAllPelanggan,
  getTotalPenyewa
} = require("../../../services/mongose/user");

const signupAdmin = async (req, res, next) => {
  try {
    const result = await createUsers(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
      msg: "successfully",
    });
  } catch (err) {
    next(err);
  }
};

const changPassword = async (req, res, next) => {
  try {
    const result = await changPasswordUser(req);
    res.status(StatusCodes.OK).json({
      data: result,
      msg: "successfully",
    });
  } catch (err) {
    next(err);
  }
};
const update = async (req, res, next) => {
  try {
    const result = await updateUser(req);
    res.status(StatusCodes.OK).json({
      data: result,
      msg: "successfully",
    });
  } catch (err) {
    next(err);
  }
};
const getAllPel = async (req, res, next) => {
  try {
    const result = await getAllPelanggan(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getTotal = async (req, res, next) => {
  try {
    const result = await getTotalPenyewa(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getAll = async (req, res, next) => {
  try {
    const result = await getAllUser(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const result = await getOneUser(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const delet = async (req, res, next) => {
  try {
    const result = await deletUser(req);
    res.status(StatusCodes.OK).json({
      data: result,
      msg: "successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signupAdmin,
  getAll,
  getAllPel,
  delet,
  changPassword,
  update,
  getOne,
  getTotal
};
