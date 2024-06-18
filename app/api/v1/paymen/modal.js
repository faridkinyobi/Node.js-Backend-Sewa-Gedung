const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Nama pembayaran harus diisi"],
      minlength: 2,
      maxlength: 50,
    },
    Number: {
      required: [true, "Nomer Rekening harus diisi"],
      type: String,
      minlength: 2,
      maxlength: 50,
    },
    status: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Payment", PaymentSchema);
