const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const User = require("../user/user.model");
const Assignment = require("../orders/order.model");
const sendEmail = require("../../shared/utils/sendEmail");

exports.register = async (req, res) => {
  console.log("REGISTER CONTROLLER HIT");
  console.log("BODY:", req.body);
  try {
    const { fullName, email, password, confirmPassword, mobileNumber } = req.body;

    if (!fullName || !email || !password || !confirmPassword || !mobileNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      password: hashedPassword,
      mobileNumber,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        message: "If this email exists, OTP has been sent",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = otp;
    user.resetOtpExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Password Reset OTP",
      html: `
        <h3>Password Reset OTP</h3>
        <p>Your OTP is:</p>
        <h2>${otp}</h2>
        <p>This OTP will expire in 10 minutes.</p>
      `,
    });

    res.status(200).json({
      message: "OTP sent to your email",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resetPasswordOtp = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const user = await User.findOne({
      email,
      resetOtp: otp,
      resetOtpExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("fullName email mobileNumber role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        id: user._id,
        name: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const assignments = await Assignment.find({
      $or: [
        { "customer.registeredUser": req.user.id },
        { "customer.email": user.email },
      ],
    }).sort({ createdAt: -1 }).lean();

    const stats = {
      totalOrders: assignments.length,
      inProgress: assignments.filter((assignment) => ["accepted", "in_progress", "printing", "dispatched"].includes(assignment.status)).length,
      delivered: assignments.filter((assignment) => assignment.status === "delivered").length,
      pending: assignments.filter((assignment) => assignment.status === "requested").length,
    };

    const monthlyMap = new Map();
    assignments.forEach((assignment) => {
      const date = new Date(assignment.createdAt);
      const label = date.toLocaleDateString("en-US", { month: "short" });
      monthlyMap.set(label, (monthlyMap.get(label) || 0) + 1);
    });

    const serviceMap = assignments.reduce((acc, assignment) => {
      let key = "Assignment Support";
      if (assignment.assignmentType === "from_scratch") key = "Typing / Writing";
      if (assignment.assignmentType === "student_upload") key = "Printing";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const recentOrders = assignments.slice(0, 5).map((assignment) => ({
      id: assignment.orderNumber || assignment._id.toString(),
      service:
        assignment.assignmentType === "from_scratch"
          ? "Typing / Writing"
          : "Printing",
      status: assignment.status,
      date: new Date(assignment.createdAt).toISOString().slice(0, 10),
    }));

    res.json({
      stats,
      monthlyOrders: Array.from(monthlyMap.entries()).map(([month, orders]) => ({ month, orders })),
      serviceBreakdown: Object.entries(serviceMap).map(([name, value]) => ({ name, value })),
      statusBreakdown: [
        { name: "Delivered", value: stats.delivered },
        { name: "In Progress", value: stats.inProgress },
        { name: "Pending", value: stats.pending },
      ].filter((entry) => entry.value > 0),
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
