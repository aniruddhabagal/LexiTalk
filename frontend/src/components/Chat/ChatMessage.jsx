import React, { useState, useEffect } from "react";
import { useAudio } from "../../hooks/useAudio";
import { textToSpeech } from "../../services/elevenlabs";
import "./ChatMessage.css";

const ChatMessage = ({ message, voiceId }) => {
  const { playAudio, isPlaying } = useAudio();
  const [audioUrl, setAudioUrl] = useState(message.audioUrl || null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);

  // Generate audio for AI messages if not already present
  useEffect(() => {
    const generateAudio = async () => {
      if (
        message.sender === "ai" &&
        !audioUrl &&
        !isGeneratingAudio &&
        voiceId
      ) {
        try {
          setIsGeneratingAudio(true);
          const result = await textToSpeech(message.text, voiceId);
          if (result && result.audioUrl) {
            setAudioUrl(result.audioUrl);
          }
        } catch (error) {
          console.error("Error generating audio:", error);
        } finally {
          setIsGeneratingAudio(false);
        }
      }
    };

    generateAudio();
  }, [message, audioUrl, isGeneratingAudio, voiceId]);

  const handlePlayAudio = () => {
    if (audioUrl) {
      playAudio(audioUrl);
    }
  };

  return (
    <div
      className={`chat-message ${
        message.sender === "user" ? "user-message" : "ai-message"
      }`}
    >
      <div className="message-content">
        <div className="message-text">{message.text}</div>

        {message.sender === "ai" && (
          <div className="message-audio">
            {isGeneratingAudio ? (
              <span className="generating-audio">Generating audio...</span>
            ) : audioUrl ? (
              <button
                className="play-audio-button"
                onClick={handlePlayAudio}
                disabled={isPlaying}
              >
                {isPlaying ? "Playing..." : "Play Audio"}
              </button>
            ) : (
              <span className="audio-error">Audio unavailable</span>
            )}
          </div>
        )}
      </div>

      <div className="message-timestamp">
        {new Date(message.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default ChatMessage;
