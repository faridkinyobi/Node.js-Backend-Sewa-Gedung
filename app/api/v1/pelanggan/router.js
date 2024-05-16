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
  getharga
} = require("./controller");

const { authenticatePelanggan } = require("../../../middlewares/auth");

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.post("/checkout", authenticatePelanggan, ChekoutOrder);
router.get("/dashboardPelanggan", authenticatePelanggan, getPelanggan);
router.get("/PeketPelanggan", getPaketPelanggan);
router.get("/PeketPelanggan/:id", authenticatePelanggan, getOne);
router.get("/jadwalPelanggan", getJadwalPelanggan);
router.post("/harga", authenticatePelanggan, getharga);
router.get(
  "/dashboardPembayaran",
  authenticatePelanggan,
  getPelangganPembayaran
);
module.exports = router;
