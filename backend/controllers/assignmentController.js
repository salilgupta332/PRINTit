const Assignment = require("../models/Assignment");
const { uploadToS3, getSignedFileUrl } = require("../utils/s3Upload");

/**
 * @desc    Create new assignment (Shop creates for any customer)
 * @route   POST /api/assignments
 * @access  Public / Shopkeeper
 */
exports.createAssignment = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILES:", req.files);
    console.log("CONTENT TYPE:", req.headers["content-type"]);

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
    } = req.body;

    /* =====================
       PARSE JSON STRINGS
    ====================== */
    let parsedFrontPageDetails = null;
    let parsedPrintPreferences = null;
    let parsedAddress = null;

    try {
      if (frontPageDetails) parsedFrontPageDetails = JSON.parse(frontPageDetails);
      if (printPreferences) parsedPrintPreferences = JSON.parse(printPreferences);
      if (address) parsedAddress = JSON.parse(address);
    } catch (err) {
      return res.status(400).json({ message: "Invalid JSON format in request" });
    }

    /* =====================
       REQUIRED VALIDATION
    ====================== */
    if (!parsedCustomer?.name) {
      return res.status(400).json({ message: "Customer name is required" });
    }

    if (!assignmentType || !subjectName || !academicLevel || !deadline) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    /* =====================
       ASSIGNMENT TYPE VALIDATION
    ====================== */
    if (assignmentType === "from_scratch") {
      if (!language) {
        return res.status(400).json({
          message: "Language is required for typing assignment",
        });
      }

      if (layoutProvided === "true" && !layoutPreference && !req.files?.layoutFiles) {
        return res.status(400).json({
          message: "Layout preference or layout file required",
        });
      }
    }

    if (
      assignmentType === "student_upload" &&
      (!req.files || !req.files.uploadedFiles || req.files.uploadedFiles.length === 0)
    ) {
      return res.status(400).json({
        message: "Assignment file upload is required",
      });
    }

    /* =====================
       FILE UPLOAD (S3)
    ====================== */
    let uploadedFiles = [];
    let layoutFiles = [];

    if (req.files?.uploadedFiles) {
      uploadedFiles = await Promise.all(
        req.files.uploadedFiles.map(async (file) => {
          const s3Key = await uploadToS3(file);
          return { filename: file.originalname, key: s3Key };
        })
      );
    }

    if (req.files?.layoutFiles) {
      layoutFiles = await Promise.all(
        req.files.layoutFiles.map(async (file) => {
          const s3Key = await uploadToS3(file);
          return { filename: file.originalname, key: s3Key };
        })
      );
    }

    /* =====================
       AUTO FILL FRONT PAGE NAME
    ====================== */
    if (parsedFrontPageDetails && !parsedFrontPageDetails.studentName) {
      parsedFrontPageDetails.studentName = parsedCustomer.name;
    }

    /* =====================
       CREATE ASSIGNMENT
       
    ====================== */
    parsedCustomer.registeredUser = req.user.id;
    const assignment = await Assignment.create({
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
    });

    res.status(201).json({
      message: "Assignment created successfully",
      assignment,
    });
  } catch (error) {
    console.error("Create Assignment Error:", error);
    res.status(500).json({ message: "Server error while creating assignment" });
  }
};

/* =========================================================
   GET SIGNED FILE URL
========================================================= */

exports.getAssignmentFile = async (req, res) => {
  try {
    const { assignmentId, fileIndex } = req.params;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    const file = assignment.uploadedFiles[fileIndex];
    if (!file) return res.status(404).json({ message: "File not found" });

    const signedUrl = await getSignedFileUrl(file.key);
    res.json({ url: signedUrl });
  } catch (err) {
    console.error("Signed URL Error:", err);
    res.status(500).json({ message: "Failed to generate file access" });
  }
};