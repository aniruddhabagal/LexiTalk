// services/livekitService.js
const { RoomServiceClient } = require("livekit-server-sdk");
const config = require("../config/default");
const livekitConfig = require("../config/livekit");
const logger = require("../utils/logger");

class LiveKitService {
  constructor() {
    this.roomService = new RoomServiceClient(
      config.livekitUrl,
      config.livekitApiKey,
      config.livekitApiSecret
    );
  }

  generateToken(roomName, participantName) {
    return livekitConfig.generateToken(roomName, participantName);
  }

  async createRoom(roomName) {
    try {
      const room = await this.roomService.createRoom({
        name: roomName,
        emptyTimeout: 5 * 60, // 5 minutes
        maxParticipants: 2,
      });
      return room;
    } catch (error) {
      logger.error("Error creating LiveKit room:", error);
      throw new Error("Failed to create streaming room");
    }
  }

  async endRoom(roomName) {
    try {
      await this.roomService.deleteRoom(roomName);
      return true;
    } catch (error) {
      logger.error("Error ending LiveKit room:", error);
      throw new Error("Failed to end streaming room");
    }
  }
}

module.exports = new LiveKitService();
