const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opportunitySchema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  logoUrl: String,
  applyLink: { type: String, required: true },
  companyName: { type: String, required: true },
  term: { type: String, required: true },
  categories: [{ type: String }]
});

const CoOp = mongoose.model('CoOp', opportunitySchema);

module.exports = CoOp;
