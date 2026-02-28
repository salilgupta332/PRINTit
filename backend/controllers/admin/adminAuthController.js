const bcrypt = require("bcryptjs");
const Admin = require("../../models/Admin");
const jwt = require("jsonwebtoken");

/**
 * OLD SIMPLE SIGNUP (temporary fallback)
 */
exports.signupAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(409).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: { id: admin._id, email: admin.email },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * NEW MULTI STEP SHOP REGISTRATION
 */
exports.registerAdmin = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobileNumber,
      password,
      shop,
      location,
      deliveryRadius,
    } = req.body;

    // 🔹 Basic validation
    if (!fullName || !email || !mobileNumber || !password)
      return res.status(400).json({ message: "Basic details missing" });

    if (!shop?.name)
      return res.status(400).json({ message: "Shop name is required" });

    if (!location?.city || !location?.pincode)
      return res.status(400).json({ message: "Location details incomplete" });

    if (!location?.lat || !location?.lng)
      return res.status(400).json({ message: "Shop geo location is required" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res
        .status(409)
        .json({ message: "Shop already registered with this email" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 Convert to GeoJSON format
    const geoLocation = {
      area: location.area,
      city: location.city,
      state: location.state,
      pincode: location.pincode,
      address: location.address,
      landmark: location.landmark,
      geo: {
        type: "Point",
        coordinates: [location.lng, location.lat], // ⚠ [lng, lat]
      },
    };

    const admin = await Admin.create({
      email,
      password: hashedPassword,
      fullName,
      mobileNumber,
      shop,
      location: geoLocation,
      deliveryRadius: deliveryRadius || 5,
      isProfileComplete: true,
    });

    res.status(201).json({
      success: true,
      message: "Shop registered successfully",
      adminId: admin._id,
    });
  } catch (error) {
    console.error("Register admin error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * LOGIN (unchanged)
 */
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { adminId: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: "admin",
        isProfileComplete: admin.isProfileComplete,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
