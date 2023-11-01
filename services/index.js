const User = require("./schemas/UserSchema");

const getAllUsers = async () => {
  return User.find();
};

const createUser = async ({
  nume,
  varsta,
  anNastere,
  oras,
  cetatenie,
  major,
}) => {
  return User.create({ nume, varsta, anNastere, oras, cetatenie, major });
};

const updateUser = async (id, majorUpdate) => {
  console.log(id, majorUpdate);
  console.log(majorUpdate);

  //  { $set: { name: 'jason bourne' }
  return User.findByIdAndUpdate(
    { _id: id },
    { $set: majorUpdate },
    { new: true }
  );
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
};
