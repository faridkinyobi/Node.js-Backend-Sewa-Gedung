const Penyewa = require("../../api/v1/penyewa/model");
// const Order =require("../../api/v1/order/modal")

const { BadRequestError400, NotFoundError404 } = require("../../error");

const CreatPenyewa = async (req) => {
  const { name, no_tlp, email, no_ktp, alamat } = req.body;

  const check = await Penyewa.findOne({ name, email});

  if (check) throw new BadRequestError400("Penyewa nama end email duplikat");
  
  if(no_tlp.length !== 12) throw new BadRequestError400("Nomor telepon harus sepanjang 12 karakter");
  
  const result = await Penyewa.create({
    no_tlp,
    name,
    alamat,
    email,
    no_ktp,
  });

  return result;
};

const updatePenyewa = async (req) => {
  const { id } = req.params;
  const { name, no_tlp, email, alamat } = req.body;

  const check = await Penyewa.findOne({ _id: id });
  if (!check) throw new NotFoundError404(`tidak ada penyewa dengan id ${id}`);
  
  if(no_tlp.length !== 12) throw new BadRequestError400("Nomor telepon harus sepanjang 12 karakter");
  
  const result = await Penyewa.findOneAndUpdate(
    { _id: id },
    {
      name,
      no_tlp,
      email,
      alamat,
    },
    { new: true, runValidators: true }
  );

  return result;
};

const getAllPenyewa = async () => {
  const result = await Penyewa.find();
  return result;
};
const getTotalPenyewa = async (req) => {
  const result = await Penyewa.countDocuments();
  return result;
};

const getOnePenyewa = async (req) => {
  const { id } = req.params;

  const result = await Penyewa.findOne({ _id: id });

  if (!result) throw new NotFoundError404(`tidak ada penyewa dengan id ${id}`);

  return result;
};

const deletPenyewa = async (req) => {
  const { id } = req.params;

  const result = await Penyewa.findOne({ _id: id });

  if (!result) throw new NotFoundError404(`tidak ada penyewa dengan id ${id}`);

  await result.deleteOne();

  return result;
};

module.exports = {
  CreatPenyewa,
  getOnePenyewa,
  getAllPenyewa,
  updatePenyewa,
  deletPenyewa,
  getTotalPenyewa,
};
