// middleware/auth.js
const { error } = require("../utils/responseFormatter");

// This is a simple authentication middleware
// In production, you should use proper authentication (JWT, OAuth, etc.)
function authenticate(req, res, next) {
  const apiKey = req.headers["x-api-key"];

  // Check if API key is provided
  if (!apiKey) {
    return res.status(401).json(error("API key is required", 401));
  }

  // In a real app, you would validate the API key against a database
  // For now, we'll use a simple check
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json(error("Invalid API key", 403));
  }

  next();
}

module.exports = authenticate;
