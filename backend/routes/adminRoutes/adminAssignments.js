const express = require("express");
const adminAuth = require("../../middlewares/adminAuthMiddleware");
const {
  getAllAssignments,
  updateAssignmentStatus
} = require("../../controllers/adminAssignmentController");

const router = express.Router();

router.get("/assignments", adminAuth, getAllAssignments);
router.put("/assignments/:id/status", adminAuth, updateAssignmentStatus);

module.exports = router;
