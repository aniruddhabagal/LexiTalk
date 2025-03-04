import React, { useState, useCallback } from "react";
import { useChat } from "../../hooks/useChat";
import { useAudio } from "../../hooks/useAudio";
import { sendAudio } from "../../services/api";
import "./ChatInput.css";

const ChatInput = () => {
  const [inputText, setInputText] = useState("");
  const { sendMessage, isLoading } = useChat();
  const { isRecording, startRecording, stopRecording, audioBlob } = useAudio();

  const handleSubmitText = useCallback(
    async (e) => {
      e.preventDefault();

      if (!inputText.trim() || isLoading) return;

      try {
        await sendMessage(inputText);
        setInputText("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
    [inputText, isLoading, sendMessage]
  );

  const handleSubmitAudio = useCallback(async () => {
    if (!audioBlob || isLoading) return;

    try {
      const response = await sendAudio(audioBlob);
      await sendMessage(response.text);
    } catch (error) {
      console.error("Error sending audio:", error);
    }
  }, [audioBlob, isLoading, sendMessage]);

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

  return (
    <div className="chat-input-container">
      <form onSubmit={handleSubmitText} className="chat-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
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
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
};

export default ChatInput;
