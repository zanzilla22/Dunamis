// /api/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;


const studentSchema = new Schema({
  nameFirst: String,
  nameLast: String,
  password: String,
  email: { type: String, required: true, unique: true },
  resume: String,
  description: String,
  transcript: String,
  outgoingApplicationIds: [{ type: Schema.Types.ObjectId, ref: 'CoopListing' }],
  school: String,
  district: String,
  regionalProgram: String
});
// presave hook hash thing
studentSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const Student = mongoose.model('Student', studentSchema);

const teacherSchema = new Schema({
  nameFirst: String,
  nameLast: String,
  password: String,
  email: { type: String, required: true, unique: true },
  shsmPrograms: [{ type: String }],
  subjects: [{ type: String }],
  description: String,
  school: String,
  district: String
});
teacherSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const Teacher = mongoose.model('Teacher', teacherSchema);

const coOpRepresentativeSchema = new Schema({
  nameFirst: String,
  nameLast: String,
  password: String,
  email: { type: String, required: true, unique: true },
  description: String,
  company: String,
  role: String,
  city: String,
  targetSHSMs: [{ type: String }],
  targetCourses: [{ type: String }],
  availableCoopIds: [{ type: Schema.Types.ObjectId, ref: 'CoopListing' }]
});
coOpRepresentativeSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const CoOpRepresentative = mongoose.model('CoOpRepresentative', coOpRepresentativeSchema);


module.exports = { Student, Teacher, CoOpRepresentative };
