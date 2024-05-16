const mongoose = require("mongoose");

let LaporanSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
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
    totalPemasukan: {
      type: Number,
      required: true,
    },
    totalPengeluaran: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Laporan", LaporanSchema);
