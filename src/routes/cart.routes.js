const express = require("express");

const {
  addToCart,
  getCart,
  removeCartItem,
  updateCartQuantity,
} = require("../controllers/cart.controller");

const authMiddleware = require("../middleware/auth.middleware");

const validationMiddleware = require("../middleware/validation.middleware");

const { addToCartValidation } = require("../validations/cart.validation");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getCart);

router.post("/add", validationMiddleware(addToCartValidation), addToCart);

router.put("/update/:productId", updateCartQuantity);

router.delete("/remove/:productId", removeCartItem);

module.exports = router;
  