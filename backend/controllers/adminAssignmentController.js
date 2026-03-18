const Assignment = require("../models/Assignment");
const { getSignedFileUrl } = require("../utils/s3Upload");
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
/**
 * GET /api/admin/assignments
 */
exports.getAllAssignments = async (req, res) => {
  try {
    console.log("req.adminId =>", req.adminId);
    const allAssignments = await Assignment.find().sort({ createdAt: -1 });
    console.log(
      "all assignments =>",
      allAssignments.map((a) => ({
        id: a._id,
        orderNumber: a.orderNumber,
        broadcastTo: a.broadcastTo,
        assignedTo: a.assignedTo,
      })),
    );

const adminObjectId = new mongoose.Types.ObjectId(req.adminId);

const assignments = await Assignment.find({
  $and: [
    { broadcastTo: { $in: [adminObjectId] } },
    {
      $or: [
        { assignedTo: null },
        { assignedTo: adminObjectId }, // ✅ FIX
      ],
    },
  ],
}).sort({ createdAt: -1 });

console.log("adminId type:", typeof req.adminId);
console.log("converted:", new mongoose.Types.ObjectId(req.adminId));

    console.log(
      "filtered assignments =>",
      assignments.map((a) => ({
        id: a._id,
        orderNumber: a.orderNumber,
      })),
    );

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
    const iconMap = {
      requested: "create",
      in_progress: "accept",
      printing: "printing",
      dispatched: "ready",
      delivered: "delivered",
    };

    assignment.activityLog.push({
      action: `Status changed to ${status}`,
      by: "Admin",
      icon: iconMap[status] || "accept",
    });
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
      "customer.registeredUser",
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

exports.acceptAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("👉 Accept request:", id);
    console.log("👉 Admin:", req.adminId);

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    if (assignment.assignedTo) {
      return res.status(400).json({ message: "Already assigned" });
    }

    // ✅ assign
    assignment.assignedTo = req.adminId;
    assignment.status = "accepted";

    await assignment.save();

    // 🔥 SOCKET
    const io = req.app.get("io");

    if (assignment.broadcastTo && Array.isArray(assignment.broadcastTo)) {
      assignment.broadcastTo.forEach((shopId) => {
        io.to(shopId.toString()).emit("order-taken", assignment._id);
      });
    }

    res.json({
      message: "Order accepted",
      assignment,
    });
  } catch (err) {
    console.error("❌ ACCEPT ERROR FULL:", err); // 👈 IMPORTANT
    res.status(500).json({ message: "Server error" });
  }
};
