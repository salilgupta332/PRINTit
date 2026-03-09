const AadhaarOrder = require("../../models/AadhaarOrder");
const { uploadToS3 } = require("../../utils/s3Upload");

exports.createAadhaarOrder = async (req, res) => {
  try {

  

    const data = req.body;

    let fileKey = null;

    if (!req.file) {
      return res.status(400).json({
        message: "File is required"
      });
    }

    fileKey = await uploadToS3(req.file, "documents/aadhaar");

    const order = new AadhaarOrder({
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
    });

    await order.save();

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