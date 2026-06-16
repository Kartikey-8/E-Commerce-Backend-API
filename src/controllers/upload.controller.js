const asyncHandler = require("../middleware/asyncHandler.middleware");

const sendResponse = require("../utils/sendResponse");

const { uploadImagesService } = require("../services/upload.service");

const uploadImages = asyncHandler(async (req, res) => {
  const imagePaths = await uploadImagesService(req.files);

  return sendResponse(res, 200, "Images uploaded successfully", imagePaths);
});

module.exports = {
  uploadImages,
};
