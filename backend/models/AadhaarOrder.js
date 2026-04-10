const mongoose = require("mongoose");

const aadhaarOrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    fullName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: String,
    aadhaarNumber: String,

    fileKey: {
      type: String,
      required: true,
    },

    printType: {
      type: String,
      enum: ["normal", "pvc"],
      default: "normal",
    },

    pvcCardType: {
      type: String,
      enum: ["smart", "premium"],
      default: "smart",
    },

    cardSide: {
      type: String,
      enum: ["front", "both"],
      default: "both",
    },

    lamination: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },

    qrVerification: Boolean,
    copies: Number,

    deliveryType: {
      type: String,
      enum: ["pickup", "delivery"],
    },

    address: {
      recipientName: String,
      phone: String,
      houseNo: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      pincode: String,
      landmark: String,
    },

    paymentMethod: String,

    status: {
      type: String,
      default: "requested",
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
  },
  { timestamps: true },
);

aadhaarOrderSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("AadhaarOrder", aadhaarOrderSchema);
