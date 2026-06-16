const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const env = require("../config/env");

const { User } = require("../models/user.model");
const { Token } = require("../models/token.model");

const registerService = async (data) => {
  const { name, email, password } = data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

const loginService = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_EXPIRY,
    },
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: env.REFRESH_TOKEN_EXPIRY,
    },
  );

  await Token.create({
    user: user._id,
    refreshToken,
  });

  return {
    user,
    accessToken,
    refreshToken,
  };
};

const logoutService = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(401, "Refresh token missing");
  }

  jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);

  const existingToken = await Token.findOne({
    refreshToken,
  });

  if (!existingToken) {
    throw new ApiError(401, "Invalid refresh token");
  }

  await Token.findOneAndDelete({
    refreshToken,
  });
};

const refreshTokenService = async (token) => {
  if (!token) {
    throw new ApiError(401, "Refresh token missing");
  }

  const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET);

  const existingToken = await Token.findOne({
    refreshToken: token,
  });

  if (!existingToken) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const accessToken = jwt.sign(
    {
      userId: decoded.userId,
      role: decoded.role,
    },
    env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_EXPIRY,
    },
  );

  return accessToken;
};

module.exports = {
  registerService,
  loginService,
  refreshTokenService,
  logoutService,
};
