// middleware/errorHandler.js
const logger = require("../utils/logger");
const { error } = require("../utils/responseFormatter");

function errorHandler(err, req, res, next) {
  logger.error(`${err.name}: ${err.message}`, { stack: err.stack });

  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";

  res.status(statusCode).json(error(errorMessage, statusCode));
}

module.exports = errorHandler;
