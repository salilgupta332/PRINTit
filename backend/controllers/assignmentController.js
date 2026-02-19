const Assignment = require("../models/Assignment");
const { uploadToS3 } = require("../utils/s3Upload");
const dynamo = require("../config/dynamo");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const mapAssignmentToDynamo = require("../models/dynamoDB/dynamoAssignment");
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
   FILE HANDLING (S3 UPLOAD)
====================== */

    let uploadedFiles = [];
    let layoutFiles = [];

    // upload assignment files
    if (req.files?.uploadedFiles) {
      uploadedFiles = await Promise.all(
        req.files.uploadedFiles.map(async (file) => {
          const s3Key = await uploadToS3(file);
          return {
            filename: file.originalname,
            key: s3Key,
          };
        }),
      );
    }

    // upload layout files
    if (req.files?.layoutFiles) {
      layoutFiles = await Promise.all(
        req.files.layoutFiles.map(async (file) => {
          const s3Key = await uploadToS3(file);
          return {
            filename: file.originalname,
            key: s3Key,
          };
        }),
      );
    }

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

    // ===== Sync to DynamoDB =====
    try {
      const dynamoItem = mapAssignmentToDynamo(assignment);

      await dynamo.send(
        new PutCommand({
          TableName: process.env.DYNAMO_TABLE,
          Item: dynamoItem,
        }),
      );

      console.log("DynamoDB Sync Success:", assignment._id.toString());
    } catch (err) {
      // Mongo already saved → do not fail API
      console.error("DynamoDB Sync Failed:", err.message);
    }

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

const { getSignedFileUrl } = require("../utils/s3Upload");

exports.getAssignmentFile = async (req, res) => {
  try {
    const { assignmentId, fileIndex } = req.params;

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    const file = assignment.uploadedFiles[fileIndex];

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const signedUrl = await getSignedFileUrl(file.key);

    res.json({ url: signedUrl });
  } catch (err) {
    console.error("Signed URL Error:", err);
    res.status(500).json({ message: "Failed to generate file access" });
  }
};
