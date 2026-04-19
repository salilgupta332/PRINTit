const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./modules/auth/auth.routes");
const adminRoutes = require("./modules/admin/admin.routes");
const orderRoutes = require("./modules/orders/order.routes");
const serviceRoutes = require("./modules/services");
const authMiddleware = require("./shared/middlewares/adminAuthMiddleware");
const locationRoutes = require("./shared/utils/locationRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/assignments", orderRoutes);
app.use("/api/user", serviceRoutes);
app.use("/api/location", locationRoutes);

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

app.get("/", (req, res) => {
  res.send("PRINTit Backend Running");
});

module.exports = app;
