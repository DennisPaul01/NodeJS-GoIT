const express = require("express");
const router = express.Router();

const controller = require("../controllers");

router.get("/users", controller.get);
router.post("/users", controller.create);
router.patch("/users/:userId/major", controller.update);

module.exports = router;
