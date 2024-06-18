
const mongoose = require('mongoose');

// const  {urlDb}  = require('../config');
const urlDb  = require('../config');
mongoose.connect(urlDb);

//simpan dalam constant db
const db = mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB connected successfully');
});


db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});


db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db;