const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
var userValidator = require("../middlewares/user-validator")

router.get("/login", authController.login);
router.post("/login", authController.processlogin);

router.post("/logout", authController.logout);

router.get("/register", authController.create);
router.post("/register", userValidator, authController.store);

module.exports = router;
