import React from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useChat } from "../../hooks/useChat";
import "./Chat.css";

const Chat = () => {
  const { messages, isLoading, error } = useChat();

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="chat-empty-state">
            <p>Start a conversation with your language tutor!</p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}

        {isLoading && (
          <div className="chat-loading">
            <p>Thinking...</p>
          </div>
        )}

        {error && (
          <div className="chat-error">
            <p>Error: {error}</p>
          </div>
        )}
      </div>

      <ChatInput />
    </div>
  );
};

export default Chat;
