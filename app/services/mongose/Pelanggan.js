const Pelanggan = require("../../api/v1/pelanggan/model");
const Penyewa = require("../../api/v1/penyewa/model");
const Jadwal = require("../../api/v1/jadwal/model");
const Paket = require("../../api/v1/pakets/model");
const Order = require("../../api/v1/order/model");
const Pembayaran = require("../../api/v1/pembayaran/model");
const { otpMail, forgotPass } = require("../email");
const { conflictJadwal } = require("./jadwal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const { verifyToken } = require("../../middlewares/auth");
const {
  BadRequestError400,
  NotFoundError404,
  UnauthorizedError403,
  UnauthenticatedError401,
} = require("../../error");

const signinPelanggan = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError400("Please provide email and password");
  }
  const result = await Pelanggan.findOne({ email: email });

  if (!result) {
    throw new UnauthorizedError403("Invalid Credentials");
  }

  if (result.status === "tidak aktif") {
    throw new UnauthorizedError403("Akun anda belum aktif");
  }
  const isPassword = await bcrypt.compare(password, result.password);

  if (!isPassword) {
    throw new UnauthorizedError403("Invalid Credentials");
  }

  const payload = {
    lastName: result.lastName,
    pelangganId: result._id,
    firstName: result.firstName,
    email: result.email,
  };
  const token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  });
  return { token, lastName: result.lastName, firstName: result.firstName };
};

const UpdatePasswordPelanggan = async (req) => {
  const { email, newPassword, OldPassword, confirmPassword } = req.body;
  if (!newPassword || !OldPassword) {
    throw new BadRequestError400("Harap berikan password Old dan password New");
  }
  if (newPassword !== confirmPassword) {
    throw new BadRequestError400(
      "Password baru dan Konfirmasi password tidak cocok"
    );
  }
  const result = await Pelanggan.findOne({ email: email });

  if (!result) {
    throw new UnauthorizedError403("Pelanggan tidak ditemukan");
  }

  const isPassword = await bcrypt.compare(OldPassword, result.password);

  if (!isPassword) {
    throw new UnauthorizedError403("Password lama tidak cocok");
  }
  const hashPaswword = await bcrypt.hash(newPassword, 10);

  const updatedPelanggan = await Pelanggan.findOneAndUpdate(
    { email },
    { password: hashPaswword },
    { new: true, runValidators: true } // Opsi untuk mengembalikan dokumen yang diperbarui
  );

  delete updatedPelanggan._doc.password;

  return updatedPelanggan;
};

const signupPelanggan = async (req, res) => {
  const { firstName, lastName, password, email } = req.body;

  const chek = await Pelanggan.find({ email: email });

  if (!chek)
    throw new BadRequestError400(
      "Silakan gunakan alamat email lain email sudah terdaftar"
    );

  let result = await Pelanggan.findOne({ email, status: "tidak aktif" });

  const hashPaswword = await bcrypt.hash(password, 10);

  if (result) {
    result.firstName = firstName;
    result.lastName = lastName;
    result.email = email;
    result.password = hashPaswword;
    result.role = "-";
    result.otp = Math.floor(Math.random() * 9999);
    await result.save();
  } else {
    result = await Pelanggan.create({
      firstName,
      lastName,
      email,
      password: hashPaswword,
      role: "-",
      otp: Math.floor(Math.random() * 9999),
    });
  }
  await otpMail(email, result);
  delete result._doc.password;
  delete result._doc.otp;

  return result;
};

const activatePelanggan = async (req, res) => {
  const { otp, email } = req.body;

  const check = await Pelanggan.findOne({ email });

  if (!check) throw new NotFoundError404("email belum terdaftar");

  if (check && check.otp !== otp)
    throw new BadRequestError400("Kode otp salah");

  const result = await Pelanggan.findByIdAndUpdate(
    check._id,
    {
      status: "aktif",
    },
    { new: true }
  );

  delete result._doc.password;

  return result;
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const check = await Pelanggan.findOne({ email });
  if (!check) throw new NotFoundError404("email tidak tersedia");

  const payload = {
    email: check.email,
    pelangganId: check._id,
  };
  const token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpirationForgot,
  });

  const result = await Pelanggan.updateOne({ resetPasswordLink: token });
  await forgotPass(email, token);

  return result;
};

const resetPassword = async (req, res) => {
  const { resetPasswordLink } = req.params;
  // console.log(token)
  const { email, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    throw new BadRequestError400(
      "Password baru dan confirm password tidak cocok"
    );
  }
  await verifyToken(resetPasswordLink);

  const hashPaswword = await bcrypt.hash(newPassword, 10);

  const resultResetPass = await Pelanggan.findOneAndUpdate(
    { email },
    { password: hashPaswword },
    { new: true, runValidators: true } // Opsi untuk mengembalikan dokumen yang diperbarui
  );
  console.log(resultResetPass)
  // await forgotPass(email, token);

  return resultResetPass;
};

const getAllDasboardPelangan = async (req) => {
  const result = await Order.find({ pelanggan: req.pelanggan.id })
    .populate("penyewa")
    .exec();
  return result;
};

const getAllDasboardPembayaran = async (req) => {
  const result = await Pembayaran.find({ pelanggan: req.pelanggan.id })
    .populate([
      {
        path: "BuktiUangMuka",
        select: "_id name",
      },
      {
        path: "BuktiPelunasan",
        select: "_id name",
      },
    ])
    .select("_id status name image");
  return result;
};

const getAllPaketPelanggan = async () => {
  const result = await Paket.find();
  return result;
};

const getAllJadwalPelanggan = async () => {
  const result = await Jadwal.find();
  return result;
};

const getOnePaket = async (req) => {
  const { id } = req.params;

  const result = await Paket.findOne({ _id: id }).lean();

  if (!result) throw new NotFoundError404(`tidak ada paket dengan id ${id}`);

  return result;
};

const getOneharga = async (paketId, hargaCetagoriId) => {
  const result = await Paket.findOne({ _id: paketId });
  if (!result)
    throw new NotFoundError404(`tidak ada paket dengan id ${paketId}`);

  const checkHarga = result.harga.find((harga) =>
    harga._id.equals(hargaCetagoriId)
  );
  if (!checkHarga)
    throw new NotFoundError404(
      "Tidak ada harga dengan id : " + hargaCetagoriId
    );

  return { checkHarga, resultTitel: result.titel, resultId: result._id };
};

const checkOut = async (req) => {
  const { paketId, hargaCetagoriId, penyewaData, jadwalData, MetPembayaran } =
    req.body;

  // Cek apakah pelanggan sudah memiliki order yang aktif atau pending
  const existingOrder = await Order.findOne({
    pelanggan: req.pelanggan.id,
    status: { $in: ["pending", "sukses", "uang muka"] },
  });

  if (existingOrder) {
    throw new BadRequestError400(
      "Anda sudah memiliki order yang aktif atau pending. Harap selesaikan order tersebut sebelum membuat order baru."
    );
  }
  const { checkHarga, resultTitel, resultId } = await getOneharga(
    paketId,
    hargaCetagoriId
  );

  const harga = [{ hargadetail: checkHarga.hargadetail }];

  const jadwal = new Jadwal(jadwalData);
  console.log(jadwal);
  await conflictJadwal(jadwal);

  // Mengonversi input datetime-local menjadi objek Date
  const tglMulai = new Date(jadwal.tgl_mulai);
  const tglAkhir = new Date(jadwal.tgl_akhir);
  // Mengatur waktu tglMulai ke awal hari (00:00:00.000)
  tglMulai.setHours(0, 0, 0, 0);
  // Mengatur waktu tglAkhir ke akhir hari (23:59:59.999)
  tglAkhir.setHours(23, 59, 59, 999);

  const tanggal = (() => {
    // Memastikan bahwa tgl_mulai dan tgl_akhir valid
    if (isNaN(tglMulai.getTime()) || isNaN(tglAkhir.getTime())) {
      throw new BadRequestError400("Invalid date format");
    }
    // Perhitungan selisih waktu
    if (tglAkhir.getTime() >= tglMulai.getTime()) {
      return Math.ceil((tglAkhir - tglMulai) / (1000 * 60 * 60 * 24) + 1);
    } else {
      if (/event/i.test(jadwal.kegiatan)) {
        return 12;
      } else {
        return 1;
      }
    }
  })();

  jadwal.lama_sewa = tanggal || 1;
  // console.log(tanggal);

  const historyPaket = {
    title: resultTitel,
    kegiatan: checkHarga.kegiatan,
    hari: checkHarga.hari,
    warga: checkHarga.warga,
    hargadetail: checkHarga.hargadetail,
    tgl_mulai: jadwal.tgl_mulai,
    tgl_akhir: jadwal.tgl_akhir,
    waktu: jadwal.waktu,
    lama_sewa: tanggal,
    kegiatan: jadwal.kegiatan,
  };

  const hasil = jadwal.tgl_akhir
    ? Math.ceil((tglAkhir - tglMulai) / (1000 * 60 * 60 * 24) + 1)
    : 1;

  //Pemeriksaan penyewa
  const chekPenyewa = await Penyewa.findOne({
    email: penyewaData.email,
  });
  if (!chekPenyewa) {
    const penyewa = new Penyewa(penyewaData);
    await penyewa.save();
  }
  const penyewa = await Penyewa.findOne();

  const creatDate = new Date();
  const year = creatDate.getFullYear(); //tahun
  const NumberRandom = Math.random().toString(36).slice(2, 7).toUpperCase();
  const orderNumber = `ORD-${year}-${NumberRandom}`;

  // Menghitung total pembayaran berdarkan lama sewa
  const total_dp = 2000000;
  const total = harga[0].hargadetail * hasil;
  const sisa_pembayaran = total - total_dp;

  const order = new Order({
    date: creatDate,
    NumberOrder: orderNumber,
    total,
    total_dp,
    sisa_pembayaran,
    pelanggan: req.pelanggan.id,
    penyewa: penyewa._id,
    jadwal: jadwal,
    paket: resultId,
    hargaCetagori: checkHarga,
    MetPembayaran,
    historyPaket,
  });

  // Simpan order
  await order.save();
  await jadwal.save();

  return order;
};

module.exports = {
  checkOut,
  signinPelanggan,
  getAllJadwalPelanggan,
  getAllDasboardPelangan,
  getAllPaketPelanggan,
  signupPelanggan,
  getOnePaket,
  getAllDasboardPembayaran,
  getOneharga,
  UpdatePasswordPelanggan,
  activatePelanggan,
  forgotPassword,
  resetPassword,
};
