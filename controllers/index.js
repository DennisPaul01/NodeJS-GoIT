const jwt = require("jsonwebtoken");
const User = require("../services/schemas/UserSchema");
require("dotenv").config();

const secret = process.env.SECRET;

const {
  getAllUsers,
  createUser,
  updateUser,
  checkUserDB,
  getAllTutors,
  findUserName,
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
    const { email, password } = req.body;

    console.log(email);
    const result = await createUser({
      email,
      password,
    });

    const payload = { email: result.email };

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    res.status(201).json({
      status: "succes",
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

module.exports = {
  getUsersController,
  createUserController,
  loginUserController,
  updateUserController,
  getTutorsController,
  getCurrentUserName,
};
