const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  registerUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if user already exists.
      let user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create a new user.
      user = new User({
        username,
        password,
      });

      // Saves the user document in the Mongo database.
      await user.save();

      res.json({ message: "User registered successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if the user exists.
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      // Check if the password matches.
      if (password !== user.password) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      // Generate JWT token.
      const token = jwt.sign({ username: user.username }, JWT_SECRET);

      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  getUserInfo: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  updateUser: async (req, res) => {
    const updatedUser = req.body;
    try {
      let user = await User.findById(updatedUser._id);
      if (!user) {
        return res.status(404).json({ error: "Credential not found" });
      }
      user = await User.findByIdAndUpdate(
        updatedUser._id,
        { $set: updatedUser },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
};
