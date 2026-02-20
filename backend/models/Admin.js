const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    // 🔐 AUTH
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

    // 👤 BASIC DETAILS
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true },

    // 🏪 SHOP INFO
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

    // 📍 LOCATION
    location: {
      area: String,
      city: String,
      state: String,
      pincode: String,
      address: String,
      landmark: String,

      coordinates: {
        lat: Number,
        lng: Number,
      },
    },

    // SYSTEM
    role: {
      type: String,
      default: "admin",
    },

    isProfileComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);