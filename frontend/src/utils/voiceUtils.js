// Map of languages to recommended ElevenLabs voice IDs
// These are placeholder IDs and would need to be replaced with actual ElevenLabs voice IDs
export const languageVoiceMap = {
  English: "EXAVITQu4vr4xnSDxMaL", // Example voice ID
  Spanish: "D38z5RcWu1voky8WS1ja",
  French: "MF3mGyEYCl7XYWbV9V6O",
  German: "jBpfuIE2acCO8z3wKNLl",
  Italian: "XB0fDUnXU5powFXDhCwa",
  Portuguese: "Lz9zLmTaUnHhK1XewQLC",
  Japanese: "G9jEv5SCxc5RMNSsfZDk",
  Korean: "TxGEqnHWrfWFTfGW9XjX",
  Chinese: "zkKNibYUdoaNU2SH5hCp",
  Russian: "XQJxgJt4UuuUxMRwU96h",
};

// Get a recommended voice ID for a language
export const getRecommendedVoiceForLanguage = (language) => {
  return languageVoiceMap[language] || languageVoiceMap["English"]; // Default to English
};

// Format speech parameters for ElevenLabs
export const formatSpeechParams = (text, voiceId, settings = {}) => {
  return {
    text,
    voice_id: voiceId,
    model_id: settings.modelId || "eleven_multilingual_v2",
    voice_settings: {
      stability: settings.stability || 0.5,
      similarity_boost: settings.similarityBoost || 0.75,
      style: settings.style || 0.0,
      use_speaker_boost: settings.useSpeakerBoost !== false,
    },
  };
};
