const Order = require("../../api/v1/order/model");
const Laporan = require("../../api/v1/laporan/model");
const {CreatLaporanPemasukanDP,CreatPemasukanLunas}   = require("./Laporan")
const { BadRequestError400, NotFoundError404 } = require("../../error");
const getAllOrders = async (req) => {
  const { keyword, limit = 10, page = 1 } = req.query;
  let query = {};

  if (keyword) {
    query.NumberOrder = { $regex: keyword, $options: "i" };
  }

  const result = await Order.find(query)
    .skip((page - 1) * limit)
    .limit(limit);
  // .populate("paket")
  // .populate("jadwal")
  // .populate("penyewa")
  // .exec();
  const count = await totalOrders();

  return { data: result, pages: Math.ceil(count / limit) || 0, total: count };
};
const totalOrders = async (req) => {
  const result = await Order.countDocuments();
  return result;
};

const getAllOrdersStatus = async (req) => {
  const result = await Order.find({ status: "pending" });
  return result;
};

const totalStatusSukses = async (req) => {
  const result = await Order.countDocuments({ status: "sukses" });
  return result;
};

const totalStatusPending = async (req) => {
  // const result = await Order.find()
  const result = await Order.countDocuments({ status: "pending" });
  return result;
};

const updateStatusSukses = async (req) => {
  const { id } = req.params;
  const check = await Order.findOne({ _id: id });

  if (!check) throw new NotFoundError404(`Tidak ada jadwal dengan ID ${id}`);

  const result = await Order.findOneAndUpdate(
    { _id: id },
    {
      status: "sukses",
    },
    { new: true, runValidators: true }
  );
  if (result.status === "sukses") {
    await CreatPemasukanLunas(req,result)
    // const check = await Laporan.findOne({ desc: result.NumberOrder });
    // if (check) throw new BadRequestError400("Tipe Laporan Order duplikat");

    // const totalPemasukanSemuaOrder = await Laporan.aggregate([
    //   { $group: { _id: null, pemasukan: { $sum: "$pemasukan" } } },
    // ]);
    // const totalPemasukan =
    //   totalPemasukanSemuaOrder.length > 0
    //     ? totalPemasukanSemuaOrder[0].pemasukan
    //     : 0;

    // const updatedTotalPemasukan = totalPemasukan + result.total;

    // const creatLaporan = {
    //   date: new Date(),
    //   petugas: req.user.name ,
    //   desc: result.NumberOrder,
    //   pemasukan: result.total,
    //   pengeluaran: 0,
    //   Saldo: updatedTotalPemasukan ? updatedTotalPemasukan : 0,
    // };
    // const hasil = await Laporan.create(creatLaporan);
    // console.log(hasil, "hasil");
  }
  return result;
};
const updateStatusUangDP = async (req) => {
  const { id } = req.params;
  const check = await Order.findOne({ _id: id });

  if (!check) throw new NotFoundError404(`Tidak ada jadwal dengan ID ${id}`);

  const result = await Order.findOneAndUpdate(
    { _id: id },
    {
      status: "uang muka",
    },
    { new: true, runValidators: true }
  );
  if (result.status === "uang muka") {
    await CreatLaporanPemasukanDP(result, req)
  }
  return result;
};

const updateStatusGagal = async (req) => {
  const { id } = req.params;

  const check = await Order.findOne({ _id: id });

  if (!check) throw new NotFoundError404(`Tidak ada jadwal dengan ID ${id}`);

  const result = await Order.findOneAndUpdate(
    { _id: id },
    {
      status: "gagal",
    },
    { new: true, runValidators: true }
  );
  return result;
};
const deletOrder = async (req) => {
  const { id } = req.params;
  const result = await Order.findOne({ _id: id });
  if (!result) throw new NotFoundError404(`tidak ada penyewa dengan id ${id}`);
  await result.deleteOne();
  return result;
};
module.exports = {
  getAllOrders,
  totalOrders,
  totalStatusPending,
  getAllOrdersStatus,
  updateStatusGagal,
  updateStatusSukses,
  totalStatusSukses,
  deletOrder,
  updateStatusUangDP,
};
