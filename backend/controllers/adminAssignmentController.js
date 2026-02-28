const Assignment = require("../models/Assignment");
const { getSignedFileUrl } = require("../utils/s3Upload");
/**
 * GET /api/admin/assignments
 */
exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json(assignments);
  } catch (error) {
    console.error("Fetch assignments error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /api/admin/assignments/:id/status
 */
exports.updateAssignmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const allowedStatuses = [
      "requested",
      "in_progress",
      "printing",
      "dispatched",
      "delivered",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    assignment.status = status;
    await assignment.save();

    res.json({
      success: true,
      message: "Assignment status updated successfully",
      assignment,
    });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id).populate(
      "student",
      "name email",
    );

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json(assignment);
  } catch (error) {
    console.error("Fetch assignment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getAdminFilePreview = async (req, res) => {
  try {
    const key = decodeURIComponent(req.query.key);

    if (!key) {
      return res.status(400).json({ message: "File key missing" });
    }

    const signedUrl = await getSignedFileUrl(key);

    res.json({ url: signedUrl });
  } catch (error) {
    console.error("Admin preview error:", error);
    res.status(500).json({ message: "Failed to generate preview URL" });
  }
};
