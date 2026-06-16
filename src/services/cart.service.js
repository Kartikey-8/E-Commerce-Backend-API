const { Cart } = require("../models/cart.model");
const { Product } = require("../models/product.model");
const ApiError = require("../utils/ApiError");

const addToCartService = async (userId, productId, quantity) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
    });
  }

  await cart.save();

  return cart;
};

const updateCartQuantityService = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({
    user: userId,
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find((item) => item.product.toString() === productId);

  if (!item) {
    throw new ApiError(404, "Item not found in cart");
  }

  item.quantity = quantity;

  await cart.save();

  return cart;
};
    
const getCartService = async (userId) => {
  const cart = await Cart.findOne({
    user: userId,
  }).populate("items.product");

  return cart;
};
 
const removeCartItemService = async (userId, productId) => {
  const cart = await Cart.findOne({
    user: userId,
  });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId,
  );

  await cart.save();

  return cart;
};

module.exports = {
  addToCartService,
  getCartService,
  removeCartItemService,
  updateCartQuantityService,
};
