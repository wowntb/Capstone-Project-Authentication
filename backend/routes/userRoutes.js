const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Registration endpoint.
router.post("/register", userController.registerUser);
// Login endpoint.
router.post("/login", userController.loginUser);
// User info endpoint.
router.get("/user/:email", userController.getUserInfo);
// Get all credentials from a division endpoint.
router.get("/credentials/:division", userController.getDivisionCredentials);
// Update credentials endpoint.
router.put("/update/:id", userController.updateCredentials);
// Get all users endpoint.
router.get("/users", userController.getAllUsers);

module.exports = router;
