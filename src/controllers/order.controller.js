const asyncHandler = require("../middleware/asyncHandler.middleware");

const orderService = require("../services/order.service");

const sendResponse = require("../utils/sendResponse");

const placeOrder = asyncHandler(async (req, res) => {
  const order = await orderService.placeOrderService(req.user._id);

  return sendResponse(res, 201, "Order placed successfully", order);
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getMyOrdersService(req.user._id);

  return sendResponse(res, 200, "Orders fetched successfully", orders);
});

const cancelOrder = asyncHandler(async (req, res) => {
  const order = await orderService.cancelOrderService(
    req.user._id,
    req.params.id,
  );

  return sendResponse(res, 200, "Order cancelled successfully", order);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await orderService.updateOrderStatusService(
    req.params.id,
    req.body.status,
  );
 
  return sendResponse(res, 200, "Order status updated successfully", order);
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getAllOrdersService();

  return sendResponse(res, 200, "Orders fetched successfully", orders);
});

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  cancelOrder,
  updateOrderStatus,
};
