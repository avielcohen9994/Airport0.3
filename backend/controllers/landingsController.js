
let { landingsList } = require("../data/data");


const getAll = async (req, res) => {
    try {
      res.status(200).json({ landingsList });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  };

  module.exports = { getAll };
