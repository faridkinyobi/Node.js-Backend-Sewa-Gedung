const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();
const PenyewaRouter = require("./app/api/v1/penyewa/router");
const PelangganRouter = require("./app/api/v1/pelanggan/router");
const JadwalRouter = require("./app/api/v1/jadwal/routes");
const PaketRouter = require("./app/api/v1/pakets/router");
const UserRouter = require("./app/api/v1/user/router");
const AuthRouter = require("./app/api/v1/auth/router");
const OrderRouter = require("./app/api/v1/order/router");
const ImageRouter = require("./app/api/v1/image/router");
const PaymenRouter = require("./app/api/v1/paymen/router");
const PembayaranRouter = require("./app/api/v1/pembayaran/router");
const LaporanRouter = require("./app/api/v1/laporan/router");
//const userRefreshTokenRouter = require('./app/api/v1/userRefreshToken/router');

const notFoundMiddleware = require("./app/middlewares/not-found");
const handleErrorMiddleware = require("./app/middlewares/handler-error");

// view engine setup
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.get("/", (req, res) => {
  res.status(200).json({
    message: "wellcom to event",
  });
});

app.use("/app/v1", PelangganRouter);
app.use("/app/v1/cms", PenyewaRouter);
app.use("/app/v1/cms", PaketRouter);
app.use("/app/v1/cms", JadwalRouter);
app.use("/app/v1/cms", ImageRouter);
app.use("/app/v1/cms", PaymenRouter);
app.use("/app/v1/cms", PembayaranRouter);
app.use("/app/v1/cms", UserRouter);
app.use("/app/v1/cms", AuthRouter);
app.use("/app/v1/cms", OrderRouter);
app.use("/app/v1/cms", LaporanRouter);
//app.use(v1, userRefreshTokenRouter);

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
