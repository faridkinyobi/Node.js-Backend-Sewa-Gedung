const Pelanggan = require("../../api/v1/pelanggan/model");
const Penyewa = require("../../api/v1/penyewa/model");
const Jadwal = require("../../api/v1/jadwal/model");
const Paket = require("../../api/v1/pakets/model");
// const HargaCetagori = require("../../api/v1/pakets/modal");
const Order = require("../../api/v1/order/model");
const Pembayaran = require("../../api/v1/pembayaran/model");
const {
  BadRequestError400,
  NotFoundError404,
  UnauthorizedError403,
} = require("../../error");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config");

const signinPelanggan = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError400("Please provide email and password");
  }
  const result = await Pelanggan.findOne({ email: email });

  if (!result) {
    throw new UnauthorizedError403("Invalid Credentials");
  }

  const isPassword = await bcrypt.compare(password, result.password);

  if (!isPassword) {
    throw new UnauthorizedError403("Invalid Credentials");
  }
  const payload = {
    lastName: result.lastName,
    participantId: result._id,
    firstName: result.firstName,
    email: result.email,
  };
  const token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  });
  return token;
};

const UpdatePasswordPelanggan = async (req) => {
  const { email, newPassword, OldPassword } = req.body;

  if (!newPassword || !OldPassword) {
    throw new BadRequestError400(
      "Please provide  Old password and new password"
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

  if (!chek) throw new BadRequestError400("Please use another email address");

  const hashPaswword = await bcrypt.hash(password, 10);
  const result = await Pelanggan.create({
    firstName,
    lastName,
    email,
    password: hashPaswword,
    role: "-",
  });
  delete result._doc.password;
  return result;
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

const getOneJadwal = async (jadwal) => {
  const result = await Jadwal.findOne({
    $or: [
      {
        tgl_mulai: { $lte: jadwal.tgl_akhir },
        tgl_akhir: { $gte: jadwal.tgl_mulai },
      },
      {
        tgl_mulai: { $eq: jadwal.tgl_mulai },
        tgl_akhir: { $gte: jadwal.tgl_akhir },
      },
    ],
  });

  if (result)
    throw new BadRequestError400(
      "Jadwal sudah terpakai dalam rentang tanggal yang sama"
    );

  //   if (jadwal.tgl_mulai > jadwal.tgl_akhir) {
  //     throw new BadRequestError400(
  //       "Tanggal mulai tidak dapat lebih besar daripada tanggal akhir."
  //     );
  //   }
  return result;
};

const getOneharga = async (req) => {
  const { paketId, hargaCetagoriId } = req.body;

  const result = await Paket.findOne({ _id: paketId });
  if (!result)
    throw new NotFoundError404(`tidak ada paket dengan id ${paketId}`);

  const checkHarga = result.harga.find((harga) =>
    harga._id.equals(hargaCetagoriId)
  );

  return checkHarga;
};

const checkOut = async (req) => {
  const { paketId, hargaCetagoriId, penyewaData, jadwalData, MetPembayaran } =
    req.body;

  //check paket
  const chekPaket = await Paket.findById(paketId);

  if (!chekPaket)
    throw new NotFoundError404("Tidak ada peket dengan id : " + paketId);

  //check Harga katagori
  const checkHarga = chekPaket.harga.find((harga) =>
    harga._id.equals(hargaCetagoriId)
  );

  if (!checkHarga)
    throw new NotFoundError404(
      "Tidak ada harga dengan id : " + hargaCetagoriId
    );

  const harga = [{ hargadetail: checkHarga.hargadetail }];
  const jadwal = new Jadwal(jadwalData);

  const historyPaket = {
    title: chekPaket.titel,
    kegiatan: checkHarga.kegiatan,
    hari: checkHarga.hari,
    warga: checkHarga.warga,
    hargadetail: checkHarga.hargadetail,
    tgl_mulai: jadwal.tgl_mulai,
    tgl_akhir: jadwal.tgl_akhir,
    waktu: jadwal.waktu,
    lama_sewa: jadwal.lama_sewa,
    kegiatan: jadwal.kegiatan,
  };

  const tanggal = jadwal.tgl_akhir
    ? jadwal.tgl_akhir.getTime() - jadwal.tgl_mulai.getTime()
    : 0;

  const hasil = Math.ceil(tanggal / (1000 * 60 * 60 * 24) + 1);
  jadwal.lama_sewa = hasil || 1;

  // Pemeriksaan jadwal yang sudah ada dalam rentang tanggal
  await getOneJadwal(jadwal);

  //Pemeriksaan penyewa
  let penyewa = await Penyewa.findOne({ email: penyewaData.email });
  if (!penyewa) {
    penyewa = new Penyewa(penyewaData);
    await penyewa.save();
  }

  const creatDate = new Date();
  //tahun
  const year = creatDate.getFullYear();
  const NumberRandom = Math.random().toString(36).slice(2, 7).toUpperCase();
  const orderNumber = `ORD-${year}-${NumberRandom}`;

  // Menghitung total pembayaran berdarkan lama sewa
  const total = harga[0].hargadetail * hasil;
  const total_dp = 1000000; // Misalnya, DP sebesar 50%
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
    paket: chekPaket,
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
};
