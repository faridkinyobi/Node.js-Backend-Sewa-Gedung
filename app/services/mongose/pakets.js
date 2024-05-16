const Paket = require("../../api/v1/pakets/model");

const { BadRequestError400, NotFoundError404 } = require("../../error");

const CreatPaket = async (req) => {
  //oke
  const { titel, harga, fasilitas } = req.body;

  const check = await Paket.findOne({ titel });
  if (check) throw new BadRequestError400("nama duplikat");

  const result = await Paket.create({
    titel,
    fasilitas,
    harga,
  });

  return result;
};

const updatePaket = async (req) => {
  const { id } = req.params;
  const { titel, harga, fasilitas } = req.body;

  const check = await Paket.findOne({ _id: id }).lean();

  if (!check) throw new NotFoundError404(`tidak ada paket dengan id ${id}`);

  const result = await Paket.findOneAndUpdate(
    { _id: id },
    {
      titel,
      fasilitas,
      harga,
    },
    { new: true, runValidators: true }
  );
  return result;
};

const getAllPaket = async () => {
  const result = await Paket.find();

  return result;
};

const getOnePaket = async (req) => {
  const { id } = req.params;

  const result = await Paket.findOne({ _id: id }).lean();

  if (!result) throw new NotFoundError404(`tidak ada paket dengan id ${id}`);

  return result;
};

const deletPaket = async (req) => {
  const { id } = req.params;

  const result = await Paket.findOne({ _id: id });
  if (!result) throw new NotFoundError404(`tidak ada paket dengan id ${id}`);

  await result.deleteOne();

  return result;
};

module.exports = {
  CreatPaket,
  deletPaket,
  getOnePaket,
  getAllPaket,
  updatePaket,
};
