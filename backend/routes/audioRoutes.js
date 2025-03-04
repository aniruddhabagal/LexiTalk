// routes/audioRoutes.js
const express = require("express");
const audioController = require("../controllers/audioController");
const router = express.Router();

router.post("/text-to-speech", audioController.textToSpeech);
router.get("/voices", audioController.getAvailableVoices);
router.post("/stream", audioController.streamAudio);
router.post("/session", audioController.createStreamingSession);
router.delete("/session/:roomName", audioController.endStreamingSession);

module.exports = router;
