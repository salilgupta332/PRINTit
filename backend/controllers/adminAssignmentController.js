const Assignment = require("../models/Assignment");
const PANOrder = require("../models/PANOrder");
const AadhaarOrder = require("../models/AadhaarOrder");
const { getSignedFileUrl } = require("../utils/s3Upload");
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const SHOP_BROADCAST_RADIUS_METERS = 5000;

const getAdminObjectId = (adminId) => new mongoose.Types.ObjectId(adminId);

const buildVisibleOrderFilter = (adminObjectId) => ({
  $and: [
    { broadcastTo: { $in: [adminObjectId] } },
    {
      $or: [
        { assignedTo: null },
        { assignedTo: adminObjectId },
      ],
    },
  ],
});

const getNextPanOrderNumber = async () => {
  const last = await PANOrder.findOne({ orderNumber: { $exists: true, $ne: null } })
    .sort({ createdAt: -1 });

  let next = 1;
  if (last?.orderNumber) {
    const num = parseInt(last.orderNumber.split("-")[1], 10);
    if (!Number.isNaN(num)) next = num + 1;
  }

  return `PAN-${String(next).padStart(4, "0")}`;
};

const getNextAadhaarOrderNumber = async () => {
  const last = await AadhaarOrder.findOne({ orderNumber: { $exists: true, $ne: null } })
    .sort({ createdAt: -1 });

  let next = 1;
  if (last?.orderNumber) {
    const num = parseInt(last.orderNumber.split("-")[1], 10);
    if (!Number.isNaN(num)) next = num + 1;
  }

  return `AAD-${String(next).padStart(4, "0")}`;
};

const normalizePanStatus = (status) => {
  if (status === "pending") return "requested";
  if (status === "processing") return "in_progress";
  if (status === "ready") return "printing";
  if (status === "completed") return "delivered";
  return status || "requested";
};

const denormalizePanStatus = (status) => {
  if (status === "requested") return "requested";
  if (status === "accepted") return "accepted";
  if (status === "in_progress") return "in_progress";
  if (status === "printing") return "printing";
  if (status === "dispatched") return "dispatched";
  if (status === "delivered") return "delivered";
  return status;
};

const normalizeAadhaarStatus = (status) => {
  if (status === "pending") return "requested";
  if (status === "processing") return "in_progress";
  if (status === "ready") return "printing";
  if (status === "completed") return "delivered";
  return status || "requested";
};

const denormalizeAadhaarStatus = (status) => {
  if (status === "requested") return "requested";
  if (status === "accepted") return "accepted";
  if (status === "in_progress") return "in_progress";
  if (status === "printing") return "printing";
  if (status === "dispatched") return "dispatched";
  if (status === "delivered") return "delivered";
  return status;
};

const ensurePanOrderMetadata = async (panOrder) => {
  let changed = false;

  if (!panOrder.orderNumber) {
    panOrder.orderNumber = await getNextPanOrderNumber();
    changed = true;
  }

  const coordinates = panOrder.location?.coordinates;
  if (Array.isArray(coordinates) && coordinates.length === 2) {
    const nearbyAdmins = await Admin.find({
      "location.geo": {
        $near: {
          $geometry: {
            type: "Point",
            coordinates,
          },
          $maxDistance: SHOP_BROADCAST_RADIUS_METERS,
        },
      },
    }, "_id");

    const nextBroadcastTo = nearbyAdmins.map((admin) => admin._id.toString()).sort();
    const currentBroadcastTo = (panOrder.broadcastTo || [])
      .map((adminId) => adminId.toString())
      .sort();

    if (JSON.stringify(currentBroadcastTo) !== JSON.stringify(nextBroadcastTo)) {
      panOrder.broadcastTo = nearbyAdmins.map((admin) => admin._id);
      changed = true;
    }
  } else if ((panOrder.broadcastTo || []).length > 0 && !panOrder.assignedTo) {
    panOrder.broadcastTo = [];
    changed = true;
  }

  if (!panOrder.activityLog || panOrder.activityLog.length === 0) {
    panOrder.activityLog = [
      {
        action: "Order created",
        by: "Customer",
        icon: "create",
        createdAt: panOrder.createdAt,
      },
    ];
    changed = true;
  }

  const normalizedStatus = normalizePanStatus(panOrder.status);
  if (normalizedStatus !== panOrder.status) {
    panOrder.status = normalizedStatus;
    changed = true;
  }

  if (changed) {
    await panOrder.save();
  }

  return panOrder;
};

const ensureAadhaarOrderMetadata = async (aadhaarOrder) => {
  let changed = false;

  if (!aadhaarOrder.orderNumber) {
    aadhaarOrder.orderNumber = await getNextAadhaarOrderNumber();
    changed = true;
  }

  const coordinates = aadhaarOrder.location?.coordinates;
  if (Array.isArray(coordinates) && coordinates.length === 2) {
    const nearbyAdmins = await Admin.find({
      "location.geo": {
        $near: {
          $geometry: {
            type: "Point",
            coordinates,
          },
          $maxDistance: SHOP_BROADCAST_RADIUS_METERS,
        },
      },
    }, "_id");

    const nextBroadcastTo = nearbyAdmins.map((admin) => admin._id.toString()).sort();
    const currentBroadcastTo = (aadhaarOrder.broadcastTo || [])
      .map((adminId) => adminId.toString())
      .sort();

    if (JSON.stringify(currentBroadcastTo) !== JSON.stringify(nextBroadcastTo)) {
      aadhaarOrder.broadcastTo = nearbyAdmins.map((admin) => admin._id);
      changed = true;
    }
  } else if ((aadhaarOrder.broadcastTo || []).length > 0 && !aadhaarOrder.assignedTo) {
    aadhaarOrder.broadcastTo = [];
    changed = true;
  }

  if (!aadhaarOrder.activityLog || aadhaarOrder.activityLog.length === 0) {
    aadhaarOrder.activityLog = [
      {
        action: "Order created",
        by: "Customer",
        icon: "create",
        createdAt: aadhaarOrder.createdAt,
      },
    ];
    changed = true;
  }

  const normalizedStatus = normalizeAadhaarStatus(aadhaarOrder.status);
  if (normalizedStatus !== aadhaarOrder.status) {
    aadhaarOrder.status = normalizedStatus;
    changed = true;
  }

  if (changed) {
    await aadhaarOrder.save();
  }

  return aadhaarOrder;
};

const mapPanOrderToAssignmentShape = (panOrder) => ({
  _id: panOrder._id,
  orderNumber: panOrder.orderNumber || panOrder._id.toString(),
  customer: {
    name: panOrder.fullName,
    phone: panOrder.mobile,
    email: panOrder.email,
  },
  assignmentType: "student_upload",
  subjectName: "Official Document Printing",
  assignmentTitle: "PAN Card Print",
  academicLevel: "college",
  deadline: panOrder.createdAt,
  language: "english",
  uploadedFiles: [
    {
      filename: "PAN Card File",
      key: panOrder.fileKey,
    },
  ],
  assignmentDescription:
    panOrder.assignmentDescription ||
    `PAN card print order. PAN number: ${panOrder.panNumber}`,
  printPreferences: {
    printType: panOrder.printType === "pvc" ? "color" : panOrder.printType || "color",
    paperSize: "A4",
    paperQuality: "normal",
    bindingRequired: false,
    copies: panOrder.copies || 1,
  },
  deliveryType: panOrder.deliveryType === "delivery" ? "home_delivery" : "pickup",
  address: {
    recipientName: panOrder.address?.recipientName || panOrder.fullName,
    phoneNumber: panOrder.address?.phone || panOrder.mobile,
    addressLine1: panOrder.address?.addressLine1 || panOrder.address?.houseNo || "",
    addressLine2: panOrder.address?.addressLine2 || "",
    city: panOrder.address?.city || "",
    state: panOrder.address?.state || "",
    pincode: panOrder.address?.pincode || "",
    landmark: panOrder.address?.landmark || "",
  },
  price: 0,
  totalPages: panOrder.copies || 1,
  status: normalizePanStatus(panOrder.status),
  assignedTo: panOrder.assignedTo || null,
  broadcastTo: panOrder.broadcastTo || [],
  activityLog: panOrder.activityLog || [],
  createdAt: panOrder.createdAt,
  updatedAt: panOrder.updatedAt,
  sourceType: "pan_order",
});

const mapAadhaarOrderToAssignmentShape = (aadhaarOrder) => ({
  _id: aadhaarOrder._id,
  orderNumber: aadhaarOrder.orderNumber || aadhaarOrder._id.toString(),
  customer: {
    name: aadhaarOrder.fullName,
    phone: aadhaarOrder.mobile,
    email: aadhaarOrder.email,
  },
  assignmentType: "student_upload",
  subjectName: "Official Document Printing",
  assignmentTitle: "Aadhaar Card Print",
  academicLevel: "college",
  deadline: aadhaarOrder.createdAt,
  language: "english",
  uploadedFiles: [
    {
      filename: "Aadhaar Card File",
      key: aadhaarOrder.fileKey,
    },
  ],
  assignmentDescription: `Aadhaar print order. Aadhaar number: ${aadhaarOrder.aadhaarNumber || "-"}`,
  printPreferences: {
    printType: aadhaarOrder.printType === "pvc" ? "color" : "black_white",
    paperSize: "A4",
    paperQuality: "normal",
    bindingRequired: false,
    copies: aadhaarOrder.copies || 1,
  },
  deliveryType: aadhaarOrder.deliveryType === "delivery" ? "home_delivery" : "pickup",
  address: {
    recipientName: aadhaarOrder.address?.recipientName || aadhaarOrder.fullName,
    phoneNumber: aadhaarOrder.address?.phone || aadhaarOrder.mobile,
    addressLine1: aadhaarOrder.address?.addressLine1 || aadhaarOrder.address?.houseNo || "",
    addressLine2: aadhaarOrder.address?.addressLine2 || "",
    city: aadhaarOrder.address?.city || "",
    state: aadhaarOrder.address?.state || "",
    pincode: aadhaarOrder.address?.pincode || "",
    landmark: aadhaarOrder.address?.landmark || "",
  },
  price: 0,
  totalPages: aadhaarOrder.copies || 1,
  status: normalizeAadhaarStatus(aadhaarOrder.status),
  assignedTo: aadhaarOrder.assignedTo || null,
  broadcastTo: aadhaarOrder.broadcastTo || [],
  activityLog: aadhaarOrder.activityLog || [],
  createdAt: aadhaarOrder.createdAt,
  updatedAt: aadhaarOrder.updatedAt,
  sourceType: "aadhaar_order",
});

/**
 * GET /api/admin/assignments
 */
exports.getAllAssignments = async (req, res) => {
  try {
    const adminObjectId = getAdminObjectId(req.adminId);
    const panOrders = await PANOrder.find({
      $or: [
        { broadcastTo: { $exists: false } },
        { broadcastTo: { $size: 0 } },
        buildVisibleOrderFilter(adminObjectId),
      ],
    }).sort({ createdAt: -1 });

    const aadhaarOrders = await AadhaarOrder.find({
      $or: [
        { broadcastTo: { $exists: false } },
        { broadcastTo: { $size: 0 } },
        buildVisibleOrderFilter(adminObjectId),
      ],
    }).sort({ createdAt: -1 });

    for (const panOrder of panOrders) {
      await ensurePanOrderMetadata(panOrder);
    }

    for (const aadhaarOrder of aadhaarOrders) {
      await ensureAadhaarOrderMetadata(aadhaarOrder);
    }

    const assignments = await Assignment.find(
      buildVisibleOrderFilter(adminObjectId),
    ).sort({ createdAt: -1 }).lean();

    const visiblePanOrders = await PANOrder.find(
      buildVisibleOrderFilter(adminObjectId),
    ).sort({ createdAt: -1 }).lean();

    const visibleAadhaarOrders = await AadhaarOrder.find(
      buildVisibleOrderFilter(adminObjectId),
    ).sort({ createdAt: -1 }).lean();

    const combinedOrders = [
      ...assignments,
      ...visiblePanOrders.map(mapPanOrderToAssignmentShape),
      ...visibleAadhaarOrders.map(mapAadhaarOrderToAssignmentShape),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(combinedOrders);
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

    let assignment = await Assignment.findById(id);
    let isPanOrder = false;
    let isAadhaarOrder = false;

    if (!assignment) {
      assignment = await PANOrder.findById(id);
      isPanOrder = Boolean(assignment);
    }

    if (!assignment) {
      assignment = await AadhaarOrder.findById(id);
      isAadhaarOrder = Boolean(assignment);
    }

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    if (!assignment.assignedTo || assignment.assignedTo.toString() !== req.adminId.toString()) {
      return res.status(403).json({
        message: "Only the admin who accepted this order can update its status",
      });
    }

    const statusOrder = {
      requested: 0,
      accepted: 1,
      in_progress: 2,
      printing: 3,
      dispatched: 4,
      delivered: 5,
    };

    const normalizedCurrentStatus = isPanOrder
      ? normalizePanStatus(assignment.status)
      : isAadhaarOrder
        ? normalizeAadhaarStatus(assignment.status)
        : assignment.status;

    const currentStatusRank = statusOrder[normalizedCurrentStatus];
    const nextStatusRank = statusOrder[status];

    if (nextStatusRank === undefined || currentStatusRank === undefined) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    if (nextStatusRank < currentStatusRank) {
      return res.status(400).json({
        message: `Cannot move status backward from ${assignment.status} to ${status}`,
      });
    }

    assignment.status = isPanOrder
      ? denormalizePanStatus(status)
      : isAadhaarOrder
        ? denormalizeAadhaarStatus(status)
        : status;

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
      assignment: isPanOrder
        ? mapPanOrderToAssignmentShape(assignment.toObject())
        : isAadhaarOrder
          ? mapAadhaarOrderToAssignmentShape(assignment.toObject())
          : assignment,
    });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateAssignmentNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    let assignment = await Assignment.findById(id);
    let isPanOrder = false;
    let isAadhaarOrder = false;

    if (!assignment) {
      assignment = await PANOrder.findById(id);
      isPanOrder = Boolean(assignment);
    }

    if (!assignment) {
      assignment = await AadhaarOrder.findById(id);
      isAadhaarOrder = Boolean(assignment);
    }

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    if (!assignment.assignedTo || assignment.assignedTo.toString() !== req.adminId.toString()) {
      return res.status(403).json({
        message: "Only the admin who accepted this order can add updates",
      });
    }

    assignment.assignmentDescription = note || "";
    assignment.activityLog.push({
      action: "Admin note updated",
      by: "Admin",
      icon: "accept",
    });

    await assignment.save();

    res.json({
      success: true,
      message: "Assignment note updated successfully",
      assignment: isPanOrder
        ? mapPanOrderToAssignmentShape(assignment.toObject())
        : isAadhaarOrder
          ? mapAadhaarOrderToAssignmentShape(assignment.toObject())
          : assignment,
    });
  } catch (error) {
    console.error("Update note error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAssignmentById = async (req, res) => {
  try {
    let assignment = await Assignment.findById(req.params.id).populate(
      "customer.registeredUser",
      "name email",
    );

    if (!assignment) {
      const panOrder = await PANOrder.findById(req.params.id);
      if (panOrder) {
        await ensurePanOrderMetadata(panOrder);
        return res.json(mapPanOrderToAssignmentShape(panOrder.toObject()));
      }

      const aadhaarOrder = await AadhaarOrder.findById(req.params.id);
      if (!aadhaarOrder) {
        return res.status(404).json({ message: "Assignment not found" });
      }

      await ensureAadhaarOrderMetadata(aadhaarOrder);

      return res.json(mapAadhaarOrderToAssignmentShape(aadhaarOrder.toObject()));
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

    let assignment = await Assignment.findById(id);
    let isPanOrder = false;
    let isAadhaarOrder = false;

    if (!assignment) {
      assignment = await PANOrder.findById(id);
      isPanOrder = Boolean(assignment);
    }

    if (!assignment) {
      assignment = await AadhaarOrder.findById(id);
      isAadhaarOrder = Boolean(assignment);
    }

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    if (assignment.assignedTo) {
      return res.status(400).json({ message: "Already assigned" });
    }

    assignment.assignedTo = req.adminId;
    assignment.status = isPanOrder ? "accepted" : "accepted";
    assignment.activityLog.push({
      action: "Status changed to accepted",
      by: "Admin",
      icon: "accept",
    });

    await assignment.save();

    const io = req.app.get("io");
    (assignment.broadcastTo || []).forEach((shopId) => {
      if (shopId.toString() !== req.adminId.toString()) {
        io.to(shopId.toString()).emit("order-taken", {
          orderId: assignment._id,
          assignedTo: assignment.assignedTo,
        });
      }
    });

    res.json({
      message: "Order accepted",
      assignment: isPanOrder
        ? mapPanOrderToAssignmentShape(assignment.toObject())
        : isAadhaarOrder
          ? mapAadhaarOrderToAssignmentShape(assignment.toObject())
          : assignment,
    });
  } catch (err) {
    console.error("ACCEPT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
