import React, { createContext, useState, useEffect, useCallback } from "react";
import { sendMessage } from "../services/api";

// Create the context
export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add a new user message to the chat
  const addUserMessage = useCallback((text) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    return newMessage;
  }, []);

  // Add a new AI message to the chat
  const addAIMessage = useCallback((text, audioUrl = null) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender: "ai",
      timestamp: new Date().toISOString(),
      audioUrl,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    return newMessage;
  }, []);

  // Send message to backend and handle response
  const sendChatMessage = useCallback(
    async (text) => {
      try {
        setIsLoading(true);
        setError(null);

        // Add user message to chat
        addUserMessage(text);

        // Send to backend API
        const response = await sendMessage(text);

        // Add AI response to chat
        addAIMessage(response.text, response.audioUrl);

        return response;
      } catch (err) {
        setError(err.message || "Failed to send message");
        console.error("Error sending message:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [addUserMessage, addAIMessage]
  );

  // Clear all messages
  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        error,
        sendMessage: sendChatMessage,
        addUserMessage,
        addAIMessage,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
