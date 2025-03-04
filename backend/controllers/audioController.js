// controllers/audioController.js
const elevenlabsService = require("../services/elevenlabsService");
const livekitService = require("../services/livekitService");
const { success, error } = require("../utils/responseFormatter");
const logger = require("../utils/logger");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

exports.textToSpeech = async (req, res, next) => {
  try {
    const { text, voiceId } = req.body;

    if (!text) {
      return res.status(400).json(error("Text is required", 400));
    }

    // Generate audio file from text
    const audioBuffer = await elevenlabsService.textToSpeech(text, voiceId);

    // Create directory for audio files if it doesn't exist
    const audioDir = path.join(__dirname, "../public/audio");
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }

    // Save audio to file
    const fileName = `${uuidv4()}.mp3`;
    const filePath = path.join(audioDir, fileName);
    fs.writeFileSync(filePath, audioBuffer);

    // Return the file URL
    const fileUrl = `/audio/${fileName}`;
    res.status(200).json(success({ audioUrl: fileUrl }));
  } catch (err) {
    logger.error("Error in textToSpeech:", err);
    next(err);
  }
};

exports.getAvailableVoices = async (req, res, next) => {
  try {
    const voices = await elevenlabsService.getVoices();
    res.status(200).json(success({ voices }));
  } catch (err) {
    logger.error("Error in getAvailableVoices:", err);
    next(err);
  }
};

exports.createStreamingSession = async (req, res, next) => {
  try {
    const { userId, sessionName } = req.body;

    if (!userId) {
      return res.status(400).json(error("User ID is required", 400));
    }

    // Create a unique room name if not provided
    const roomName = sessionName || `language-session-${uuidv4()}`;

    // Create a LiveKit room
    await livekitService.createRoom(roomName);

    // Generate token for the user
    const token = livekitService.generateToken(roomName, userId);

    res.status(200).json(
      success({
        roomName,
        token,
        url:
          process.env.LIVEKIT_URL ||
          "wss://your-livekit-instance.livekit.cloud",
      })
    );
  } catch (err) {
    logger.error("Error in createStreamingSession:", err);
    next(err);
  }
};

exports.endStreamingSession = async (req, res, next) => {
  try {
    const { roomName } = req.params;

    if (!roomName) {
      return res.status(400).json(error("Room name is required", 400));
    }

    // End the LiveKit room
    await livekitService.endRoom(roomName);

    res
      .status(200)
      .json(success({ message: "Streaming session ended successfully" }));
  } catch (err) {
    logger.error("Error in endStreamingSession:", err);
    next(err);
  }
};

// Stream audio directly without saving to file
exports.streamAudio = async (req, res, next) => {
  try {
    const { text, voiceId } = req.body;

    if (!text) {
      return res.status(400).json(error("Text is required", 400));
    }

    // Generate audio file from text
    const audioBuffer = await elevenlabsService.textToSpeech(text, voiceId);

    // Set response headers for audio streaming
    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": audioBuffer.length,
    });

    // Send the audio buffer directly
    res.send(audioBuffer);
  } catch (err) {
    logger.error("Error in streamAudio:", err);
    next(err);
  }
};
