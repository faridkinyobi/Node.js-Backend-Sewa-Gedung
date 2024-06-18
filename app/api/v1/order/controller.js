const {
  getAllOrders,
  totalStatusPending,
  totalStatusSukses,
  getAllOrdersStatus,
  updateStatusGagal,
  updateStatusSukses,
  updateStatusUangDP,
  totalOrders,
  deletOrder,
} = require("../../../services/mongose/orders.js");

const { StatusCodes } = require("http-status-codes");

const getAll = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);
    res.status(StatusCodes.OK).json({
      data: { order: result.data, pages: result.pages, total: result.total },
    });
  } catch (err) {
    next(err);
  }
};

const getAllPending = async (req, res, next) => {
  try {
    const result = await getAllOrdersStatus(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const totalSukses = async (req, res, next) => {
  try {
    const result = await totalStatusSukses(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const totalPending = async (req, res, next) => {
  try {
    const result = await totalStatusPending(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const OrderGagal = async (req, res, next) => {
  try {
    const result = await updateStatusGagal(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const OrderSukses = async (req, res, next) => {
  try {
    const result = await updateStatusSukses(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const OrderStatusDP = async (req, res, next) => {
  try {
    const result = await updateStatusUangDP(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const delet = async (req, res, next) => {
  try {
    const result = await deletOrder(req);
    res.status(StatusCodes.OK).json({
      data: result,
      msg: "successfully",
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getAll,
  getAllPending,
  delet,
  OrderGagal,
  OrderStatusDP,
  OrderSukses,
  totalPending,
  totalSukses
};
