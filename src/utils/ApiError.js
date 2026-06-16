class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    isOperational = true,
  ) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
