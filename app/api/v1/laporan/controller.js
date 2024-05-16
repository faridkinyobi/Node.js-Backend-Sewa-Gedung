const { StatusCodes } = require("http-status-codes");
const {
  getOneLaporan,
  CreatLaporan,
  updatLaporan,
  getAll,
  deleteLaporan
} = require("../../../services/mongose/Laporan");

const create = async (req, res, next) => {
  try {
    const result = await CreatLaporan(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
      msg: "successfully",
    });
  } catch (err) {
    next(err);
  }
};


const getOne = async (req, res, next) => {
  try {
    const result = await getOneLaporan(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateLaporan(req);
    res.status(StatusCodes.OK).json({
      data: result,
      msg: "successfully",
    });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAll(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const destroy = async (req, res, next) => {
  try {
    const result = await deletLaporan(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  create,
  getOne,
  index,
  getOne,
  destroy,
  update
};
