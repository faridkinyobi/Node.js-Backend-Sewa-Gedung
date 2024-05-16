
const mongoose = require('mongoose');

const { urlDb } = require('../config');

mongoose.connect(urlDb);

//simpan dalam constant db
const db = mongoose.connection;

module.exports = db;