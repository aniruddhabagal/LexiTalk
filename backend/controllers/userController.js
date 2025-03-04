// controllers/userController.js
const { success, error } = require("../utils/responseFormatter");
const logger = require("../utils/logger");
const { v4: uuidv4 } = require("uuid");

// Simple in-memory user storage
// In production, this should be replaced with a database
const users = {};

exports.createUser = async (req, res, next) => {
  try {
    const { name, preferredLanguage, proficiencyLevel } = req.body;

    if (!name) {
      return res.status(400).json(error("Name is required", 400));
    }

    const userId = uuidv4();
    const user = {
      id: userId,
      name,
      preferredLanguage: preferredLanguage || "English",
      proficiencyLevel: proficiencyLevel || "intermediate",
      createdAt: new Date(),
    };

    users[userId] = user;

    res.status(201).json(success({ user }));
  } catch (err) {
    logger.error("Error in createUser:", err);
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json(error("User ID is required", 400));
    }

    const user = users[userId];

    if (!user) {
      return res.status(404).json(error("User not found", 404));
    }

    res.status(200).json(success({ user }));
  } catch (err) {
    logger.error("Error in getUser:", err);
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, preferredLanguage, proficiencyLevel } = req.body;

    if (!userId) {
      return res.status(400).json(error("User ID is required", 400));
    }

    const user = users[userId];

    if (!user) {
      return res.status(404).json(error("User not found", 404));
    }

    // Update user properties
    if (name) user.name = name;
    if (preferredLanguage) user.preferredLanguage = preferredLanguage;
    if (proficiencyLevel) user.proficiencyLevel = proficiencyLevel;

    res.status(200).json(success({ user }));
  } catch (err) {
    logger.error("Error in updateUser:", err);
    next(err);
  }
};

exports.getUserPreferences = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json(error("User ID is required", 400));
    }

    const user = users[userId];

    if (!user) {
      return res.status(404).json(error("User not found", 404));
    }

    const preferences = {
      preferredLanguage: user.preferredLanguage,
      proficiencyLevel: user.proficiencyLevel,
    };

    res.status(200).json(success({ preferences }));
  } catch (err) {
    logger.error("Error in getUserPreferences:", err);
    next(err);
  }
};

exports.updateUserPreferences = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { preferredLanguage, proficiencyLevel } = req.body;

    if (!userId) {
      return res.status(400).json(error("User ID is required", 400));
    }

    const user = users[userId];

    if (!user) {
      return res.status(404).json(error("User not found", 404));
    }

    // Update user preferences
    if (preferredLanguage) user.preferredLanguage = preferredLanguage;
    if (proficiencyLevel) user.proficiencyLevel = proficiencyLevel;

    const preferences = {
      preferredLanguage: user.preferredLanguage,
      proficiencyLevel: user.proficiencyLevel,
    };

    res.status(200).json(success({ preferences }));
  } catch (err) {
    logger.error("Error in updateUserPreferences:", err);
    next(err);
  }
};
