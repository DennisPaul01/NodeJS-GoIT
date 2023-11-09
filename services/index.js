const User = require("./schemas/UserSchema");
const Tutor = require("./schemas/TutorSchema");

const getAllUsers = async () => {
  return User.find();
};

const getAllTutors = async () => {
  return Tutor.find();
};

const createUser = async ({ email, password }) => {
  try {
    const userExistent = await User.findOne({ email });

    if (userExistent) {
      throw new Error("Acest email exista deja.");
    }

    const newUser = new User({ email, password });
    newUser.setPassword(password);
    return await newUser.save();
  } catch (error) {
    throw error;
  }
};

const checkUserDB = async ({ email, password }) => {
  try {
    console.log(`Parola:${password}`);
    const user = await User.findOne({ email });

    // if (!user) {
    //   throw new Error("User-ul nu exista in baza de date!");
    // }
    // if (user.password !== password) {
    //   throw new Error("Parola este gresita");
    // }

    if (!user || !user.validPassword(password)) {
      throw new Error("Email sau parola gresita!");
    }

    return user;
  } catch (error) {
    throw error;
  }
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

const findUserName = async (user) => {
  const result = await User.findOne({ email: user.email });
  return result;
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  checkUserDB,
  getAllTutors,
  findUserName,
};
