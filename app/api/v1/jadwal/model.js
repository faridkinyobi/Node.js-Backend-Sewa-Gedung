const mongoose = require('mongoose');

const JadwalSchema = new mongoose.Schema(
    {
        tgl_mulai: {
            type: Date,
            required: [true, 'Tanggal harus diisi'],
        },
        tgl_akhir: {
            type: Date
        },
        waktu: {
            type: String,
            required: [true, 'Waktu harus diisi '],
        },
        lama_sewa: {
            type: Number,
            default:1
        },
        kegiatan: {
            type: String,
            required: [true, 'Kegiatan harus diisi'],
        },
        status_kegiatan: {
            type: String,
            enum: ['sedang diproses', 'sudah dipesan'],
            default: 'sedang diproses',
        },
        },
        { timestamps: true }
    );
module.exports = mongoose.model('Jadwal', JadwalSchema);