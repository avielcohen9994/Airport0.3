const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  logout,
  verifyToken,
} = require("../controllers/authController");

router.route("/signup").post(signup);

router.route("/login").post(login);

router.route("/logout").post(logout);

router.route("/verifyTOken").post(verifyToken);

module.exports = router;
