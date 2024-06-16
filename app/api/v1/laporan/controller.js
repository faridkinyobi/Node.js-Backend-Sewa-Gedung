const { StatusCodes } = require("http-status-codes");
const {
  getOneLaporan,
  CreatPengeluaran,
  updatLaporan,
  getAll,
  deletLaporan,
} = require("../../../services/mongose/Laporan");

const create = async (req, res, next) => {
  try {
    const result = await CreatPengeluaran(req);
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
      data: {
        data: result.data,
        pages: result.pages,
        total: result.total,
        totalDebit: result.totalDebit,
        totalKredit: result.totalKredit,
        saldo: result.saldo,
      },
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
  update,
};
