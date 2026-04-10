const express = require("express");
const adminAuth = require("../../middlewares/adminAuthMiddleware");

const { getAdminFilePreview } = require("../../controllers/adminAssignmentController");
const {
  getAllAssignments,
  updateAssignmentStatus,
  updateAssignmentNote,
  getAssignmentById,
  acceptAssignment,
} = require("../../controllers/adminAssignmentController");

const router = express.Router();

router.get("/assignments", adminAuth, getAllAssignments);
router.put("/assignments/:id/status", adminAuth, updateAssignmentStatus);
router.put("/assignments/:id/note", adminAuth, updateAssignmentNote);
router.get("/assignments/file", adminAuth, getAdminFilePreview);
router.get("/assignments/:id", adminAuth, getAssignmentById);
router.put(
  "/assignments/:id/accept",
  adminAuth,
  acceptAssignment
);
module.exports = router;
