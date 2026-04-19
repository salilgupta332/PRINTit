const express = require("express");

const Assignment = require("./order.model");
const authMiddleware = require("../../shared/middlewares/userAuthMiddleware");
const upload = require("../../shared/middlewares/uploadMiddleware");
const { createAssignment, getAssignmentFile } = require("./order.controller");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "uploadedFiles", maxCount: 5 },
    { name: "layoutFiles", maxCount: 2 },
  ]),
  createAssignment,
);

router.get("/file/:assignmentId/:fileIndex", authMiddleware, getAssignmentFile);

router.get("/my", authMiddleware, async (req, res) => {
  try {
    const assignments = await Assignment.find({
      "customer.registeredUser": req.user.id,
    }).sort({ createdAt: -1 });

    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const assignment = await Assignment.findOne({
      _id: req.params.id,
      "customer.registeredUser": req.user.id,
    });

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json({ assignment });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
