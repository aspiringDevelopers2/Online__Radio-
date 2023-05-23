const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");
router.route("/").get(authController.protected, userController.getAllUsers);
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
module.exports = router;
