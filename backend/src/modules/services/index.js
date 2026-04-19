const express = require("express");

const aadhaarRoutes = require("./aadhaar/aadhaar.routes");
const panRoutes = require("./pan/pan.routes");

const router = express.Router();

router.use(aadhaarRoutes);
router.use(panRoutes);

module.exports = router;
