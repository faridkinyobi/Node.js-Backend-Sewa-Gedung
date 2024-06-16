const bcrypt = require("bcryptjs");
const Users = require("../../api/v1/user/modal");
const Pelanggan = require("../../api/v1/pelanggan/model");
const { BadRequestError400, NotFoundError404 } = require("../../error");

const createUsers = async (req) => {
  const { name, password, role, confirmPassword, email } = req.body;
  if (password !== confirmPassword) {
    throw new BadRequestError400(
      "Password dan Konfirmasi password tidak cocok"
    );
  }
  const hashPaswword = await bcrypt.hash(password, 10);
  const result = await Users.create({
    name,
    email,
    password: hashPaswword,
    role,
  });
  delete result._doc.password;
  return result;
};
const changPasswordUser = async (req) => {
  const { email, newPassword, OldPassword, confirmPassword } = req.body;

  if (!newPassword || !OldPassword) {
    throw new BadRequestError400(
      "Please provide  Old password and new password"
    );
  }
  if (newPassword !== confirmPassword) {
    throw new BadRequestError400(
      "Password baru dan Konfirmasi password tidak cocok"
    );
  }

  const result = await Users.findOne({ email: email });

  if (!result) {
    throw new UnauthorizedError403("Admin tidak ditemukan");
  }

  const isPassword = await bcrypt.compare(OldPassword, result.password);

  if (!isPassword) {
    throw new UnauthorizedError403("Password lama tidak cocok");
  }
  const hashPaswword = await bcrypt.hash(newPassword, 10);

  const updatedUsers = await Users.findOneAndUpdate(
    { email },
    { password: hashPaswword },
    { new: true, runValidators: true } // Opsi untuk mengembalikan dokumen yang diperbarui
  );
  delete updatedUsers._doc.password;

  return updatedUsers;
};

const getAllPelanggan = async () => {
  const result = await Pelanggan.find({}, { password: 0 });
  return result;
};
const getTotalPenyewa = async () => {
  const result = await Pelanggan.countDocuments();
  return result;
};

const getAllUser = async () => {
  const result = await Users.find({}, { password: 0 });
  return result;
};
const updateUser = async (req) => {
  const { id } = req.params;
  const { email, role, name } = req.body;

  const check = await Users.findOne({ _id: id });

  if (!check) throw new NotFoundError404(`tidak ada paket dengan id ${id}`);

  const result = await Users.findOneAndUpdate(
    { _id: id },
    {
      email,
      role,
      name,
    },
    { new: true, runValidators: true }
  );
  return result;
};
const getOneUser = async (req) => {
  const { id } = req.params;

  const result = await Users.find({ _id: id }, { password: 0 });

  if (!result) throw new NotFoundError404(`tidak ada paket dengan id ${id}`);
  return result;
};
const deletUser = async (req) => {
  const { id } = req.params;

  const result = await Users.findOne({ _id: id });

  if (!result) throw new NotFoundError404(`tidak ada paket dengan id ${id}`);
  await result.deleteOne();
  return result;
};

module.exports = {
  createUsers,
  getAllUser,
  getAllPelanggan,
  deletUser,
  changPasswordUser,
  updateUser,
  getOneUser,
  getTotalPenyewa
};
