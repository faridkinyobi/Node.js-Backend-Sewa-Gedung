const mongoose = require('mongoose');

let PelangganSchema = new mongoose.Schema(
    {
        firstName: {
            required: [true, 'Nama depan harus diisi'],
            minlength: 3,
            maxlength: 50,
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            unique: true,
            required: [true, 'Email harus diisi'],
            type: String,
        },
        password: {
            required: [true, 'Password harus diisi'],
            type: String,
            minlength: 6,
        },
        role: {
            type: String,
            enum: ['-']
          },
        },
        { timestamps: true }
    );
module.exports = mongoose.model('Pelanggan', PelangganSchema);