import {
  Room,
  RoomEvent,
  LocalParticipant,
  RemoteParticipant,
  LocalTrackPublication,
  RemoteTrackPublication,
  Track,
} from "livekit-client";

// Create a new LiveKit room
export const createRoom = async (roomName, token) => {
  try {
    const room = new Room();

    // Connect to the LiveKit room
    await room.connect(import.meta.env.VITE_LIVEKIT_URL, token);
    console.log("Connected to LiveKit room:", roomName);

    return room;
  } catch (error) {
    console.error("Error connecting to LiveKit room:", error);
    throw error;
  }
};

// Publish local audio to the room
export const publishLocalAudio = async (room, audioTrack) => {
  try {
    if (!(room instanceof Room)) {
      throw new Error("Invalid room object");
    }

    const trackPublication = await room.localParticipant.publishTrack(
      audioTrack
    );
    return trackPublication;
  } catch (error) {
    console.error("Error publishing local audio:", error);
    throw error;
  }
};

// Create local audio track from user's microphone
export const createLocalAudioTrack = async () => {
  try {
    const audioTrack = await LocalParticipant.createAudioTrack({
      name: "microphone",
    });

    return audioTrack;
  } catch (error) {
    console.error("Error creating local audio track:", error);
    throw error;
  }
};

// Subscribe to remote participant's audio
export const subscribeToRemoteAudio = (
  room,
  participant,
  onTrackSubscribed
) => {
  if (!(room instanceof Room) || !(participant instanceof RemoteParticipant)) {
    throw new Error("Invalid room or participant object");
  }

  participant.on(
    RoomEvent.TrackSubscribed,
    (track, publication, participant) => {
      if (track.kind === Track.Kind.Audio) {
        onTrackSubscribed(track, publication, participant);
      }
    }
  );
};

// Disconnect from the LiveKit room
export const disconnectFromRoom = (room) => {
  if (room instanceof Room) {
    room.disconnect();
    console.log("Disconnected from LiveKit room");
  }
};
