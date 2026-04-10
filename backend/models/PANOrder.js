const mongoose = require("mongoose");

const panOrderSchema = new mongoose.Schema(
{
  orderNumber: {
    type: String,
    unique: true,
    sparse: true,
  },

  fullName: {
    type: String,
    required: true,
  },

  mobile: {
    type: String,
    required: true,
  },

  email: String,

  panNumber: {
    type: String,
    required: true,
    uppercase: true
  },

  fileKey: {
    type: String,
    required: true
  },

  printType: {
    type: String,
    enum: ["color", "pvc"],
    default: "color"
  },

  lamination: {
    type: String,
    enum: ["yes", "no"],
    default: "no"
  },

  copies: {
    type: Number,
    default: 1
  },

  deliveryType: {
    type: String,
    enum: ["pickup", "delivery"],
    default: "pickup"
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

  assignmentDescription: {
    type: String,
    default: "",
  },

  status: {
    type: String,
    enum: [
      "pending",
      "requested",
      "accepted",
      "in_progress",
      "printing",
      "dispatched",
      "ready",
      "completed",
      "delivered",
    ],
    default: "requested"
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
{ timestamps: true }
);

panOrderSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("PANOrder", panOrderSchema);
