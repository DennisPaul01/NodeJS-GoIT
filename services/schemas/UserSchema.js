const mongoose = require("mongoose");
const bCrypt = require("bcryptjs");
const gravatar = require("gravatar");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, require: true, minLength: 2 },
  password: { type: String, require: true, minLength: 2 },
  name: { type: String, require: true, minLength: 2 },
  avatarUrl: { type: String, minLength: 2 },
});

userSchema.methods.setPassword = function (password) {
  console.log(this);
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

userSchema.pre("save", function (next) {
  if (!this.avatarUrl) {
    this.avatarUrl = gravatar.url(
      this.email,
      {
        s: 200,
        r: "pg",
        d: "identicon",
      },
      true
    );
  }
  next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;
