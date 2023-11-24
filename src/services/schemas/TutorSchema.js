const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tutorSchema = new Schema({
  city: { type: String, required: true, minLength: 2 },
  email: { type: String, required: true, minLength: 2 },
  firstName: { type: String, required: true, minLength: 2 },
  lastName: { type: String, required: true, minLength: 2 },
  options: { type: String, required: true, minLength: 2 },
  phone: { type: String, required: true, minLength: 2 },
});

const Tutor = mongoose.model("tutors", tutorSchema);

module.exports = Tutor;
