const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// nume
// varsta
// an_nastere
// oras
// ocupatie
// cetatenie
// major

const user = new Schema({
  nume: { type: String, require: true, minLength: 2 },
  varsta: { type: Number, require: true, min: 1 },
  anNastere: { type: Number, require: true, min: 1 },
  oras: { type: String, require: true, minLength: 2 },
  cetatenie: { type: String, require: true, minLength: 2 },
  major: { type: Boolean, require: true },
});

const User = mongoose.model("users", user);

module.exports = User;
