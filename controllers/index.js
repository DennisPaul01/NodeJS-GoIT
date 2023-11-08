const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET;

const {
  getAllUsers,
  createUser,
  updateUser,
  checkUserDB,
  getAllTutors,
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
      res.status(200).json({
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

module.exports = {
  getUsersController,
  createUserController,
  loginUserController,
  updateUserController,
  getTutorsController,
};
