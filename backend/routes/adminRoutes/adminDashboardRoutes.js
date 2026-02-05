const express = require("express");
const adminAuth = require("../../middlewares/adminAuthMiddleware");
const {
  getDashboardStats,
} = require("../../controllers/admin/adminDashboardController");

const router = express.Router();

// 🔐 Protected (admin only)
router.get("/dashboard/stats", adminAuth, getDashboardStats);

module.exports = router;
