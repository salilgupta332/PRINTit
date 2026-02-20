const express = require("express");
const {
  signupAdmin,
  loginAdmin,
  registerAdmin
} = require("../../controllers/admin/adminAuthController");

const router = express.Router();

/**
 * Legacy (keep temporarily)
 * simple admin creation
 */
router.post("/signup", signupAdmin);

/**
 * NEW Shop Owner Registration (3-step form)
 */
router.post("/register", registerAdmin);

/**
 * Login stays same
 */
router.post("/login", loginAdmin);

module.exports = router;