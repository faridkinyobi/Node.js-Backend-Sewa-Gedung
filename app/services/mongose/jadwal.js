const Jadwal = require("../../api/v1/jadwal/model");

const { BadRequestError400, NotFoundError404 } = require("../../error");
const hasil = (tglMulai, tglAkhir, kegiatan) => {
  // Memastikan bahwa tgl_mulai dan tgl_akhir valid
  if (isNaN(tglMulai.getTime()) || isNaN(tglAkhir.getTime())) {
    throw new BadRequestError400("Invalid date format");
  }
  // Perhitungan selisih waktu
  if (tglAkhir.getTime() >= tglMulai.getTime()) {
    return Math.ceil((tglAkhir - tglMulai) / (1000 * 60 * 60 * 24) + 1);
  } else {
    if (/event/i.test(kegiatan)) {
      return 12;
    } else {
      return 1;
    }
  }
};

const CreatJadwal = async (req) => {
  const { tgl_mulai, tgl_akhir, waktu, kegiatan } = req.body;
 
  const jadwal = {
    tgl_mulai,
    tgl_akhir,
    waktu,
    kegiatan,
  };
  await conflictJadwal(jadwal);

  const tglMulai = new Date(tgl_mulai);
  const tglAkhir = new Date(tgl_akhir);
  // Mengatur waktu tglMulai ke awal hari (00:00:00.000)
  tglMulai.setHours(0, 0, 0, 0);
  // Mengatur waktu tglAkhir ke akhir hari (23:59:59.999)
  tglAkhir.setHours(23, 59, 59, 999);

  const resultLama_Sewa = hasil(tglMulai, tglAkhir, kegiatan);

  const result = await Jadwal.create({
    tgl_mulai,
    tgl_akhir,
    waktu,
    kegiatan,
    lama_sewa: resultLama_Sewa,
  });
  return result;
};

const updateJadwal = async (req) => {
  const { id } = req.params;
  const { tgl_mulai, tgl_akhir, waktu, kegiatan } = req.body;

  const jadwal = {
    tgl_mulai,
    tgl_akhir,
    waktu,
    kegiatan,
  };
  await conflictJadwal(jadwal);

  const check = await Jadwal.findOne({ _id: id });
  if (!check) throw new NotFoundError404(`Tidak ada jadwal dengan ID ${id}`);

  const tglMulai = new Date(tgl_mulai);
  const tglAkhir = new Date(tgl_akhir);
  // Mengatur waktu tglMulai ke awal hari (00:00:00.000)
  tglMulai.setHours(0, 0, 0, 0);
  // Mengatur waktu tglAkhir ke akhir hari (23:59:59.999)
  tglAkhir.setHours(23, 59, 59, 999);

  const resultLama_Sewa = hasil(tglMulai, tglAkhir, kegiatan);

  const result = await Jadwal.findOneAndUpdate(
    { _id: id },
    {
      tgl_mulai,
      tgl_akhir,
      waktu,
      kegiatan,
      lama_sewa: resultLama_Sewa,
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
const setStartOfDay = (date) => new Date(date.setHours(0, 0, 0, 0));
const setEndOfDay = (date) => new Date(date.setHours(23, 59, 59, 999));

const checkJadwal = async (start, end) => {
  //$gte lebih besar dan $lte kurang dari
  const conflicts = await Jadwal.find({
    $or: [
      { tgl_mulai: { $lte: end, $gte: end } },
      { tgl_akhir: { $lte: start, $gte: start } },
      { tgl_mulai: { $gte: start, $lte: end } },
      { tgl_akhir: { $gte: start, $lte: end } },
      { tgl_mulai: { $lte: end }, tgl_akhir: { $gte: start } },
      { tgl_mulai: { $eq: start }, tgl_akhir: { $gte: end } },
      { tgl_mulai: { $lte: start }, tgl_akhir: { $gte: end } },
    ],
  });
  return conflicts;
};

const conflictJadwal = async (jadwal) => {
  const tglMulai = new Date(jadwal.tgl_mulai);
  const tglAkhir = new Date(jadwal.tgl_akhir);

  const startOfDay = setStartOfDay(new Date(tglMulai));
  const endOfDay = setEndOfDay(new Date(tglMulai));
  const tglAkhirEndOfDay = setEndOfDay(new Date(tglAkhir));

  if (tglAkhir.getTime() === tglMulai.getTime()) {
    throw new BadRequestError400(
      "Tanggal mulai tidak boleh sama dengan tanggal akhir."
    );
  }
  let conflict = await checkJadwal(startOfDay, endOfDay);
  let manyConflicts = conflict.length > 0;

  if (conflict) {
    if (manyConflicts) {
      throw new BadRequestError400(
        "Ada kegiatan lain dalam rentang tanggal tersebut"
      );
    }
    if (
      /pernikahan/i.test(conflict.kegiatan) &&
      /event/i.test(jadwal.kegiatan)
    ) {
      throw new BadRequestError400(
        "Jadwal sudah terpakai dalam tanggal yang sama"
      );
    }

    if (
      /event/i.test(conflict.kegiatan) &&
      /pernikahan/i.test(jadwal.kegiatan)
    ) {
      throw new BadRequestError400(
        "Jadwal sudah terpakai dalam tanggal yang sama &&"
      );
    }

    if (conflict.waktu === jadwal.waktu) {
      throw new BadRequestError400(
        `Sudah ada kegiatan dengan waktu "${jadwal.waktu}" pada hari tersebut.`
      );
    }

    if (/pernikahan/i.test(jadwal.kegiatan)) {
      if (manyConflicts) {
        throw new BadRequestError400(
          "Jadwal sudah terpakai dalam tanggal yang sama Pernikahan"
        );
      }
    }

    if (/event/i.test(jadwal.kegiatan)) {
      if (conflict.length >= 2) {
        throw new BadRequestError400(
          "Tidak boleh ada lebih dari dua event dalam satu hari."
        );
      }
    }
  }
  conflict = await checkJadwal(startOfDay, tglAkhirEndOfDay);
  if (manyConflicts) {
    throw new BadRequestError400(
      "Ada kegiatan lain dalam rentang tanggal tersebut."
    );
  }
};
module.exports = {
  getOneJadwal,
  CreatJadwal,
  getAllJadwal,
  updateJadwal,
  deletJadwal,
  updateStatus,
  conflictJadwal,
};
