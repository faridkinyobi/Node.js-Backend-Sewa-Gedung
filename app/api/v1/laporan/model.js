const mongoose = require("mongoose");

let LaporanSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    petugas: {
        type: String,
        required: true,
      },
    desc: {
        type: String,
      },
    pemasukan: {
      type: Number,
      required: true,
    },
    pengeluaran: {
      type: Number,
    },
    Saldo: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Laporan", LaporanSchema);
