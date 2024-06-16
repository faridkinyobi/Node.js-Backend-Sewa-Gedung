const Laporan = require("../../api/v1/laporan/model");
const Order = require("../../api/v1/order/model");
const { BadRequestError400, NotFoundError404 } = require("../../error");
const getAll = async (req) => {
  const { startDate, endDate, page = 1, limit = 10 } = req.query;
  let query = {};

  if (startDate && endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59);
    query = {
      ...query,
      date: {
        $gte: start,
        $lt: end,
      },
    };
  }
  let totalDebit = 0;
  let totalKredit = 0;

  const count = await totalLaporan(query);
  const result = await Laporan.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  result.forEach((item) => {
    totalDebit += item.pemasukan;
    totalKredit += item.pengeluaran;
  });
  const saldo = totalDebit - totalKredit;
  return {
    data: result,
    pages: Math.ceil(count / limit) || 0,
    total: count,
    totalDebit: totalDebit,
    totalKredit: totalKredit,
    saldo: saldo,
  };
};

const totalLaporan = async (query) => {
  const result = await Laporan.countDocuments(query);
  return result;
};

const updateLaporan = async (req) => {
  const { id } = req.params;

  const check = await Laporan.findOne({ _id: id });

  if (!check) throw new NotFoundError404(`Tidak ada jadwal dengan ID ${id}`);

  const result = await Laporan.findOneAndUpdate(
    { _id: id },
    {
      status: "sukses",
    },
    { new: true, runValidators: true }
  );
  return result;
};

const deletLaporan = async (req) => {
  const { id } = req.params;
  const result = await Laporan.findOne({ _id: id });
  if (!result) throw new NotFoundError404(`tidak ada penyewa dengan id ${id}`);
  await result.deleteOne();
  return result;
};
const getOneLaporan = async (req) => {
  const { id } = req.params;
  const result = await Laporan.findOne({ _id: id });
  if (!result) throw new NotFoundError404(`tidak ada penyewa dengan id ${id}`);
  await result.deleteOne();
  return result;
};
const CreatPengeluaran = async (req) => {
  const { pengeluaran, desc } = req.body;
  // const totalPemasukanSemuaOrder = await Laporan.aggregate([
  //   { $group: { _id: null, Saldo: { $sum: "$Saldo" } } },
  // ]);
  const lastLaporan = await Laporan.findOne().sort({ createdAt: -1 }).exec();
  const totalPengeluaran = lastLaporan ? lastLaporan.Saldo - pengeluaran : 0;
  // console.log(totalPengeluaran);
  // const updatedTotalPemasukan = totalPengeluaran - pengeluaran;
  // const totalKredit =
  //   laporan.data.length > 0
  //     ? laporan.data.reduce(
  //         (index, items) => index + (items.pengeluaran || 0),
  //         0
  //       )
  //     : 0;
  const creatLaporan = {
    date: new Date(),
    petugas: req.user.name,
    desc: desc,
    pemasukan: 0,
    pengeluaran: pengeluaran,
    Saldo: totalPengeluaran ? totalPengeluaran : 0,
  };
  const hasil = await Laporan.create(creatLaporan);
  return hasil;
};
const CreatLaporanPemasukanDP = async (result, req) => {
  const check = await Laporan.findOne({
    desc: `${result.NumberOrder}, DP Gedung`,
  });
  if (check) throw new BadRequestError400("Tipe Laporan Order duplikat");

  const lastLaporan = await Laporan.findOne().sort({ date: -1 }).exec();
  const previousSaldo = lastLaporan ? lastLaporan.Saldo : 0;
  const newSaldo = previousSaldo + result.total_dp;

  const creatLaporan = {
    date: new Date(),
    petugas: req.user.name,
    desc: `${result.NumberOrder}, DP Gedung`,
    pemasukan: result.total_dp,
    pengeluaran: 0,
    Saldo: newSaldo,
  };
  await Laporan.create(creatLaporan);
};
const CreatPemasukanLunas = async (req,result) => {

  const check = await Laporan.findOne({ desc: `${result.NumberOrder}, Pelunasan`});
  if (check) throw new BadRequestError400("Tipe Laporan Order duplikat");

    const lastLaporan = await Laporan.findOne().sort({ date: -1 }).exec();
  const previousSaldo = lastLaporan ? lastLaporan.Saldo : 0;
  const newSaldo = previousSaldo + result.sisa_pembayaran;

  const creatLaporan = {
    date: new Date(),
    petugas: req.user.name,
    desc: `${result.NumberOrder}, Pelunasan`,
    pemasukan: result.sisa_pembayaran,
    pengeluaran: 0,
    Saldo: newSaldo,
  };
  const hasil = await Laporan.create(creatLaporan);
  return hasil;
};

module.exports = {
  getAll,
  deletLaporan,
  updateLaporan,
  getOneLaporan,
  CreatPengeluaran,
  CreatLaporanPemasukanDP,
  CreatPemasukanLunas,
};
