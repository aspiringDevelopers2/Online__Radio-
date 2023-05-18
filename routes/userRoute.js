const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");
router.route("/signup").post(authController.signup);
module.exports = router;
