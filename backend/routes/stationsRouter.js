const express = require("express");
const router = express.Router();

const {
  getAll,
  getOne,
  create,
  deleteOne,
  update,
} = require("../controllers/stationsController");

router.route("/").get(getAll).post(create);
router.route("/:id").get(getOne).patch(update).delete(deleteOne).put(update);

module.exports = router;
