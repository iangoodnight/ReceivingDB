/**
 * setup and export mongo connection
 */

'use strict';

const mongoose = require('mongoose');
const mongoConnection = process.env.DEV_URI || process.env.MONGODB_URI;
const mongoUri = encodeURI(mongoConnection);
mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const db = mongoose.connection;

module.exports = db;
