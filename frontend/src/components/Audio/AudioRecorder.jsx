import React from "react";
import { useAudio } from "../../hooks/useAudio";
import "./AudioRecorder.css";

const AudioRecorder = () => {
  const { isRecording, startRecording, stopRecording } = useAudio();

  const handleRecordToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="audio-recorder">
      <button
        className={`record-button ${isRecording ? "recording" : ""}`}
        onClick={handleRecordToggle}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      {isRecording && <div className="recording-indicator">Recording...</div>}
    </div>
  );
};

export default AudioRecorder;
