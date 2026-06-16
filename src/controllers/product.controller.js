const asyncHandler = require("../middleware/asyncHandler.middleware");

const productService = require("../services/product.service");

const sendResponse = require("../utils/sendResponse");

const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProductService(
    req.body,
    req.user._id,
  );

  return sendResponse(res, 201, "Product created successfully", product);
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAllProductsService(req.query);

  return sendResponse(res, 200, "Products fetched successfully", products);
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await productService.getSingleProductService(req.params.id);

  return sendResponse(res, 200, "Product fetched successfully", product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProductService(
    req.params.id,
    req.body,
  );

  return sendResponse(res, 200, "Product updated successfully", product);
});
  
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await productService.deleteProductService(req.params.id);

  return sendResponse(res, 200, "Product deleted successfully", product);
});
 
module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
  