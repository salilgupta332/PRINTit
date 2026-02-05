const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
// Load environment variables first
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());




// ---------- BODY PARSERS AFTER ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- ROUTES THAT USE MULTER FIRST ----------
app.use("/api/assignments", require("./routes/assignmentRoutes"));
app.use("/api/assignments", require("./routes/getMyAssignments"));



// ---------- AUTH ROUTES ----------
app.use("/api/auth", express.json(), require("./routes/authRoutes"));
app.use("/api/auth", express.json(), require("./routes/loginRoutes"));

const adminAuthRoutes = require("./routes/adminRoutes/adminAuthRoutes");
const adminSignupRoutes = require("./routes/adminRoutes/adminSignup");
const adminAssignmentsRoutes = require("./routes/adminRoutes/adminAssignments");
const adminDashboardRoutes = require("./routes/adminRoutes/adminDashboardRoutes");
app.use("/api/admin", adminDashboardRoutes);
app.use("/api/admin", require("./routes/adminRoutes/adminProtectedRoutes"));
app.use("/api/admin", express.json(), require("./routes/adminRoutes/adminAuthRoutes"));
app.use("/api/admin", express.json(), require("./routes/adminRoutes/adminSignup"));
app.use("/api/admin", express.json(), require("./routes/adminRoutes/adminAssignments"));
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);
const authMiddleware = require("./middlewares/adminAuthMiddleware");

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

// Test Route
app.get("/", (req, res) => {
  res.send("PRINTit Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
