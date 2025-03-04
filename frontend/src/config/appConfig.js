// src/config/appConfig.js
export const APP_CONFIG = {
  APP_NAME: "Language Tutor",
  VERSION: "1.0.0",
  SUPPORTED_LANGUAGES: [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh", name: "Chinese" },
    { code: "ru", name: "Russian" },
  ],
  DEFAULT_LANGUAGE: "en",

  // LiveKit configuration
  LIVEKIT: {
    DEFAULT_ROOM_PREFIX: "language-tutor-",
    MAX_PARTICIPANTS: 2,
  },

  // ElevenLabs configuration
  ELEVENLABS: {
    DEFAULT_VOICE_MODEL: "eleven_multilingual_v2",
    DEFAULT_STABILITY: 0.5,
    DEFAULT_SIMILARITY_BOOST: 0.75,
  },

  // Feature flags
  FEATURES: {
    AUDIO_RECORDING: import.meta.env.VITE_ENABLE_AUDIO_RECORDING === "true",
    LIVE_STREAMING: import.meta.env.VITE_ENABLE_LIVE_STREAMING === "true",
  },
};

export const getLanguageByCode = (code) => {
  return (
    APP_CONFIG.SUPPORTED_LANGUAGES.find((lang) => lang.code === code)?.name ||
    APP_CONFIG.DEFAULT_LANGUAGE
  );
};
