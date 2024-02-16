const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user_controller");

// Registration endpoint.
router.post("/register", user_controller.registerUser);
// Login endpoint.
router.post("/login", user_controller.loginUser);
// User info endpoint.
router.get("/user/:username", user_controller.getUserInfo);
// Get all users endpoint.
router.get("/users", user_controller.getAllUsers);
// Update user endpoint.
router.put("/user/:id", user_controller.updateUser);

module.exports = router;
