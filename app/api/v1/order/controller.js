const {
  getAllOrders,
  totalPending,
  getAllOrdersStatus,
  updateStatusGagal,
  updateStatusSukses,
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
const getAlltotalPending = async (req, res, next) => {
  try {
    const result = await totalPending(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAlltotalOrder = async (req, res, next) => {
  try {
    const result = await totalOrders(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const Statuspending = async (req, res, next) => {
  try {
    const result = await getAllOrdersStatus(req);

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
  getAlltotalPending,
  Statuspending,
  OrderGagal,
  OrderSukses,
  getAlltotalOrder,
  delet,
};
