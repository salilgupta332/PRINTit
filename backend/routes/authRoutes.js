const express = require("express");
const { register } = require("../controllers/userAuthController");

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register student user
// @access  Public
router.post("/register", register);

module.exports = router;
