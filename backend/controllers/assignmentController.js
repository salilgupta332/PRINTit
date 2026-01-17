const Assignment = require("../models/Assignment");

/**
 * @desc    Create new assignment
 * @route   POST /api/assignments
 * @access  Private (Student)
 */
exports.createAssignment = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILES:", req.files);
    console.log("CONTENT TYPE:", req.headers["content-type"]);

    const studentId = req.user.id;

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

    if (frontPageDetails) {
      try {
        parsedFrontPageDetails = JSON.parse(frontPageDetails);
      } catch (err) {
        return res.status(400).json({
          message: "Invalid frontPageDetails format",
        });
      }
    }

    if (printPreferences) {
      try {
        parsedPrintPreferences = JSON.parse(printPreferences);
      } catch (err) {
        return res.status(400).json({
          message: "Invalid printPreferences format",
        });
      }
    }

    /* =====================
       COMMON VALIDATION
    ====================== */
    if (!assignmentType || !subjectName || !academicLevel || !deadline) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    /* =====================
       ASSIGNMENT TYPE VALIDATION
    ====================== */
    if (assignmentType === "from_scratch") {
      if (!language) {
        return res.status(400).json({
          message: "Language is required for from scratch assignment",
        });
      }

      if (
        layoutProvided === "true" &&
        !layoutPreference &&
        !req.files?.layoutFiles
      ) {
        return res.status(400).json({
          message: "Layout preference or layout file is required",
        });
      }
    }

    if (
      assignmentType === "student_upload" &&
      (!req.files ||
        !req.files.uploadedFiles ||
        req.files.uploadedFiles.length === 0)
    ) {
      return res.status(400).json({
        message: "Assignment file upload is required for student upload type",
      });
    }

    /* =====================
       FILE HANDLING
    ====================== */
    const uploadedFiles =
      req.files?.uploadedFiles?.map((file) => ({
        filename: file.originalname,
        path: file.path,
      })) || [];

    const layoutFiles =
      req.files?.layoutFiles?.map((file) => ({
        filename: file.originalname,
        path: file.path,
      })) || [];

    /* =====================
       FRONT PAGE VALIDATION
    ====================== */
    if (
      frontPageRequired === "true" &&
      !parsedFrontPageDetails?.institute &&
      !parsedFrontPageDetails?.institutionName
    ) {
      return res.status(400).json({
        message: "Front page details are required",
      });
    }

    /* =====================
       CREATE ASSIGNMENT
    ====================== */
    const assignment = await Assignment.create({
      student: studentId,

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
      address,
    });

    res.status(201).json({
      message: "Assignment created successfully",
      assignment,
    });
  } catch (error) {
    console.error("Create Assignment Error:", error);
    res.status(500).json({
      message: "Server error while creating assignment",
    });
  }
};
