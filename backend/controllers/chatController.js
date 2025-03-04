// controllers/chatController.js
const llmService = require("../services/llmService");
const elevenlabsService = require("../services/elevenlabsService");
const { success, error } = require("../utils/responseFormatter");
const logger = require("../utils/logger");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Simple in-memory conversation history storage
// In production, this should be replaced with a database
const conversationHistory = {};

exports.sendMessage = async (req, res, next) => {
  try {
    const { userId, message, languageLevel, targetLanguage } = req.body;

    if (!userId || !message) {
      return res
        .status(400)
        .json(error("User ID and message are required", 400));
    }

    // Initialize conversation history if it doesn't exist
    if (!conversationHistory[userId]) {
      conversationHistory[userId] = [];
    }

    // Add user message to history
    conversationHistory[userId].push({ role: "user", content: message });

    // Create prompt for the language tutor based on user's proficiency level
    const prompt = createLanguageTutorPrompt(
      message,
      conversationHistory[userId],
      languageLevel,
      targetLanguage
    );

    // Get response from LLM
    const llmResponse = await llmService.generateResponse(prompt);

    // Add bot response to history (limit history to last 10 messages to avoid token limits)
    conversationHistory[userId].push({
      role: "assistant",
      content: llmResponse,
    });
    if (conversationHistory[userId].length > 10) {
      conversationHistory[userId] = conversationHistory[userId].slice(-10);
    }

    // Return the response
    res.status(200).json(
      success({
        response: llmResponse,
        conversationId: userId,
      })
    );
  } catch (err) {
    logger.error("Error in sendMessage:", err);
    next(err);
  }
};

exports.generateAudio = async (req, res, next) => {
  try {
    const { text, voiceId } = req.body;

    if (!text) {
      return res.status(400).json(error("Text is required", 400));
    }

    // Generate audio file from text
    const audioBuffer = await elevenlabsService.textToSpeech(text, voiceId);

    // Save audio to file (optional, you might want to stream directly to client)
    const fileName = `${uuidv4()}.mp3`;
    const filePath = path.join(__dirname, "../public/audio", fileName);

    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, audioBuffer);

    // Return the file URL
    const fileUrl = `/audio/${fileName}`;
    res.status(200).json(success({ audioUrl: fileUrl }));
  } catch (err) {
    logger.error("Error in generateAudio:", err);
    next(err);
  }
};

exports.getConversationHistory = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json(error("User ID is required", 400));
    }

    const history = conversationHistory[userId] || [];
    res.status(200).json(success({ history }));
  } catch (err) {
    logger.error("Error in getConversationHistory:", err);
    next(err);
  }
};

exports.clearConversation = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json(error("User ID is required", 400));
    }

    conversationHistory[userId] = [];
    res.status(200).json(success({ message: "Conversation history cleared" }));
  } catch (err) {
    logger.error("Error in clearConversation:", err);
    next(err);
  }
};

// Helper function to create prompts for the language tutor
function createLanguageTutorPrompt(
  message,
  history,
  languageLevel = "intermediate",
  targetLanguage = "English"
) {
  // Create a system prompt that guides the LLM to act as a language tutor
  const systemPrompt = `You are a helpful and encouraging language tutor for ${targetLanguage}. 
  The student's proficiency level is ${languageLevel}. 
  Respond to their messages in ${targetLanguage}, correcting any mistakes gently. 
  If they make errors, explain the correct usage briefly. 
  Adjust your vocabulary and grammar complexity to match their ${languageLevel} level. 
  Be encouraging and provide examples to help them learn.`;

  // Format conversation history
  const formattedHistory = history
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join("\n\n");

  return `${systemPrompt}\n\nConversation history:\n${formattedHistory}\n\nPlease respond to the latest message.`;
}
