const express = require("express");

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  cancelOrder,
  updateOrderStatus,
} = require("../controllers/order.controller");

const {
  updateOrderStatusValidation,
} = require("../validations/order.validation");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const validationMiddleware = require("../middleware/validation.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", placeOrder);

router.get("/my-orders", getMyOrders);

router.patch("/:id/cancel", cancelOrder);

router.get("/all", roleMiddleware("admin"), getAllOrders);

router.patch("/:id/status", roleMiddleware("admin"), validationMiddleware(updateOrderStatusValidation), updateOrderStatus);

module.exports = router;
 