const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    /* =====================
       BASIC INFO
    ====================== */
    customer: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
      },
      registeredUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
    },

    assignmentType: {
      type: String,
      enum: ["from_scratch", "student_upload"],
      required: true,
    },

    subjectName: {
      type: String,
      required: true,
      trim: true,
    },

    assignmentTitle: {
      type: String,
      trim: true,
    },

    academicLevel: {
      type: String,
      enum: ["school", "college", "university"],
      required: true,
    },

    deadline: {
      type: Date,
      required: true,
    },

    language: {
      type: String,
      enum: ["english", "hindi", "other"],
      default: "english",
    },

    /* =====================
       FILES (Student Upload)
    ====================== */
    uploadedFiles: [
      {
        filename: String,
        key: String, // 🔴 store S3 KEY instead of URL
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    /* =====================
       LAYOUT / DESIGN
    ====================== */
    layoutProvided: {
      type: Boolean,
      default: false,
    },

    layoutFiles: [
      {
        filename: String,
        key: String, // 🔴 store S3 KEY instead of URL
      },
    ],

    layoutPreference: {
      type: String,
      enum: ["simple", "formal", "creative"],
    },

    /* =====================
       FRONT PAGE DETAILS
    ====================== */
    frontPageRequired: {
      type: Boolean,
      default: false,
    },

    frontPageDetails: {
      institute: String,
      institutionName: String,
      studentName: String,
      rollNumber: String,
      course: String,
    },

    /* =====================
       ASSIGNMENT DESCRIPTION
    ====================== */
    assignmentDescription: {
      type: String,
    },

    /* =====================
       PRINT & PAPER PREFERENCES
       (VERY IMPORTANT FOR PRINTit)
    ====================== */
    printPreferences: {
      printType: {
        type: String,
        enum: ["black_white", "color"],
        default: "black_white",
      },
      paperSize: {
        type: String,
        enum: ["A4", "A3"],
        default: "A4",
      },
      paperQuality: {
        type: String,
        enum: ["normal", "thick"],
        default: "normal",
      },
      bindingRequired: {
        type: Boolean,
        default: false,
      },
      bindingType: {
        type: String,
        enum: ["spiral", "staple", "hard"],
      },
      copies: {
        type: Number,
        default: 1,
        min: 1,
      },
    },

    /* =====================
       DELIVERY DETAILS
    ====================== */
    deliveryType: {
      type: String,
      enum: ["home_delivery", "pickup"],
      default: "home_delivery",
    },

    address: {
      recipientName: String,
      phoneNumber: String,
      addressLine1: String, // House / Flat / Block
      addressLine2: String, // Apartment / Road / Area
      city: String,
      state: String,
      pincode: String,
      landmark: String,
    },

    /* =====================
       STATUS & PRICING
    ====================== */
    status: {
      type: String,
      enum: ["requested", "in_progress", "printing", "dispatched", "delivered"],
      default: "requested",
    },

    price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Assignment", assignmentSchema);
