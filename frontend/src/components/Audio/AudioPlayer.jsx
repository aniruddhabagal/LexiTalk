import React from "react";
import { useAudio } from "../../hooks/useAudio";
import "./AudioPlayer.css";

const AudioPlayer = ({ audioUrl }) => {
  const { playAudio, stopAudio, isPlaying } = useAudio();

  const handlePlayToggle = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio(audioUrl);
    }
  };

  return (
    <div className="audio-player">
      <button
        className={`play-button ${isPlaying ? "playing" : ""}`}
        onClick={handlePlayToggle}
        disabled={!audioUrl}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default AudioPlayer;
