const mongoose = require("mongoose");

const plainSchema = new mongoose.Schema({
  model: String,
  direction: {
    type: String,
    enum: ["Landing", "Takeoff"],
  },
  currentLocation: Number,
});



module.exports = mongoose.model("Plain", plainSchema);
