const mongoose = require("mongoose");

const HargaCetagoriSchema = new mongoose.Schema({
  kegiatan: {
    type: String,
    required: [true, "Nama Kegiatan harus diisi"],
    minlength: 3,
    maxlength: 50,
  },
  hari: {
    type: String,
    required: [true, "hari kegiatan harus diisi"],
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
});
module.exports = mongoose.model("HargaCetagori", HargaCetagoriSchema);

const DecsCetagoriSchema = new mongoose.Schema({
  detail: {
    type: String,
    required: [true, "Detail harus diisi"],
  },
});

const PaketSchema = new mongoose.Schema(
  {
    titel: {
      type: String,
      required: [true, "titel diisi"],
    },
    fasilitas: {
      type: [DecsCetagoriSchema],
      required: true,
    },
    harga: {
      type: [HargaCetagoriSchema],
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Paket", PaketSchema);
