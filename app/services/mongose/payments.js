const Payments = require("../../api/v1/paymen/modal");
const Image = require("../../api/v1/image/model");
const { checkingImage } = require("./image");

const { NotFoundError404, BadRequestError400 } = require("../../error");
const { DeletImage } = require("./image");
const getAllPayments = async (req) => {
  const result = await Payments.find()
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id type status image Number");

  return result;
};

const createPayments = async (req) => {
  const { type, image, Number } = req.body;

  await checkingImage(image);

  const check = await Payments.findOne({ type });

  if (check) throw new BadRequestError400("Tipe pembayaran duplikat");

  const result = await Payments.create({
    Number,
    image,
    type,
  });

  return result;
};

const getOnePayments = async (req) => {
  const { id } = req.params;

  const result = await Payments.findOne({
    _id: id,
  })
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id type status image Number ");

  if (!result)
    throw new NotFoundError404(`Tidak ada tipe pembayaran dengan id :  ${id}`);

  return result;
};

const updatePayments = async (req) => {
  const { id } = req.params;
  const { type, image, Number } = req.body;

  await checkingImage(image);

  const check = await Payments.findOne({
    type,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError400("Tipe pembayaran duplikat");

  const result = await Payments.findOneAndUpdate(
    { _id: id },
    { type, image, Number },
    { new: true, runValidators: true }
  );

  if (!result)
    throw new NotFoundError404(`Tidak ada tipe pembayaran dengan id :  ${id}`);

  return result;
};

const deletePayments = async (req) => {
  const { id } = req.params;

  const result = await Payments.findOne({
    _id: id,
  });

  if (!result)
    throw new NotFoundError404(`Tidak ada tipe pembayaran dengan id :  ${id}`);

  await DeletImage(result);

  await result.deleteOne();
  return result;
};

const checkingPayments = async (id) => {
  const result = await Payments.findOne({ _id: id });

  if (!result)
    throw new NotFoundError404(`Tidak ada tipe pembayaran dengan id :  ${id}`);

  return result;
};

module.exports = {
  getAllPayments,
  createPayments,
  getOnePayments,
  updatePayments,
  deletePayments,
  checkingPayments,
};
