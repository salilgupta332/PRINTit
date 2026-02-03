const express = require("express");
const adminAuth = require("../../middlewares/adminAuthMiddleware");

const router = express.Router();

/**
 * GET /api/admin/me
 * Test protected route
 */
router.get("/me", adminAuth, (req, res) => {
  res.json({
    success: true,
    message: "Admin access granted",
    adminId: req.adminId
  });
});

module.exports = router;
