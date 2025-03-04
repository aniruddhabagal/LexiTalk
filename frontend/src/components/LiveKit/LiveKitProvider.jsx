import React, { useState, useEffect, useCallback } from "react";
import { createRoom, disconnectFromRoom } from "../../services/livekit";

// This component manages LiveKit room connection
const LiveKitProvider = ({ children, roomName, token }) => {
  const [room, setRoom] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  // Connect to LiveKit room
  const connectToRoom = useCallback(async () => {
    try {
      if (!roomName || !token) {
        throw new Error("Room name and token are required");
      }

      setError(null);
      const newRoom = await createRoom(roomName, token);

      setRoom(newRoom);
      setIsConnected(true);
    } catch (err) {
      console.error("Error connecting to LiveKit room:", err);
      setError(err.message);
    }
  }, [roomName, token]);

  // Disconnect from LiveKit room
  const disconnect = useCallback(() => {
    if (room) {
      disconnectFromRoom(room);
      setRoom(null);
      setIsConnected(false);
    }
  }, [room]);

  // Connect to room when component mounts or when room name/token changes
  useEffect(() => {
    if (roomName && token) {
      connectToRoom();
    }

    // Cleanup on unmount
    return () => {
      disconnect();
    };
  }, [roomName, token, connectToRoom, disconnect]);

  // Create context value
  const contextValue = {
    room,
    isConnected,
    error,
    connect: connectToRoom,
    disconnect,
  };

  return <div className="livekit-provider">{children(contextValue)}</div>;
};

export default LiveKitProvider;
