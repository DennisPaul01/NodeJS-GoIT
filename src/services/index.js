const User = require("./schemas/UserSchema");
const Tutor = require("./schemas/TutorSchema");
const sgMail = require("@sendgrid/mail");
const nanoid = require("nanoid");

const getAllUsers = async () => {
  return User.find();
};

const getAllTutors = async () => {
  return Tutor.find();
};

const createUser = async ({ email, password, name }) => {
  try {
    const userExistent = await User.findOne({ email });

    if (userExistent) {
      throw new Error("Acest email exista deja.");
    }

    const codUnicDeVerificare = nanoid();

    const msg = {
      to: email,
      from: "denis.mucioiu96@e-uvt.ro",
      subject: "Email de verificare cont!",
      text: `Codul de verificare este ${codUnicDeVerificare} / http://localhost:5000/api/account/verify/${codUnicDeVerificare}`,
    };

    sgMail
      .send(msg)
      .then(() => console.log("Email trimis"))
      .catch(() => {
        throw new Error("Eroare la trimitere");
      });

    const newUser = new User({
      email,
      password,
      name,
      verificationToken: codUnicDeVerificare,
    });
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

    if (!user.verify) {
      throw new Error("Trebuie sa iti verifici contul de email!");
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

const verifyEmail = async (verificationToken) => {
  const update = { verify: true, verificationToken: null };

  const result = await User.findOneAndUpdate(
    {
      verificationToken,
    },
    { $set: update },
    { new: true }
  );
  console.log(result);
  if (!result) throw new Error("userul nu exista");
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  checkUserDB,
  getAllTutors,
  findUserName,
  verifyEmail,
};
