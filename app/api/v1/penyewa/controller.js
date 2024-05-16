const { StatusCodes } = require("http-status-codes");
const {
  CreatPenyewa,
  getAllPenyewa,
  getOnePenyewa,
  updatePenyewa,
  deletPenyewa,
  getTotalPenyewa,
} = require("../../../services/mongose/penyewa");

const Creat = async (req, res, next) => {
  try {
    const result = await CreatPenyewa(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
      msg: "successfully",
    });
  } catch (err) {
    next(err);
  }
};
const update = async (req, res, next) => {
  try {
    const result = await updatePenyewa(req);
    res.status(StatusCodes.OK).json({
      data: result,
      msg: "successfully",
    });
  } catch (err) {
    next(err);
  }
};
const getAll = async (req, res, next) => {
  try {
    const result = await getAllPenyewa(req);
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

const getOne = async (req, res, next) => {
  try {
    const result = await getOnePenyewa(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const delet = async (req, res, next) => {
  try {
    const result = await deletPenyewa(req);
    res.status(StatusCodes.OK).json({
      data: result,
      msg: "successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  Creat,
  getOne,
  getAll,
  update,
  delet,
  getTotal
};
