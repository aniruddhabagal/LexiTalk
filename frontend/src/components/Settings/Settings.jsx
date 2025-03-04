import React, { useState, useEffect } from "react";
import { getVoices } from "../../services/elevenlabs";
import "./Settings.css";

const Settings = ({ onClose, onSave }) => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Available languages
  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Japanese",
    "Korean",
    "Chinese",
    "Russian",
  ];

  // Fetch available voices from ElevenLabs
  useEffect(() => {
    const fetchVoices = async () => {
      try {
        setLoading(true);
        setError(null);

        const voicesData = await getVoices();
        setVoices(voicesData.voices || []);

        // Set default voice if available
        if (voicesData.voices && voicesData.voices.length > 0) {
          setSelectedVoice(voicesData.voices[0].voice_id);
        }
      } catch (err) {
        setError("Failed to fetch voices. Please try again later.");
        console.error("Error fetching voices:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVoices();
  }, []);

  const handleSave = () => {
    onSave({
      voiceId: selectedVoice,
      language,
    });
    onClose();
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>Language Tutor Settings</h2>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="settings-content">
        {loading && <p className="loading-text">Loading voices...</p>}

        {error && <p className="error-text">{error}</p>}

        <div className="settings-group">
          <label htmlFor="language">Learning Language:</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <div className="settings-group">
          <label htmlFor="voice">Tutor Voice:</label>
          <select
            id="voice"
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            disabled={loading || voices.length === 0}
          >
            {voices.map((voice) => (
              <option key={voice.voice_id} value={voice.voice_id}>
                {voice.name}
              </option>
            ))}
          </select>
        </div>

        <div className="settings-buttons">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="save-button"
            onClick={handleSave}
            disabled={loading || !selectedVoice}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
