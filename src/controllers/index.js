const jwt = require("jsonwebtoken");
const User = require("../services/schemas/UserSchema");
require("dotenv").config();

const Jimp = require("jimp");

const fs = require("fs");
const path = require("path");

const secret = process.env.SECRET;

const {
  getAllUsers,
  createUser,
  updateUser,
  checkUserDB,
  getAllTutors,
  findUserName,
  verifyEmail,
} = require("../services/index");

const getUsersController = async (req, res, next) => {
  try {
    const results = await getAllUsers();
    res.json({
      status: "Success",
      code: 200,
      data: results,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      code: 404,
    });
    next(error);
  }
};

const getTutorsController = async (req, res, next) => {
  try {
    const results = await getAllTutors();

    res.json({
      status: "Success",
      code: 200,
      data: results,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      code: 404,
    });
    next(error);
  }
};

const createUserController = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const result = await createUser({
      email,
      password,
      name,
    });

    const payload = { email: result.email };

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    res.status(201).json({
      status: "success",
      code: 201,
      data: { email: result.email, token },
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      error: error.message,
    });
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await checkUserDB({
      email,
      password,
    });

    const payload = { email: result.email };

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    res.status(201).json({
      status: "succes",
      code: 201,
      data: {
        email: result.email,
        token,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      error: error.message,
    });
  }
};

const updateUserController = async (req, res, next) => {
  const { userId } = req.params;
  const { major } = req.body;
  try {
    const result = await updateUser(userId, { major });
    console.log(result);
    if (result) {
      res.status(404).json({
        status: "updated",
        code: 200,
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "error",
    });
  }
};

const getCurrentUserName = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      // Dacă antetul "Authorization" lipsește, returnați o eroare de autentificare
      return res
        .status(401)
        .json({ status: "error", message: "Missing Authorization header" });
    }

    // Extrageți token-ul eliminând prefixul "Bearer "
    const token = authHeader.split(" ")[1];

    // Verificați token-ul utilizând cheia secretă
    const user = jwt.verify(token, secret);
    console.log(user);
    // Continuați cu logica dvs. pentru a găsi utilizatorul și a trimite răspunsul
    const result = await findUserName({ email: user.email });
    console.log(result);
    if (result) {
      res.status(200).json({
        status: "success",
        code: 200,
        data: { name: result.name },
      });
    } else {
      // Returnați o eroare 404 sau 401 în funcție de situație
      res.status(404).json({ status: "error", message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

const uploadAvatarController = async (req, res, next) => {
  console.log("test"); // Se afișează un mesaj de test în consolă.

  try {
    if (!req.file) {
      return res.status(404).json({ error: "Nu exista fisier de incarcat!" });
      // Dacă nu există fișier în cerere, se returnează o eroare 404.
    }

    const uniqFilename = `${req.user._id}-${Date.now()}${path.extname(
      req.file.originalname
    )}`;
    // Se creează un nume unic pentru fișierul de avatar,
    // folosind ID-ul utilizatorului și marcajul de timp.

    const destinationPath = path.join(
      __dirname,
      `../public/avatars/${uniqFilename}`
    ); // Se definește calea de destinație pentru fișierul final de avatar.

    // Utilizează Jimp pentru redimensionare, ajustarea calității și transformare în tonuri de gri
    await Jimp.read(req.file.path)
      .then((image) => {
        return image
          .resize(350, 350)
          .quality(60)
          .greyscale()
          .writeAsync(destinationPath);
        // Se redimensionează, ajustează calitatea și se convertește la tonuri de gri,
        // apoi se salvează în calea de destinație.
      })
      .then(() => {
        fs.unlinkSync(req.file.path);
        // Se șterge fișierul original după redimensionare,
        // ajustare calitate și transformare în tonuri de gri.
      })
      .catch((error) => {
        throw error; // Se aruncă o excepție în caz de eroare în timpul procesării imaginii cu Jimp.
      });

    req.user.avatarUrl = `/avatars/${uniqFilename}`;
    // Se actualizează calea avatarului în obiectul utilizatorului.
    await req.user.save(); // Se salvează modificările în obiectul utilizatorului în baza de date.

    res.status(200).json({ avatarUrl: req.user.avatarUrl }); // Se trimite răspunsul HTTP cu URL-ul noului avatar.
  } catch (error) {
    res.status(404).json({ error: error.message }); // Se returnează o eroare 404 în caz de orice altă eroare și se trece la middleware-ul următor în lanț.
    next(error);
  }
};

const verifyEmailController = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    console.log(verificationToken);
    await verifyEmail(verificationToken);

    res.status(200).json({ mesaj: "Email verificat cu success", code: 200 });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getUsersController,
  createUserController,
  loginUserController,
  updateUserController,
  getTutorsController,
  getCurrentUserName,
  uploadAvatarController,
  verifyEmailController,
};
