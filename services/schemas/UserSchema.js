const mongoose = require("mongoose");
const bCrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, require: true, minLength: 2 },
  password: { type: String, require: true, minLength: 2 },
  name: { type: String, require: true, minLength: 2 },
});

userSchema.methods.setPassword = function (password) {
  console.log(this);
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

const User = mongoose.model("users", userSchema);

module.exports = User;
