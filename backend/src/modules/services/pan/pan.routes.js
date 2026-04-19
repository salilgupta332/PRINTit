const express = require("express");

const upload = require("../../../shared/middlewares/uploadMiddleware");
const { createPanOrder } = require("./pan.controller");

const router = express.Router();

router.post("/pan-print", upload.single("file"), createPanOrder);

module.exports = router;
