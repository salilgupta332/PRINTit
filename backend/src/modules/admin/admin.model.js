const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    shop: {
      name: { type: String, required: true },
      description: String,
      gstin: String,
      workingHours: {
        open: String,
        close: String,
        workingDays: [String],
      },
    },
    location: {
      area: String,
      city: String,
      state: String,
      pincode: String,
      address: String,
      landmark: String,
      geo: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },
    },
    deliveryRadius: {
      type: Number,
      default: 5,
    },
    role: {
      type: String,
      default: "admin",
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

adminSchema.index({ "location.geo": "2dsphere" });
module.exports = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
