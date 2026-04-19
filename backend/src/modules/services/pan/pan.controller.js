const PANOrder = require("./pan.model");
const Admin = require("../../admin/admin.model");
const { uploadToS3 } = require("../../../shared/utils/s3Upload");

const SHOP_BROADCAST_RADIUS_METERS = 5000;

const getNextPanOrderNumber = async () => {
  const last = await PANOrder.findOne({ orderNumber: { $exists: true, $ne: null } })
    .sort({ createdAt: -1 });

  let next = 1;
  if (last?.orderNumber) {
    const num = parseInt(last.orderNumber.split("-")[1], 10);
    if (!Number.isNaN(num)) next = num + 1;
  }

  return `PAN-${String(next).padStart(4, "0")}`;
};

const mapPanOrderToSocketPayload = (order) => ({
  _id: order._id,
  orderNumber: order.orderNumber,
  customer: {
    name: order.fullName,
    phone: order.mobile,
    email: order.email,
  },
  assignmentType: "student_upload",
  totalPages: order.copies || 1,
  status: order.status,
  deadline: order.createdAt,
  printPreferences: {
    printType: order.printType === "pvc" ? "color" : order.printType || "color",
  },
  assignedTo: order.assignedTo,
});

exports.createPanOrder = async (req, res) => {
  try {
    const data = req.body;
    const lat = Number(data.lat);
    const lng = Number(data.lng);

    if (!req.file) {
      return res.status(400).json({
        message: "PAN file is required",
      });
    }

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return res.status(400).json({
        message: "Customer location is required",
      });
    }

    const fileKey = await uploadToS3(req.file, "documents/pan");
    const admins = await Admin.find({
      "location.geo": {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          $maxDistance: SHOP_BROADCAST_RADIUS_METERS,
        },
      },
    }, "_id");

    const order = new PANOrder({
      orderNumber: await getNextPanOrderNumber(),
      fullName: data.fullName,
      mobile: data.mobile,
      email: data.email,
      panNumber: data.panNumber,
      fileKey,
      printType: data.printType,
      lamination: data.lamination,
      copies: data.copies,
      deliveryType: data.deliveryType,
      address: {
        recipientName: data.recipientName,
        phone: data.phone,
        houseNo: data.houseNo,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        landmark: data.landmark,
      },
      paymentMethod: data.paymentMethod,
      status: "requested",
      broadcastTo: admins.map((admin) => admin._id),
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
      activityLog: [
        {
          action: "Order created",
          by: "Customer",
          icon: "create",
        },
      ],
    });

    await order.save();

    const io = req.app.get("io");
    if (io) {
      const payload = mapPanOrderToSocketPayload(order);
      admins.forEach((admin) => {
        io.to(admin._id.toString()).emit("new-order", payload);
      });
    }

    res.status(201).json({
      success: true,
      message: "PAN card order created",
      order,
    });
  } catch (error) {
    console.error("PAN ORDER ERROR:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
