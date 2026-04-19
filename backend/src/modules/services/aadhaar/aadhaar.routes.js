const express = require("express");

const { createAadhaarOrder } = require("./aadhaar.controller");
const upload = require("../../../shared/middlewares/uploadMiddleware");

const router = express.Router();

router.post("/aadhaar-print", upload.single("file"), createAadhaarOrder);

module.exports = router;
