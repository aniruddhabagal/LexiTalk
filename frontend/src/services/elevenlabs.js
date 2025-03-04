// This service will handle the frontend communication with ElevenLabs via our backend
// We'll make the actual API calls through our Express backend for security

// Base URL for API calls
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Get available voices from ElevenLabs
export const getVoices = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/elevenlabs/voices`);

    if (!response.ok) {
      throw new Error(`Failed to fetch voices: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching ElevenLabs voices:", error);
    throw error;
  }
};

// Convert text to speech using ElevenLabs
export const textToSpeech = async (text, voiceId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/elevenlabs/text-to-speech`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, voiceId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to convert text to speech: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error converting text to speech with ElevenLabs:", error);
    throw error;
  }
};

// Create a customized voice using ElevenLabs
export const createCustomVoice = async (name, files, description = "") => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    // Add audio files
    files.forEach((file, index) => {
      formData.append(`file_${index}`, file);
    });

    const response = await fetch(`${API_BASE_URL}/elevenlabs/voices`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to create custom voice: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating custom voice with ElevenLabs:", error);
    throw error;
  }
};
