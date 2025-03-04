import React from "react";
import { useAudio } from "../../hooks/useAudio";
import "./ChatMessage.css";

const ChatMessage = ({ message }) => {
  const { playAudio, isPlaying } = useAudio();

  const handlePlayAudio = () => {
    if (message.audioUrl) {
      playAudio(message.audioUrl);
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

        {message.sender === "ai" && message.audioUrl && (
          <button
            className="play-audio-button"
            onClick={handlePlayAudio}
            disabled={isPlaying}
          >
            {isPlaying ? "Playing..." : "Play Audio"}
          </button>
        )}
      </div>

      <div className="message-timestamp">
        {new Date(message.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default ChatMessage;
