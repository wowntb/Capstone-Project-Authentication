const mongoose = require("mongoose");

// Define a schema for the User model using the mongoose.Schema method
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  organisational_unit: {
    type: String,
    default: "unassigned",
  },
  division: {
    type: Number,
    default: 0,
  },
});

// Create a model named "User" using the userSchema and export it
module.exports = mongoose.model("User", userSchema, "cool tech users");
