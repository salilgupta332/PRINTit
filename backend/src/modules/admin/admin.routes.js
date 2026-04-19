const express = require("express");
const adminAuth = require("../../shared/middlewares/adminAuthMiddleware");

const {
  signupAdmin,
  loginAdmin,
  registerAdmin,
  getDashboardStats,
  getAllAssignments,
  updateAssignmentStatus,
  updateAssignmentNote,
  getAssignmentById,
  acceptAssignment,
  getAdminFilePreview,
} = require("./admin.controller");

const router = express.Router();

router.post("/signup", signupAdmin);
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

router.get("/dashboard/stats", adminAuth, getDashboardStats);

router.get("/me", adminAuth, (req, res) => {
  res.json({
    success: true,
    message: "Admin access granted",
    adminId: req.adminId,
  });
});

router.get("/assignments", adminAuth, getAllAssignments);
router.put("/assignments/:id/status", adminAuth, updateAssignmentStatus);
router.put("/assignments/:id/note", adminAuth, updateAssignmentNote);
router.get("/assignments/file", adminAuth, getAdminFilePreview);
router.get("/assignments/:id", adminAuth, getAssignmentById);
router.put("/assignments/:id/accept", adminAuth, acceptAssignment);

module.exports = router;
