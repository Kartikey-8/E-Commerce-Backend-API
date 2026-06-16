const express = require("express");

const {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} = require("../controllers/auth.controller");

const validationMiddleware = require("../middleware/validation.middleware");

const {
  registerValidation,
  loginValidation,
} = require("../validations/auth.validation");

const router = express.Router();

router.post(
  "/register",
  validationMiddleware(registerValidation),
  registerUser,
);

router.post("/login", validationMiddleware(loginValidation), loginUser);

router.post("/logout", logoutUser);

router.post("/refresh-token", refreshAccessToken);

module.exports = router;
