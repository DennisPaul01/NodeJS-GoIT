const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");

const {
  getUsersController,
  createUserController,
  loginUserController,
  updateUserController,
  getTutorsController,
  getCurrentUserName,
  uploadAvatarController,
} = require("../controllers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/avatars/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get("/", (req, res) => {
  res.status(200).json({ message: "API is running" });
});
router.get("/account", getUsersController);
router.post("/account/register", createUserController);
router.post("/account/login", loginUserController);
router.patch("/account/:userId", auth, updateUserController);
router.patch("/account/logout", auth, updateUserController);
router.get("/tutors", auth, getTutorsController);
router.get("/account/name", auth, getCurrentUserName);
router.patch("/avatars", auth, upload.single("avatar"), uploadAvatarController);

module.exports = router;
