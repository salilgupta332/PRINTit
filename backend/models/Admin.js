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
    // 📍 LOCATION
    location: {
      area: String,
      city: String,
      state: String,
      pincode: String,
      address: String,
      landmark: String,

      // 🔥 GeoJSON format for MongoDB
      geo: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number], // [longitude, latitude]
          required: true,
        },
      },
    },

    // 🚚 Delivery Radius (in KM)
    deliveryRadius: {
      type: Number,
      default: 5,
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
  { timestamps: true },
);
adminSchema.index({ "location.geo": "2dsphere" });
module.exports = mongoose.model("Admin", adminSchema);
