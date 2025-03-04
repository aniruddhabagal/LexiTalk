import React from "react";
import { ChatProvider } from "./context/ChatContext";
import { AudioProvider } from "./context/AudioContext";
// import Chat from "./components/Chat/Chat";
import "./App.css";

function App() {
  return (
    <ChatProvider>
      <AudioProvider>
        <div className="app-container">
          <header className="app-header">
            <h1>Language Tutor</h1>
          </header>
          <main className="app-main">{/* <Chat /> */}</main>
        </div>
      </AudioProvider>
    </ChatProvider>
  );
}

export default App;
