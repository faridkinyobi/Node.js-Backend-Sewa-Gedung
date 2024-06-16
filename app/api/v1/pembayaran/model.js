const mongoose = require("mongoose");

const PembayaranSchema = new mongoose.Schema(
  {
    pelanggan: {
      type: mongoose.Types.ObjectId,
      ref: "Pelanggan",
    },
    Order: {
      type: mongoose.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    BuktiUangMuka: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    BuktiPelunasan: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
    },
    status: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Pembayaran", PembayaranSchema);
