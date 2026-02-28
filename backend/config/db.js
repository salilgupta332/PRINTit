// Database configuration file

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      family: 4, // Force IPv4
          
      directConnection: false,
      serverSelectionTimeoutMS: 30000,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed", error.message);
     console.error('Full error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
