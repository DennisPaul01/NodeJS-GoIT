const express = require("express");
const router = express.Router();

const {
  getUsersController,
  createUserController,
  loginUserController,
  updateUserController,
  getTutorsController,
} = require("../controllers");

router.get("/account", getUsersController);
router.post("/account/register", createUserController);
router.post("/account/login", loginUserController);
router.patch("/account/:userId", updateUserController);
router.get("/tutors", auth, getTutorsController);

module.exports = router;
