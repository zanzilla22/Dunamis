const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shsmSchema = new Schema({
  title: { type: String, required: true },
  logoUrl: String,
  repInfo: { type: String, required: true },
  companyLink: { type: String, required: true },
  companyName: { type: String, required: true },
  SHSMs: [{ type: String }]
});

const SHSM = mongoose.model('SHSM', shsmSchema);

module.exports = SHSM;
