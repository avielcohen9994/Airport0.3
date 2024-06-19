const user = require("../models/user");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { runSimulator , reset: resets  } = require("../utils/simulator");

const run = async (req, res) => {
  try {
    await runSimulator()
    res.status(200).json({ message: "run successfuly" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const reset = async (req, res) => {
  try {
    await resets()
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { run, reset };
