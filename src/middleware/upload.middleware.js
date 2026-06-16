const { upload } = require("../config/multer");

const uploadSingleImage = upload.single("image");

const uploadMultipleImages = upload.array("images", 5);

module.exports = {
  uploadSingleImage,
  uploadMultipleImages,
};
 