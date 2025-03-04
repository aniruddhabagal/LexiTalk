import React, { createContext, useState, useCallback, useRef } from "react";

// Create the context
export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);
  const audioPlayerRef = useRef(new Audio());

  // Start recording audio
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioBlob(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  }, []);

  // Stop recording audio
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // Stop all audio tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    }
  }, [isRecording]);

  // Play audio from URL
  const playAudio = useCallback((url) => {
    const audio = audioPlayerRef.current;
    audio.src = url;
    audio.onplay = () => setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
    audio.onpause = () => setIsPlaying(false);
    audio.play();
  }, []);

  // Stop audio playback
  const stopAudio = useCallback(() => {
    const audio = audioPlayerRef.current;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isRecording,
        audioBlob,
        isPlaying,
        startRecording,
        stopRecording,
        playAudio,
        stopAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
