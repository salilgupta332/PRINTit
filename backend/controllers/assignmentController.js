const Assignment = require("../models/Assignment");
const Admin = require("../models/Admin"); // 🔥 MISSING THA
const { uploadToS3, getSignedFileUrl } = require("../utils/s3Upload");

/**
 * CREATE ASSIGNMENT
 */
exports.createAssignment = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    /* =====================
       PARSE CUSTOMER
    ====================== */
    let parsedCustomer = null;
    if (req.body.customer) {
      try {
        parsedCustomer = JSON.parse(req.body.customer);
      } catch (err) {
        return res.status(400).json({ message: "Invalid customer format" });
      }
    }

    const {
      assignmentType,
      subjectName,
      assignmentTitle,
      academicLevel,
      deadline,
      language,
      layoutProvided,
      layoutPreference,
      frontPageRequired,
      frontPageDetails,
      assignmentDescription,
      printPreferences,
      deliveryType,
      address,
      lat,
      lng,
    } = req.body;

    /* =====================
       PARSE JSON STRINGS
    ====================== */
    let parsedFrontPageDetails = null;
    let parsedPrintPreferences = null;
    let parsedAddress = null;

    try {
      if (frontPageDetails)
        parsedFrontPageDetails = JSON.parse(frontPageDetails);
      if (printPreferences)
        parsedPrintPreferences = JSON.parse(printPreferences);
      if (address) parsedAddress = JSON.parse(address);
    } catch (err) {
      return res.status(400).json({ message: "Invalid JSON format" });
    }

    /* =====================
       VALIDATION
    ====================== */
    if (!parsedCustomer?.name) {
      return res.status(400).json({ message: "Customer name required" });
    }

    if (!assignmentType || !subjectName || !academicLevel || !deadline) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    /* =====================
       FILE UPLOAD
    ====================== */
    let uploadedFiles = [];
    let layoutFiles = [];

    if (req.files?.uploadedFiles) {
      uploadedFiles = await Promise.all(
        req.files.uploadedFiles.map(async (file) => {
          const key = await uploadToS3(file);
          return { filename: file.originalname, key };
        })
      );
    }

    if (req.files?.layoutFiles) {
      layoutFiles = await Promise.all(
        req.files.layoutFiles.map(async (file) => {
          const key = await uploadToS3(file);
          return { filename: file.originalname, key };
        })
      );
    }

    /* =====================
       ORDER NUMBER
    ====================== */
    const last = await Assignment.findOne().sort({ createdAt: -1 });

    let next = 1;
    if (last?.orderNumber) {
      const num = parseInt(last.orderNumber.split("-")[1]);
      next = num + 1;
    }

    const orderNumber = `ORD-${String(next).padStart(4, "0")}`;

    /* =====================
       SAFE LOCATION HANDLE
    ====================== */
    let locationData = null;

    if (lat && lng) {
      locationData = {
        type: "Point",
        coordinates: [Number(lng), Number(lat)],
      };
    }

    /* =====================
       CREATE ASSIGNMENT
    ====================== */
    const assignment = await Assignment.create({
      orderNumber,
      customer: parsedCustomer,

      assignmentType,
      subjectName,
      assignmentTitle,
      academicLevel,
      deadline,
      language,

      uploadedFiles,
      layoutProvided: layoutProvided === "true",
      layoutFiles,
      layoutPreference,

      frontPageRequired: frontPageRequired === "true",
      frontPageDetails: parsedFrontPageDetails,

      assignmentDescription,
      printPreferences: parsedPrintPreferences,
      deliveryType,
      address: parsedAddress,

      location: locationData, // 🔥 SAFE

      status: "requested",
    });

    /* =====================
       FIND NEARBY SHOPS
    ====================== */
    let nearbyShops = [];

    if (lat && lng) {
      nearbyShops = await Admin.find({
        "location.geo": {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [Number(lng), Number(lat)],
            },
            $maxDistance: 10000, // 10km
          },
        },
      });

      console.log("📍 Nearby shops:", nearbyShops.length);

      // SAVE BROADCAST
      assignment.broadcastTo = nearbyShops.map((s) => s._id);
      await assignment.save();

      // SOCKET EMIT
      const io = req.app.get("io");

      nearbyShops.forEach((shop) => {
        io.to(shop._id.toString()).emit("new-order", assignment);
      });
    }

    /* =====================
       RESPONSE
    ====================== */
    res.status(201).json({
      message: "Assignment created successfully",
      assignment,
      nearbyShops: nearbyShops.length,
    });

  } catch (error) {
    console.error("Create Assignment Error:", error);
    res.status(500).json({
      message: error.message || "Server error",
    });
  }
};

/* =====================
   GET FILE
===================== */
exports.getAssignmentFile = async (req, res) => {
  try {
    const { assignmentId, fileIndex } = req.params;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });

    const file = assignment.uploadedFiles[fileIndex];
    if (!file)
      return res.status(404).json({ message: "File not found" });

    const url = await getSignedFileUrl(file.key);

    res.json({ url });
  } catch (err) {
    console.error("File Error:", err);
    res.status(500).json({ message: "File access error" });
  }
};