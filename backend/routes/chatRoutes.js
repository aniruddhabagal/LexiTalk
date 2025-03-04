// routes/chatRoutes.js
const express = require("express");
const chatController = require("../controllers/chatController");
const router = express.Router();

router.post("/message", chatController.sendMessage);
router.post("/audio", chatController.generateAudio);
router.get("/history/:userId", chatController.getConversationHistory);
router.delete("/history/:userId", chatController.clearConversation);

module.exports = router;
