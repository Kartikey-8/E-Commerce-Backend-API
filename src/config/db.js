const mongoose = require("mongoose");

const logger = require("../utils/logger");

const env = require("./env");

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URL);

    logger.info("Database connected successfully");
  } catch (error) {
    logger.error(`Database connection failed: ${error.message}`);

    process.exit(1);
  }
};

module.exports = connectDB;
