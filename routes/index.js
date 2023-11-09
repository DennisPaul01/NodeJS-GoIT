const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

const {
  getUsersController,
  createUserController,
  loginUserController,
  updateUserController,
  getTutorsController,
  getCurrentUserName,
} = require("../controllers");

router.get("/account", getUsersController);
router.post("/account/register", createUserController);
router.post("/account/login", loginUserController);
router.patch("/account/:userId", auth, updateUserController);
router.patch("/account/logout", auth, updateUserController);
router.get("/tutors", auth, getTutorsController);
router.get("/account/name", auth, getCurrentUserName);

module.exports = router;
