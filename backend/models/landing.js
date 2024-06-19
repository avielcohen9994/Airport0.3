const mongoose = require("mongoose");

const plainSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "must contain a name"],
    trim: true,
    maxlength: [10, "must be under 10 characters"],
  },
  seats: {
    type: Number,
  },
});

module.exports = mongoose.model("Plain", plainSchema);