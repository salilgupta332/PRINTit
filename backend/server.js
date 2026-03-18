const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

// Load env variables
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Create HTTP server
const server = http.createServer(app);

// Init Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Store io globally (so routes can use it)
app.set("io", io);

// Socket connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ---------------- MIDDLEWARE ----------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------- ROUTES ----------------

// Assignment Routes
app.use("/api/assignments", require("./routes/assignmentRoutes"));
app.use("/api/assignments", require("./routes/getMyAssignments"));

// Auth Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/auth", require("./routes/loginRoutes"));

// Admin Routes
app.use("/api/admin", require("./routes/adminRoutes/adminDashboardRoutes"));
app.use("/api/admin", require("./routes/adminRoutes/adminProtectedRoutes"));
app.use("/api/admin", require("./routes/adminRoutes/adminAuthRoutes"));
app.use("/api/admin", require("./routes/adminRoutes/adminSignup"));
app.use("/api/admin", require("./routes/adminRoutes/adminAssignments"));

// User Routes
app.use("/api/user", require("./routes/userRoutes/panRoutes"));
app.use("/api/user", require("./routes/userRoutes/aadhaarRoutes"));

// Location Routes
app.use("/api/location", require("./routes/locationRoutes"));

// Static Uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Protected Test Route
const authMiddleware = require("./middlewares/adminAuthMiddleware");

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

// Root Route
app.get("/", (req, res) => {
  res.send("PRINTit Backend Running 🚀");
});

// ---------------- SERVER START ----------------
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});