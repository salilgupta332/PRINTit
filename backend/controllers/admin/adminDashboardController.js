const Assignment = require("../../models/Assignment");

/**
 * GET /api/admin/dashboard/stats
 */
exports.getDashboardStats = async (req, res) => {
  try {
    const total = await Assignment.countDocuments();

    const pending = await Assignment.countDocuments({
      status: "requested",
    });

    const completed = await Assignment.countDocuments({
      status: "completed",
    });

    res.json({
      total,
      pending,
      completed,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
