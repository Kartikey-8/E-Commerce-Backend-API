const { Cart } = require("../models/cart.model");
const { Order } = require("../models/order.model");
const ApiError = require("../utils/ApiError");

const placeOrderService = async (userId) => {
  const cart = await Cart.findOne({
    user: userId,
  }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  const items = cart.items.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.product.price,
  }));

  const totalAmount = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const order = await Order.create({
    user: userId,
    items,
    totalAmount,
  });

  cart.items = [];

  await cart.save();

  return order;
};
 
const cancelOrderService = async (userId, orderId) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (order.user.toString() !== userId.toString()) {
    throw new ApiError(403, "Not authorized to cancel this order");
  }

  if (order.status === "delivered") {
    throw new ApiError(400, "Delivered orders cannot be cancelled");
  }

  order.status = "cancelled";

  await order.save();

  return order;
};

const updateOrderStatusService = async (orderId, status) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  order.status = status;

  await order.save();

  return order;
};

const getMyOrdersService = async (userId) => {
  const orders = await Order.find({
    user: userId,
  }).populate("items.product");

  return orders;
};

const getAllOrdersService = async () => {
  const orders = await Order.find().populate("user").populate("items.product");

  return orders;
};

module.exports = {
  placeOrderService,
  getMyOrdersService,
  getAllOrdersService,
  cancelOrderService,
  updateOrderStatusService,
};
 