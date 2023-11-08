const mongoose = require("mongoose");
const bCrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, require: true, minLength: 2 },
  password: { type: String, require: true, minLength: 2 },
});

userSchema.methods.setPassword = (password) => {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = (password) => {
  // passwordFrontend === dcripata(passwordBackend)
  return bCrypt.compareSync(password, this.password);
};

const User = mongoose.model("users", userSchema);

module.exports = User;
