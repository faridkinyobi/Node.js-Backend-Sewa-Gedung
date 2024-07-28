const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    NumberOrder: {
      type: String,
    },
    total: {
      type: Number,
      required: true,
    },
    total_dp: {
      type: Number,
      required: true,
    },
    sisa_pembayaran: {
      type: Number,
      required: true,
    },
    MetPembayaran: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending","proses","sukses","gagal","uang muka"],
      default: "pending",
    },
    pelanggan: {
      type: mongoose.Types.ObjectId,
      ref: "Pelanggan",
      required: true,
    },
    penyewa: {
      type: mongoose.Types.ObjectId,
      ref: "Penyewa",
      required: true,
    },
    jadwal: {
      type: mongoose.Types.ObjectId,
      ref: "Jadwal",
      required: true,
    },
    paket: {
      type: mongoose.Types.ObjectId,
      ref: "Paket",
      required: true,
    },
    historyPaket: {
      title: {
        type: String,
        required: [true, "Judul Paket harus diisi"],
        minlength: 3,
        maxlength: 50,
      },
      kegiatan: {
        type: String,
        required: [true, "kegiatan harus diisi"],
        minlength: 3,
        maxlength: 50,
      },
      hari: {
        type: String,
        required: [true, "hari harus diisi"],
        minlength: 3,
        maxlength: 50,
      },
      warga: {
        type: String,
        required: [true, "warga harus diisi"],
        minlength: 3,
        maxlength: 50,
      },
      hargadetail: {
        type: Number,
        required: [true, "Harga harus diisi"],
        default: 0,
      },
      tgl_mulai: {
        type: Date,
        required: [true, "Tanggal harus diisi"],
      },
      tgl_akhir: {
        type: Date,
      },
      waktu: {
        type: String,
        required: [
          true,
          'Waktu harus diisi dan bernilai "pagi", "siang", atau "malam"',
        ],
      },
      lama_sewa: {
        type: Number,
        default: 1,   
      },
      kegiatan: {
        type: String,
        required: [true, "Kegiatan harus diisi"],
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);
