const PANOrder = require("../../models/PANOrder");
const { uploadToS3 } = require("../../utils/s3Upload");

exports.createPanOrder = async (req, res) => {

  try {

    const data = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "PAN file is required"
      });
    }

    // upload to S3
    const fileKey = await uploadToS3(req.file, "documents/pan");

    const order = new PANOrder({

      fullName: data.fullName,
      mobile: data.mobile,
      email: data.email,

      panNumber: data.panNumber,

      fileKey: fileKey,

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
        landmark: data.landmark
      },

      paymentMethod: data.paymentMethod

    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "PAN card order created",
      order
    });

  } catch (error) {

    console.error("PAN ORDER ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};