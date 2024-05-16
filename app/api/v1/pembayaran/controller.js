const { StatusCodes } = require('http-status-codes');

const {
  getAllPembayaran,
  createPembayaran,
  getOnePembayaran,
  updatePembayaran,
  deletePembayaran,
} = require('../../../services/mongose/Pembayaran');

const create = async (req, res, next) => {
  try {
    const result = await createPembayaran(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllPembayaran(req);
    console.log(result)
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};



const find = async (req, res, next) => {
  try {
    const result = await getOnePembayaran(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updatePembayaran(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deletePembayaran(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  index,
  find,
  update,
  destroy,
  create,
};