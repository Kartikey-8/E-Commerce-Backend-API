const logger = require("../utils/logger");

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (err.isOperational) {
    logger.error(err.message);

    return res.status(statusCode).json({
      success: false,
      message: err.message,
    });
  }
  logger.error(err.stack);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

module.exports = errorMiddleware;
       