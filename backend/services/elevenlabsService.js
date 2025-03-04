// services/elevenlabsService.js
const axios = require("axios");
const config = require("../config/default");
const logger = require("../utils/logger");

class ElevenLabsService {
  constructor() {
    this.apiKey = config.elevenLabsApiKey;
    this.baseUrl = "https://api.elevenlabs.io/v1";
    this.voiceId = "EXAVITQu4vr4xnSDxMaL"; // Default voice ID, can be configurable
  }

  async textToSpeech(text, voiceId = this.voiceId) {
    try {
      const response = await axios({
        method: "post",
        url: `${this.baseUrl}/text-to-speech/${voiceId}`,
        data: {
          text,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        },
        headers: {
          Accept: "audio/mpeg",
          "xi-api-key": this.apiKey,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      });

      return response.data;
    } catch (error) {
      logger.error("Error generating speech:", error);
      throw new Error("Failed to generate speech from text");
    }
  }

  async getVoices() {
    try {
      const response = await axios.get(`${this.baseUrl}/voices`, {
        headers: {
          "xi-api-key": this.apiKey,
        },
      });
      return response.data.voices;
    } catch (error) {
      logger.error("Error fetching voices:", error);
      throw new Error("Failed to fetch available voices");
    }
  }
}

module.exports = new ElevenLabsService();
