const express = require("express");
const {
  register,
  forgotPassword,
  resetPassword,
  resetPasswordOtp,
} = require("../controllers/userAuthController");

const router = express.Router();

// ✅ Correct - Use controller
router.post("/register", register);

// Forgot Password
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.post("/reset-password-otp", resetPasswordOtp);

module.exports = router;
