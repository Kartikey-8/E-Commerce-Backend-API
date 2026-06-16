const { Product } = require("../models/product.model");

const ApiError = require("../utils/ApiError");

const createProductService = async (data, userId) => {
  const product = await Product.create({
    ...data,
    createdBy: userId,
  });

  return product;
};
 
const getAllProductsService = async (query) => {
  const page = Number(query.page) || 1;

  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  const filter = {};

  if (query.category) {
    filter.category = query.category;
  }

  if (query.search) {
    filter.title = {
      $regex: query.search,
      $options: "i",
    };
  }

  const products = await Product.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return products;
};

const getSingleProductService = async (productId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

const updateProductService = async (productId, data) => {
  const product = await Product.findByIdAndUpdate(productId, data, {
    new: true,
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

const deleteProductService = async (productId) => {
  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

module.exports = {
  createProductService,
  getAllProductsService,
  getSingleProductService,
  updateProductService,
  deleteProductService,
};
 