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
  UpdatePasswordPelanggan,
  activatePelanggan,
  forgotPassword,
  resetPassword,
  deletPelanggan
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

const changPasswordPelanggan = async (req, res, next) => {
  try {
    const result = await UpdatePasswordPelanggan(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
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

const activePelanggan= async (req, res, next) => {
  try {
    const result = await activatePelanggan(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const resetPasswordPelanggan= async (req, res, next) => {
  try {
    const result = await resetPassword(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const forgotPasswordPelanggan= async (req, res, next) => {
  try {
    const result = await forgotPassword(req);
    res.status(StatusCodes.OK).json({
      data: result,
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

const delet = async (req, res, next) => {
  try {
    const result = await deletPelanggan(req);
    res.status(StatusCodes.OK).json({
      data: result,
      msg: "successfully",
    });
  } catch (err) {
    next(err);
  }
};

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
    const { paketId, hargaCetagoriId } = req.body;

    const result = await getOneharga(paketId, hargaCetagoriId);
    res.status(StatusCodes.OK).json({
      data: result.checkHarga,
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
  changPasswordPelanggan,
  activePelanggan,
  forgotPasswordPelanggan,
  resetPasswordPelanggan,
  delet
};
