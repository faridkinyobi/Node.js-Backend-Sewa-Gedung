const Jadwal = require("../../api/v1/jadwal/model");

const { BadRequestError400, NotFoundError404 } = require("../../error");

const CreatJadwal = async (req) => {
  const { tgl_mulai, tgl_akhir, waktu, kegiatan } = req.body;

  const check = await Jadwal.findOne({
    $or: [
      {
        tgl_mulai: { $lte: tgl_akhir },
        tgl_akhir: { $gte: tgl_mulai },
      },
      {
        tgl_mulai: { $eq: tgl_mulai },
        tgl_akhir: { $gte: tgl_akhir },
      },
    ],
  });

  if (check)
    throw new BadRequestError400(
      "Jadwal sudah terpakai dalam rentang tanggal yang sama"
    );
  const tglMulai = new Date(tgl_mulai);
  const tglAkhir = new Date(tgl_akhir);
  const tanggal = tglAkhir.getTime() - tglMulai.getTime();
  const hasil = Math.ceil(tanggal / (1000 * 60 * 60 * 24)) + 1;
  let lama_sewa = hasil || 1;
  const result = await Jadwal.create({
    tgl_mulai,
    tgl_akhir,
    waktu,
    kegiatan,
    lama_sewa,
  });
  return result;
};

const updateJadwal = async (req) => {
  const { id } = req.params;
  const { tgl_mulai, tgl_akhir, waktu, kegiatan, lama_sewa } = req.body;

  const check = await Jadwal.findOne({ _id: id });

  if (!check) throw new NotFoundError404(`Tidak ada jadwal dengan ID ${id}`);

  const result = await Jadwal.findOneAndUpdate(
    { _id: id },
    {
      tgl_mulai,
      tgl_akhir,
      waktu,
      kegiatan,
      lama_sewa,
    },
    { new: true, runValidators: true }
  );
  return result;
};

const updateStatus = async (req) => {
  const { id } = req.params;
  const { status_kegiatan } = req.body;

  const check = await Jadwal.findOne({ _id: id });

  if (!check) throw new NotFoundError404(`Tidak ada jadwal dengan ID ${id}`);

  const result = await Jadwal.findOneAndUpdate(
    { _id: id },
    {
      status_kegiatan,
    },
    { new: true, runValidators: true }
  );
  return result;
};

const getAllJadwal = async () => {
  const result = await Jadwal.find();
  return result;
};

const getOneJadwal = async (req) => {
  const { id } = req.params;
  const result = await Jadwal.findOne({ _id: id });

  if (!result) throw new NotFoundError404(`tidak ada paket dengan id ${id}`);

  return result;
};

const deletJadwal = async (req) => {
  const { id } = req.params;
  const result = await Jadwal.findOne({ _id: id });
  if (!result) throw new NotFoundError404(`tidak ada penyewa dengan id ${id}`);
  await result.deleteOne();
  return result;
};

module.exports = {
  getOneJadwal,
  CreatJadwal,
  getAllJadwal,
  updateJadwal,
  deletJadwal,
  updateStatus,
};
