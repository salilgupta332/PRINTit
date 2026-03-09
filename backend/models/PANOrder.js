const mongoose = require("mongoose");

const panOrderSchema = new mongoose.Schema(
{
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

  status: {
    type: String,
    enum: ["pending","processing","ready","completed"],
    default: "pending"
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("PANOrder", panOrderSchema);