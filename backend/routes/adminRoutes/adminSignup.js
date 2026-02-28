const express = require("express");
const { signupAdmin } = require("../../controllers/admin/adminAuthController");

const router = express.Router();

/**
 * POST /api/admin/signup
 */
router.post("/signup", signupAdmin);

module.exports = router;
