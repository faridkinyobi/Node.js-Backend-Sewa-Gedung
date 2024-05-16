const pembayaran = require("../../api/v1/pembayaran/model");

const { checkingImage } = require("./image");

const { NotFoundError404, BadRequestError400 } = require("../../error");

const getAllPembayaran = async (req) => {
  const result = await pembayaran
    .find()
    .populate([
      {
        path: "BuktiUangMuka",
        select: "_id name",
      },
      {
        path: "BuktiPelunasan",
        select: "_id name",
      },
    ])
    .select("_id status name image Order");
  return result;
};

const createPembayaran = async (req) => {
  const { BuktiUangMuka, BuktiPelunasan, Order } = req.body;

  await checkingImage(BuktiUangMuka);

  const result = new pembayaran({
    Order,
    BuktiUangMuka,
    BuktiPelunasan,
    pelanggan: req.pelanggan.id,
  });

  // Simpan order
  await result.save();
  return result;
};

const getOnePembayaran = async (req) => {
  const { id } = req.params;
  const result = await pembayaran
    .findOne({ Order: id })
    .populate([
      {
        path: "BuktiUangMuka",
        select: "_id name",
      },
      {
        path: "BuktiPelunasan",
        select: "_id name",
      },
    ])
    .select("_id status name image");

  if (!result) throw new BadRequestError400("Bukti Pembayaran Belum di Upload");

  return result;
};

const updatePembayaran = async (req) => {
  const { BuktiPelunasan } = req.body;

  await checkingImage(BuktiPelunasan);

  const check = await pembayaran.find({
    pelanggan: req.pelanggan.id,
  });

  if (!check.length === 0)
    throw new BadRequestError400(
      "silahkan Upload bukti Pembayan uang muka terlebih dahulu "
    );

  const result = await pembayaran.findOneAndUpdate(
    { pelanggan: req.pelanggan.id },
    { BuktiPelunasan },
    { new: true, runValidators: true }
  );

  if (!result) {
    throw new NotFoundError404(
      `Tidak ada tipe pembayaran dengan ID pelanggan: ${req.pelanggan.id}`
    );
  }
  return result;
};

const deletePembayaran = async (req) => {
  const { id } = req.params;

  const result = await pembayaran.findOne({
    _id: id,
  });

  if (!result)
    throw new NotFoundError404(`Tidak ada tipe pembayaran dengan id :  ${id}`);

  await result.deleteOne();

  return result;
};

const checkingPembayaran = async (id) => {
  const result = await pembayaran.findOne({ _id: id });

  if (!result)
    throw new NotFoundError404(`Tidak ada tipe pembayaran dengan id :  ${id}`);

  return result;
};

module.exports = {
  getAllPembayaran,
  createPembayaran,
  getOnePembayaran,
  updatePembayaran,
  deletePembayaran,
  checkingPembayaran,
};
