const express = require("express");
const Assignment = require("../models/Assignment");
const authMiddleware = require("../middlewares/userAuthMiddleware");

const router = express.Router();

// @route   GET /api/assignments/my
// @desc    Get logged-in student's assignments
// @access  Private
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const assignments = await Assignment.find({
      "customer.registeredUser": req.user.id
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
      student: req.user.id, // security: only owner can view
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




