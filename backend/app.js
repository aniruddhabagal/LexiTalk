const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler");
const chatRoutes = require("./routes/chatRoutes");
const audioRoutes = require("./routes/audioRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/audio", audioRoutes);
app.use("/api/users", userRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
