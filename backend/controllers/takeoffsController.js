let { takeoffsList } = require("../data/data.js");

const getAll = async (req, res) => {
    try {
      res.status(200).json({ takeoffsList });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  };


  module.exports = { getAll };
