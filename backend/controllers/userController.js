const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

// Controller functions for CRUD operations.
module.exports = {
  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Check if user already exists.
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create a new user.
      user = new User({
        username,
        email,
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
      const { email, password } = req.body;

      // Check if the user exists.
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      // Check if the password matches.
      if (password !== user.password) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      // Generate JWT token.
      const token = jwt.sign({ email: user.email }, JWT_SECRET);

      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  getUserInfo: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.params.email });
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  getDivisionCredentials: async (req, res) => {
    try {
      const users = await User.find({ division: req.params.division });
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  updateCredentials: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndUpdate(id, req.body);
      res.json({ message: "Credentials updated successfully" });
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
};
