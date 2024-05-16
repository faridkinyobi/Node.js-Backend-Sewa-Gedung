const { StatusCodes } = require("http-status-codes");
const {
  signinPelanggan,
  getAllJadwalPelanggan,
  getAllDasboardPelangan,
  getAllPaketPelanggan,
  signupPelanggan,
  checkOut,
  getOnePaket,
  getAllDasboardPembayaran,
  getOneharga,
} = require("../../../services/mongose/Pelanggan");



const signup = async (req, res, next) => {
  try {
    const result = await signupPelanggan(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
      msg: "successfully",
    });
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const result = await signinPelanggan(req);

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
    const result = await getOnePaket(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// const update = async (req, res, next) => {
//   try {
//     const result = await updatePenyewa(req);
//     res.status(StatusCodes.OK).json({
//       data: result,
//       msg: "successfully",
//     });
//   } catch (err) {
//     next(err);
//   }
// };

const getPaketPelanggan = async (req, res, next) => {
  try {
    const result = await getAllPaketPelanggan(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getJadwalPelanggan = async (req, res, next) => {
  try {
    const result = await getAllJadwalPelanggan(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getPelanggan = async (req, res, next) => {
  try {
    const result = await getAllDasboardPelangan(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getPelangganPembayaran = async (req, res, next) => {
  try {
    const result = await getAllDasboardPembayaran(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getharga = async (req, res, next) => {
  try {
    const result = await getOneharga(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const ChekoutOrder = async (req, res, next) => {
  try {
    const result = await checkOut(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signin,
  signup,
  getPelanggan,
  getJadwalPelanggan,
  getPaketPelanggan,
  ChekoutOrder,
  getOne,
  getPelangganPembayaran,
  getharga,
};
