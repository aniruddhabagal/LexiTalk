import React, { useState, useCallback, useEffect } from "react";
import { useChat } from "../../hooks/useChat";
import { useAudio } from "../../hooks/useAudio";
import { sendAudio } from "../../services/api";
import "./ChatInput.css";

const ChatInput = ({ language, voiceId }) => {
  const [inputText, setInputText] = useState("");
  const { sendMessage, isLoading } = useChat();
  const { isRecording, startRecording, stopRecording, audioBlob } = useAudio();

  const handleSubmitText = useCallback(
    async (e) => {
      e && e.preventDefault();

      if (!inputText.trim() || isLoading) return;

      try {
        await sendMessage(inputText, { language, voiceId });
        setInputText("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
    [inputText, isLoading, sendMessage, language, voiceId]
  );

  const handleSubmitAudio = useCallback(async () => {
    if (!audioBlob || isLoading) return;

    try {
      const response = await sendAudio(audioBlob, language);

      // If backend recognizes speech, use that text
      if (response && response.text) {
        await sendMessage(response.text, { language, voiceId });
      }
    } catch (error) {
      console.error("Error sending audio:", error);
    }
  }, [audioBlob, isLoading, sendMessage, language, voiceId]);

  const handleRecordToggle = useCallback(() => {
    if (isRecording) {
      stopRecording();
      // Automatically send the audio when recording stops
      setTimeout(() => {
        handleSubmitAudio();
      }, 500); // Small delay to ensure the audioBlob is set
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording, handleSubmitAudio]);

  // Listen for Enter key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === "Enter" &&
        !e.shiftKey &&
        document.activeElement === document.querySelector(".chat-text-input")
      ) {
        handleSubmitText();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSubmitText]);

  return (
    <div className="chat-input-container">
      <div className="input-language-indicator">Speaking: {language}</div>

      <form onSubmit={handleSubmitText} className="chat-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Type in ${language}...`}
          disabled={isLoading || isRecording}
          className="chat-text-input"
        />

        <button
          type="submit"
          disabled={!inputText.trim() || isLoading || isRecording}
          className="send-button"
        >
          Send
        </button>
      </form>

      <button
        type="button"
        onClick={handleRecordToggle}
        disabled={isLoading}
        className={`record-button ${isRecording ? "recording" : ""}`}
      >
        {isRecording ? "Stop Recording" : "Start Speaking"}
      </button>
    </div>
  );
};

export default ChatInput;
