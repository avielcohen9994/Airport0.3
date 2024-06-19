const express = require("express");
const router = express.Router();

const { getAll } = require("../controllers/landingsController.js");

router.route("/").get(getAll);

module.exports = router;
