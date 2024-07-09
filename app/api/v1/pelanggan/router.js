const express = require("express");
const router = express();

const {
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
} = require("./controller");
const {
  createpembayranPelanggan,
  updateaPembayaran,
} = require("../pembayaran/controller");
const { index } = require("../paymen/controller");
const { authenticatePelanggan,authenticateUser,authorizeRoles } = require("../../../middlewares/auth");

router.post("/auth/signup", signup);
router.post("/auth/changPassword", changPasswordPelanggan);
router.post("/auth/signin", signin);
router.put('/active', activePelanggan);
router.put('/forgotPassword', forgotPasswordPelanggan);
router.put('/resetpassword/:resetPasswordLink', resetPasswordPelanggan);
router.post("/checkout", authenticatePelanggan, ChekoutOrder);
router.get("/dashboardPelanggan", authenticatePelanggan, getPelanggan);
router.get("/PeketPelanggan", getPaketPelanggan);
router.get("/NoReken", authenticatePelanggan, index);
router.get("/PeketPelanggan/:id", authenticatePelanggan, getOne);
router.get("/jadwalPelanggan", getJadwalPelanggan);
router.post("/harga", authenticatePelanggan, getharga);
router.get(
  "/dashboardPembayaran",
  authenticatePelanggan,
  getPelangganPembayaran
);
router.post("/pembayaran", authenticatePelanggan, createpembayranPelanggan);
router.put("/pembayaran", authenticatePelanggan,  updateaPembayaran,);
router.delete("/deletPelanggan", authenticateUser,authorizeRoles("super admin"), delet,);
module.exports = router;
