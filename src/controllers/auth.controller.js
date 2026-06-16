const asyncHandler = require("../middleware/asyncHandler.middleware");

const authService = require("../services/auth.service");

const sendResponse = require("../utils/sendResponse");

const env = require("../config/env");

const registerUser = asyncHandler(async (req, res) => {
  const result = await authService.registerService(req.body);

  return sendResponse(res, 201, "User registered successfully", result);
});

const loginUser = asyncHandler(async (req, res) => {
  const result = await authService.loginService(req.body);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,

    secure: false,

    sameSite: "strict",

    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return sendResponse(res, 200, "User logged in successfully", {
    user: result.user,
    accessToken: result.accessToken,
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  const accessToken = await authService.refreshTokenService(refreshToken);

  return sendResponse(res, 200, "Access token refreshed successfully", {
    accessToken,
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  await authService.logoutService(refreshToken);

  res.clearCookie("refreshToken");

  return sendResponse(res, 200, "User logged out successfully");
});

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
};
