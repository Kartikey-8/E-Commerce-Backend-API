const express = require("express");

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const authMiddleware = require("../middleware/auth.middleware");

const roleMiddleware = require("../middleware/role.middleware");

const validationMiddleware = require("../middleware/validation.middleware");
 
const { createProductValidation } = require("../validations/product.validation");

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getSingleProduct);

router.post("/", authMiddleware, roleMiddleware("admin"), validationMiddleware(createProductValidation), createProduct);

router.put("/:id", authMiddleware, roleMiddleware("admin"), validationMiddleware(createProductValidation), updateProduct);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteProduct);

module.exports = router;
