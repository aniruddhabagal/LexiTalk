// config/default.js
require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  environment: process.env.NODE_ENV || "development",
  llmApiKey: process.env.LLM_API_KEY,
  elevenLabsApiKey: process.env.ELEVENLABS_API_KEY,
  livekitApiKey: process.env.LIVEKIT_API_KEY,
  livekitApiSecret: process.env.LIVEKIT_API_SECRET,
  livekitUrl: process.env.LIVEKIT_URL,
};
