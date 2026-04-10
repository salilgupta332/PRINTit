const mongoose = require("mongoose");
const Assignment = require("../../models/Assignment");

const PRICE_PER_PAGE = 2;

const getAssignmentFilter = (adminId) => {
  const adminObjectId = new mongoose.Types.ObjectId(adminId);

  return {
    $or: [
      { broadcastTo: { $in: [adminObjectId] } },
      { assignedTo: adminObjectId },
    ],
  };
};

const toServiceLabel = (assignmentType) => {
  if (assignmentType === "from_scratch") return "Typing / Writing";
  if (assignmentType === "student_upload") return "Printing";
  return "General Service";
};

const toStatusLabel = (status) => {
  if (status === "requested") return "Pending";
  if (status === "accepted") return "Accepted";
  if (status === "printing") return "Printing";
  if (status === "delivered") return "Completed";
  if (status === "dispatched") return "Dispatched";
  if (status === "in_progress") return "In Progress";
  return "Pending";
};

const formatRelativeTime = (date) => {
  const diffMs = Date.now() - new Date(date).getTime();
  const diffMinutes = Math.max(1, Math.floor(diffMs / (1000 * 60)));

  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
};

/**
 * GET /api/admin/dashboard/stats
 */
exports.getDashboardStats = async (req, res) => {
  try {
    const filter = getAssignmentFilter(req.adminId);
    const assignments = await Assignment.find(filter).sort({ createdAt: -1 }).lean();

    const totalOrders = assignments.length;
    const pendingOrders = assignments.filter(
      (assignment) => assignment.status === "requested",
    ).length;
    const printingOrders = assignments.filter(
      (assignment) => assignment.status === "printing",
    ).length;
    const completedOrders = assignments.filter(
      (assignment) => assignment.status === "delivered",
    ).length;
    const cancelledOrders = 0;

    const totalRevenue = assignments
      .filter((assignment) => assignment.status === "delivered")
      .reduce(
        (sum, assignment) =>
          sum + (assignment.price || (assignment.totalPages || 0) * PRICE_PER_PAGE),
        0,
      );

    const uniqueCustomers = new Set(
      assignments.map(
        (assignment) =>
          assignment.customer?.registeredUser?.toString() ||
          assignment.customer?.email ||
          assignment.customer?.phone ||
          `${assignment.customer?.name || "unknown"}-${assignment._id}`,
      ),
    );

    const weeklyRevenueMap = new Map();
    const today = new Date();

    for (let offset = 6; offset >= 0; offset -= 1) {
      const day = new Date(today);
      day.setHours(0, 0, 0, 0);
      day.setDate(day.getDate() - offset);

      const key = day.toISOString().slice(0, 10);
      const label = day.toLocaleDateString("en-US", { weekday: "short" });

      weeklyRevenueMap.set(key, {
        day: label,
        revenue: 0,
      });
    }

    assignments.forEach((assignment) => {
      const createdAt = new Date(assignment.createdAt);
      createdAt.setHours(0, 0, 0, 0);
      const key = createdAt.toISOString().slice(0, 10);

      if (!weeklyRevenueMap.has(key)) return;

      const revenue =
        assignment.price || (assignment.totalPages || 0) * PRICE_PER_PAGE;

      weeklyRevenueMap.get(key).revenue += revenue;
    });

    const serviceCounts = assignments.reduce((acc, assignment) => {
      const label = toServiceLabel(assignment.assignmentType);
      acc[label] = (acc[label] || 0) + 1;
      return acc;
    }, {});

    const ordersByService = Object.entries(serviceCounts)
      .map(([service, orders]) => ({ service, orders }))
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 6);

    const recentOrders = assignments.slice(0, 5).map((assignment) => ({
      id: assignment.orderNumber || assignment._id.toString(),
      customer:
        assignment.customer?.name ||
        assignment.frontPageDetails?.studentName ||
        "Unknown Student",
      service: toServiceLabel(assignment.assignmentType),
      pages: assignment.totalPages || 0,
      amount: `Rs ${assignment.price || (assignment.totalPages || 0) * PRICE_PER_PAGE}`,
      status: toStatusLabel(assignment.status),
      time: formatRelativeTime(assignment.createdAt),
    }));

    res.json({
      stats: {
        totalOrders,
        totalRevenue,
        pendingOrders,
        printingOrders,
        completedOrders,
        cancelledOrders,
        totalCustomers: uniqueCustomers.size,
      },
      revenueData: Array.from(weeklyRevenueMap.values()),
      ordersByService,
      recentOrders,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
