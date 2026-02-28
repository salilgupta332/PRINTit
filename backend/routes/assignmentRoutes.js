const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/userAuthMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const { createAssignment } = require("../controllers/assignmentController");
const { getAssignmentFile } = require("../controllers/assignmentController");

// @route   POST /api/assignments
// @desc    Create new assignment (student)
// @access  Private
router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "uploadedFiles", maxCount: 5 },
    { name: "layoutFiles", maxCount: 2 },
  ]),
  createAssignment,
);

module.exports = router;

router.get("/file/:assignmentId/:fileIndex", authMiddleware, getAssignmentFile);
