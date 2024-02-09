const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Registration endpoint.
router.post("/register", userController.registerUser);
// Login endpoint.
router.post("/login", userController.loginUser);
// User info endpoint.
router.get("/user/:id", userController.getUserInfo);
// Get all users endpoint.
router.get("/credentials", async (req, res) => {
  try {
  } catch {}
});

// Authorisation middleware to check user permissions for specific routes.
function checkPermissions(permission) {
  return function (req, res, next) {
    if (
      !req.user ||
      !req.user.permissions ||
      !req.user.permissions.includes(permission)
    ) {
      return res.status(403).json({
        message:
          "Forbidden: You do not have permission to access this resource.",
      });
    }
    next();
  };
}

module.exports = router;
