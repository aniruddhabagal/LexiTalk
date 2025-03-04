// routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/", userController.createUser);
router.get("/:userId", userController.getUser);
router.put("/:userId", userController.updateUser);
router.get("/:userId/preferences", userController.getUserPreferences);
router.put("/:userId/preferences", userController.updateUserPreferences);

module.exports = router;
