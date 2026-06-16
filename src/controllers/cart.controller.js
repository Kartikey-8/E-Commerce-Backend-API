const asyncHandler = require("../middleware/asyncHandler.middleware");

const cartService = require("../services/cart.service");

const sendResponse = require("../utils/sendResponse");

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await cartService.addToCartService(
    req.user._id,
    productId,
    quantity,
  );

  return sendResponse(res, 200, "Item added to cart successfully", cart);
});

const getCart = asyncHandler(async (req, res) => {
  const cart = await cartService.getCartService(req.user._id);

  return sendResponse(res, 200, "Cart fetched successfully", cart);
});

const updateCartQuantity = asyncHandler(async (req, res) => {
  const { quantity } = req.body;

  const cart = await cartService.updateCartQuantityService(
    req.user._id,
    req.params.productId,
    quantity,
  );
 
  return sendResponse(res, 200, "Cart quantity updated successfully", cart);
});
 
const removeCartItem = asyncHandler(async (req, res) => {
  const cart = await cartService.removeCartItemService(
    req.user._id,
    req.params.productId,
  );

  return sendResponse(res, 200, "Item removed from cart successfully", cart);
});

module.exports = {
  addToCart,
  getCart,
  updateCartQuantity,
  removeCartItem,
};
    