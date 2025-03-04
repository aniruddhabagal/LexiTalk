import React, { useState } from "react";
import { ChatProvider } from "./context/ChatContext";
import { AudioProvider } from "./context/AudioContext";
import Chat from "./components/Chat/Chat";
import Settings from "./components/Settings/Settings";
import "./App.css";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    voiceId: "",
    language: "English",
  });

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    setShowSettings(false);
  };

  return (
    <ChatProvider>
      <AudioProvider>
        <div className="app-container">
          <header className="app-header">
            <h1>Language Tutor</h1>
            <button
              className="settings-button"
              onClick={() => setShowSettings(true)}
            >
              Settings
            </button>
          </header>

          <main className="app-main">
            <Chat settings={settings} />
          </main>

          {showSettings && (
            <Settings
              onClose={() => setShowSettings(false)}
              onSave={handleSaveSettings}
            />
          )}
        </div>
      </AudioProvider>
    </ChatProvider>
  );
}

export default App;
