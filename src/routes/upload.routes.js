const express = require("express");

const { uploadImages } = require("../controllers/upload.controller");

const authMiddleware = require("../middleware/auth.middleware");

const { uploadMultipleImages } = require("../middleware/upload.middleware");

const router = express.Router();

router.post("/images", authMiddleware, uploadMultipleImages, uploadImages);

module.exports = router;
  