const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const { createAssignment } = require("../controllers/assignmentController");



// @route   POST /api/assignments
// @desc    Create new assignment (student)
// @access  Private
router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "uploadedFiles", maxCount: 5 },
    { name: "layoutFiles", maxCount: 2 }
  ]),
  createAssignment
);

module.exports = router;
