const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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

      // Hash the password.
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user.
      user = new User({
        username,
        email,
        password: hashedPassword,
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
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      // Generate JWT token.
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
};
