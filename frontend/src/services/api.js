// Base URL for API calls
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// Helper function for fetch with error handling
async function fetchWithErrorHandling(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `API request failed with status ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
}

// Send message to the language tutor backend
export async function sendMessage(text) {
  return fetchWithErrorHandling(`${API_BASE_URL}/chat`, {
    method: "POST",
    body: JSON.stringify({ message: text }),
  });
}

// Send audio to the backend
export async function sendAudio(audioBlob) {
  const formData = new FormData();
  formData.append("audio", audioBlob);

  try {
    const response = await fetch(`${API_BASE_URL}/audio`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `API request failed with status ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending audio:", error);
    throw error;
  }
}

// Get audio from ElevenLabs (through backend)
export async function getAudioFromText(text, voiceId) {
  return fetchWithErrorHandling(`${API_BASE_URL}/text-to-speech`, {
    method: "POST",
    body: JSON.stringify({ text, voiceId }),
  });
}
