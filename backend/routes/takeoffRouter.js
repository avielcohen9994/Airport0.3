const express = require("express");
const router = express.Router();

const {
  getAll
} = require("../controllers/takeoffsController.js");

router
.route("/")
.get(getAll)

module.exports = router;
