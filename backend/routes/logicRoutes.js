const express = require("express");
const router = express.Router();
const { run, pause, reset } = require("../controllers/logicController");

router.route("/run").post(run)

router.route("/reset").post(reset);

module.exports = router;
