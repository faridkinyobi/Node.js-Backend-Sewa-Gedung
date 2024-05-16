const Laporan = require("../../api/v1/laporan/model");

const getAll = async (req) => {
  const { startDate, endDate, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  let query = {};

  if (startDate && endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59);
    condition = {
      ...query,
      date: {
        $gte: start,
        $lt: end,
      },
    };
  }
  const result = await Laporan.find(query).skip(skip).limit(limit);

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
const CreatLaporan = async (req) => {
  const { id } = req.params;
  const result = await Laporan.findOne({ _id: id });
  if (!result) throw new NotFoundError404(`tidak ada penyewa dengan id ${id}`);
  await result.deleteOne();
  return result;
};

module.exports = {
  getAll,
  deletLaporan,
  updateLaporan,
  getOneLaporan,
  CreatLaporan,
};
