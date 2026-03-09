const express = require("express");
const router = express.Router();

const upload = require("../../middlewares/uploadMiddleware");
const { createPanOrder } = require("../../controllers/user/panController");

router.post(
  "/pan-print",
  upload.single("file"),
  createPanOrder
);

module.exports = router;