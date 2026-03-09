const express = require("express");
const router = express.Router();

const { createAadhaarOrder } = require("../../controllers/user/aadhaarController");
const upload = require("../../middlewares/uploadMiddleware");

router.post("/aadhaar-print", upload.single("file"), createAadhaarOrder);

module.exports = router;