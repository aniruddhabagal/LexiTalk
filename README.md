# LexiTalk

## Overview

LexiTalk is a language tutor web application built using **Vite + React** for the frontend and **Express.js** for the backend. The app utilizes **LiveKit Cloud** for real-time audio streaming and **ElevenLabs** for text-to-speech conversion. An **LLM API** is integrated to generate language learning responses.

## Features

- **Real-time audio streaming** using LiveKit
- **Text-to-speech conversion** via ElevenLabs
- **Chat interaction** powered by an LLM
- **Audio recording and playback**
- **User authentication and session management**
- **Secure API with rate limiting and error handling**

---

## Tech Stack

### Frontend:

- React (Vite)
- React Router
- Context API / Hooks
- LiveKit SDK
- Tailwind CSS (for styling)

### Backend:

- Node.js + Express
- LiveKit Server SDK
- ElevenLabs API
- LLM Service (OpenAI / Anthropic / etc.)
- MongoDB / PostgreSQL (for user data)
- JWT Authentication

---

## Project Structure

### **Frontend**

```
src/
├── components/
│   ├── Chat/
│   │   ├── Chat.jsx
│   │   ├── ChatMessage.jsx
│   │   └── ChatInput.jsx
│   ├── Audio/
│   │   ├── AudioRecorder.jsx
│   │   └── AudioPlayer.jsx
│   └── LiveKit/
│       └── LiveKitProvider.jsx
├── services/
│   ├── api.js         # Backend API calls
│   ├── livekit.js     # LiveKit service functions
│   └── elevenlabs.js  # ElevenLabs integration
├── hooks/
│   ├── useChat.js
│   └── useAudio.js
├── context/
│   ├── ChatContext.jsx
│   └── AudioContext.jsx
├── App.jsx
└── main.jsx
```

### **Backend**

```
backend/
├── config/
│   ├── default.js     # Configuration variables
│   └── livekit.js     # LiveKit specific config
├── controllers/
│   ├── chatController.js
│   ├── audioController.js
│   └── userController.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── rateLimiter.js
├── routes/
│   ├── chatRoutes.js
│   ├── audioRoutes.js
│   └── userRoutes.js
├── services/
│   ├── llmService.js  # Integration with your chosen LLM
│   ├── elevenlabsService.js
│   └── livekitService.js
├── utils/
│   ├── logger.js
│   └── responseFormatter.js
├── app.js            # Express application setup
└── server.js         # Server entry point
```

---

## Installation & Setup

### Prerequisites

- Node.js & npm
- MongoDB / PostgreSQL (if using a database)
- LiveKit Cloud Account
- ElevenLabs API Key
- LLM API Key (OpenAI / Anthropic / etc.)

### **Backend Setup**

```sh
cd backend
npm install
cp .env.example .env # Add required API keys in .env
node server.js
```

### **Frontend Setup**

```sh
cd frontend
npm install
npm run dev
```

---

## API Endpoints

### **Auth Routes**

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | User login          |

### **Chat Routes**

| Method | Endpoint    | Description         |
| ------ | ----------- | ------------------- |
| POST   | `/api/chat` | Send message to LLM |

### **Audio Routes**

| Method | Endpoint            | Description                         |
| ------ | ------------------- | ----------------------------------- |
| POST   | `/api/audio/speak`  | Convert text to speech (ElevenLabs) |
| POST   | `/api/audio/stream` | Handle LiveKit audio streaming      |

---

## Contributing

Feel free to fork this repository and submit a pull request with improvements or bug fixes.

---

## License

This project is licensed under the MIT License.
