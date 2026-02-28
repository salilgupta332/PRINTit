const express = require("express");
const adminAuth = require("../../middlewares/adminAuthMiddleware");
const { getAdminFilePreview } = require("../../controllers/adminAssignmentController");
const {
  getAllAssignments,
  updateAssignmentStatus,
  getAssignmentById
} = require("../../controllers/adminAssignmentController");

const router = express.Router();

router.get("/assignments", adminAuth, getAllAssignments);
router.put("/assignments/:id/status", adminAuth, updateAssignmentStatus);
router.get("/assignments/file", adminAuth, getAdminFilePreview);
router.get("/assignments/:id", adminAuth, getAssignmentById);
module.exports = router;
