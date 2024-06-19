const Model = require("../models/plain");

const getAll = async (req, res) => {
  try {
    const plains = await Model.find({});
    res.status(200).json({ plains });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getOne = async (req, res) => {
  try {
    const { id: plainID } = req.params;
    const plain = await Model.findOne({ _id: plainID });
    if (!plain) {
      return res.status(404).json({ msg: `not found with id: ${plainID}` });
    }
    res.status(200).json({ plain });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const create = async (req, res) => {
  try {
    const plain = await Model.create(req.body);
    res.status(201).json({ plain });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id: plainID } = req.params;
    const plain = await Model.findOneAndDelete({ _id: plainID });
    if (!plain) {
      return res.status(404).json({ msg: `not found with id: ${plainID}` });
    }
    res.status(200).json({ plain });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const update = async (req, res) => {
  try {
    const { id: plainID } = req.params;
    const plain = await Model.findOneAndUpdate({ _id: plainID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!plain) {
      return res.status(404).json({ msg: `not found with id: ${plainID}` });
    }
    res.status(200).json({ plain });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

module.exports = { getAll, getOne, create, deleteOne, update };
