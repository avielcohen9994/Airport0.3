const Model = require("../models/station.js");

const getAll = async (req, res) => {
  try {
    const stations = await Model.find({});
    res.status(200).json({ stations });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getOne = async (req, res) => {
  try {
    const { id: stationID } = req.params;
    const station = await Model.findOne({ _id: stationID });
    if (!plain) {
      return res.status(404).json({ msg: `not found with id: ${stationID}` });
    }
    res.status(200).json({ station });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const create = async (req, res) => {
  try {
    const station = await Model.create(req.body);
    res.status(201).json({ station });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id: stationID } = req.params;
    const station = await Model.findOneAndDelete({ _id: stationID });
    if (!plain) {
      return res.status(404).json({ msg: `not found with id: ${stationID}` });
    }
    res.status(200).json({ station });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const update = async (req, res) => {
  try {
    const { id: stationID } = req.params;
    const station = await Model.findOneAndUpdate({ _id: stationID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!plain) {
      return res.status(404).json({ msg: `not found with id: ${stationID}` });
    }
    res.status(200).json({ station });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

module.exports = { getAll, getOne, create, deleteOne, update };
