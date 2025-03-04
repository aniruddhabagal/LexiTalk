import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useChat } from "../../hooks/useChat";
import { getRecommendedVoiceForLanguage } from "../../utils/voiceUtils";
import "./Chat.css";

const Chat = ({ settings }) => {
  const { messages, isLoading, error, clearChat } = useChat();

  // When language changes, we might want to reset the chat
  useEffect(() => {
    // You could uncomment this if you want to clear chat when language changes
    // clearChat();

    // Add welcome message based on selected language
    const welcomeMessages = {
      English:
        "Hello! I'm your language tutor. How can I help you practice today?",
      Spanish:
        "¡Hola! Soy tu tutor de idiomas. ¿Cómo puedo ayudarte a practicar hoy?",
      French:
        "Bonjour! Je suis votre tuteur de langue. Comment puis-je vous aider à pratiquer aujourd'hui?",
      German:
        "Hallo! Ich bin dein Sprachtutor. Wie kann ich dir heute beim Üben helfen?",
      Italian:
        "Ciao! Sono il tuo tutor di lingua. Come posso aiutarti a esercitarti oggi?",
      Portuguese:
        "Olá! Eu sou seu tutor de idiomas. Como posso ajudá-lo a praticar hoje?",
      Japanese:
        "こんにちは！私はあなたの言語チューターです。今日はどのように練習をお手伝いできますか？",
      Korean:
        "안녕하세요! 저는 당신의 언어 튜터입니다. 오늘 어떻게 연습을 도와 드릴까요?",
      Chinese: "你好！我是你的语言导师。今天我能帮你练习什么？",
      Russian:
        "Привет! Я твой репетитор по языку. Как я могу помочь тебе попрактиковаться сегодня?",
    };

    // If chat is empty, add welcome message
    if (messages.length === 0) {
      const welcomeMessage =
        welcomeMessages[settings.language] || welcomeMessages["English"];
      // This can be enhanced to actually generate audio for the welcome message
      // using ElevenLabs, but for now, we'll just show text
      // addAIMessage(welcomeMessage);
    }
  }, [settings.language, messages.length, clearChat]);

  // Get voice ID for current language if not specifically set
  const getVoiceId = () => {
    if (settings.voiceId) {
      return settings.voiceId;
    }
    return getRecommendedVoiceForLanguage(settings.language);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat in {settings.language}</h2>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="chat-empty-state">
            <p>Start a conversation with your language tutor!</p>
            <p>You&apos;re currently learning {settings.language}</p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              voiceId={getVoiceId()}
            />
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

      <ChatInput language={settings.language} voiceId={getVoiceId()} />
    </div>
  );
};

export default Chat;
