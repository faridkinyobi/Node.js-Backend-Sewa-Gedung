const mongoose = require('mongoose');

const penyewaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Nama harus di isi'],
            minlength: 3,
            maxlength: 50,
        },
        no_tlp: {
            type: String,
            required: [true, 'No Telfon harus di isi'],
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email harus di isi'],
        },
        alamat: {
            type: String,
            required: [true, 'Alamat harus di isi'],
        },
        },
        { timestamps: true }
    );
module.exports = mongoose.model('Penyewa', penyewaSchema);