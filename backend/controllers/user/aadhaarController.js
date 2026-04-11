const AadhaarOrder = require("../../models/AadhaarOrder");
const Admin = require("../../models/Admin");
const { uploadToS3 } = require("../../utils/s3Upload");
const SHOP_BROADCAST_RADIUS_METERS = 5000;

const getNextAadhaarOrderNumber = async () => {
  const last = await AadhaarOrder.findOne({ orderNumber: { $exists: true, $ne: null } })
    .sort({ createdAt: -1 });

  let next = 1;
  if (last?.orderNumber) {
    const num = parseInt(last.orderNumber.split("-")[1], 10);
    if (!Number.isNaN(num)) next = num + 1;
  }

  return `AAD-${String(next).padStart(4, "0")}`;
};

const mapAadhaarOrderToSocketPayload = (order) => ({
  _id: order._id,
  orderNumber: order.orderNumber,
  customer: {
    name: order.fullName,
    phone: order.mobile,
    email: order.email,
  },
  assignmentType: "student_upload",
  assignmentTitle: "Aadhaar Card Print",
  totalPages: order.copies || 1,
  status: order.status,
  deadline: order.createdAt,
  printPreferences: {
    printType: order.printType === "pvc" ? "color" : "black_white",
  },
  assignedTo: order.assignedTo,
});

exports.createAadhaarOrder = async (req, res) => {
  try {
    const data = req.body;
    const lat = Number(data.lat);
    const lng = Number(data.lng);

    let fileKey = null;

    if (!req.file) {
      return res.status(400).json({
        message: "File is required"
      });
    }

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return res.status(400).json({
        message: "Customer location is required"
      });
    }

    fileKey = await uploadToS3(req.file, "documents/aadhaar");
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

    const order = new AadhaarOrder({
      orderNumber: await getNextAadhaarOrderNumber(),
      fullName: data.fullName,
      mobile: data.mobile,
      email: data.email,
      aadhaarNumber: data.aadhaarNumber,
      fileKey: fileKey,
      printType: data.printType,
      pvcCardType: data.pvcCardType,
      cardSide: data.cardSide,
      lamination: data.lamination,
      qrVerification: data.qrVerification,
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
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
      broadcastTo: admins.map((admin) => admin._id),
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
      const payload = mapAadhaarOrderToSocketPayload(order);
      admins.forEach((admin) => {
        io.to(admin._id.toString()).emit("new-order", payload);
      });
    }

    res.status(201).json({
      success: true,
      message: "Aadhaar print order created",
      order,
    });
  } catch (error) {
    console.error("AADHAAR ORDER ERROR:", error);
    res.status(500).json({
      message: error.message
    });
  }
};
