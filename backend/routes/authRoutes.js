const express = require("express");
const {
  register,
  forgotPassword,
  resetPassword 
} = require("../controllers/userAuthController");

const router = express.Router();

// ✅ Correct - Use controller
router.post("/register", register);

// Forgot Password
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

module.exports = router;
