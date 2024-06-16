const mongoose = require("mongoose");

const PelangganSchema = new mongoose.Schema(
  {
    firstName: {
      required: [true, "Nama depan harus diisi"],
      minlength: 3,
      maxlength: 50,
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      unique: true,
      required: [true, "Email harus diisi"],
      type: String,
    },
    password: {
      required: [true, "Password harus diisi"],
      type: String,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["-"],
    },
    status: {
      type: String,
      enum: ["aktif", "tidak aktif"],
      default: "tidak aktif",
    },
    otp: {
      type: String,
      required: true,
    },
    resetPasswordLink: {
        type: String,
        default: ""
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Pelanggan", PelangganSchema);
