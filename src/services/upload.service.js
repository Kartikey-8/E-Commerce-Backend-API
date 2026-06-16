const uploadImagesService = async (files) => {
  const imagePaths = files.map((file) => file.path);

  return imagePaths;
};

module.exports = {
  uploadImagesService,
};
