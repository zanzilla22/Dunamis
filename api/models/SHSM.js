const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shsmSchema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  logoUrl: String,
  applyLink: { type: String, required: true },
  companyName: { type: String, required: true },
  shsms: [{ type: String }]
});

const SHSM = mongoose.model('SHSM', shsmSchema);

module.exports = SHSM;
