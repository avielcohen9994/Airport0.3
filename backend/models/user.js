const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "must contain a email"],
    trim: true,
    maxlength: [30, "must be under 30 characters"],
  },
  password: {
    type: String,
    required: [true, "must contain a password"],
    trim: true,
    maxlength: [100, "must be under 100 characters"],
  }
});

module.exports = mongoose.model("User", userSchema);
