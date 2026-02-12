const multer = require("multer");

// store file in RAM instead of disk
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB limit (adjust later if needed)
  },
});

module.exports = upload;
