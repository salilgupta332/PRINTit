const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  register,
  forgotPassword,
  resetPassword,
  resetPasswordOtp,
  getCurrentUser,
  getUserDashboard,
} = require("./auth.controller");
const authMiddleware = require("../../shared/middlewares/userAuthMiddleware");
const User = require("../user/user.model");

const router = express.Router();

router.post("/register", register);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.post("/reset-password-otp", resetPasswordOtp);
router.get("/me", authMiddleware, getCurrentUser);
router.get("/dashboard", authMiddleware, getUserDashboard);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
