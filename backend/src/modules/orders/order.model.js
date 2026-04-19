const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
    },
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
    uploadedFiles: [
      {
        filename: String,
        key: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    layoutProvided: {
      type: Boolean,
      default: false,
    },
    layoutFiles: [
      {
        filename: String,
        key: String,
      },
    ],
    layoutPreference: {
      type: String,
      enum: ["simple", "formal", "creative"],
    },
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
    assignmentDescription: {
      type: String,
    },
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
    deliveryType: {
      type: String,
      enum: ["home_delivery", "pickup"],
      default: "home_delivery",
    },
    address: {
      recipientName: String,
      phoneNumber: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      pincode: String,
      landmark: String,
    },
    status: {
      type: String,
      enum: ["requested", "accepted", "rejected", "in_progress", "printing", "dispatched", "delivered"],
      default: "requested",
    },
    price: {
      type: Number,
      default: 0,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
    broadcastTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
      },
    ],
    rejectedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
      },
    ],
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
      },
    },
    activityLog: [
      {
        action: String,
        by: {
          type: String,
          default: "system",
        },
        icon: {
          type: String,
          default: "create",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.models.Assignment || mongoose.model("Assignment", assignmentSchema);
