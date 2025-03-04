// config/livekit.js
const { AccessToken } = require("livekit-server-sdk");
const config = require("./default");

function generateToken(roomName, participantName) {
  const at = new AccessToken(config.livekitApiKey, config.livekitApiSecret, {
    identity: participantName,
  });

  at.addGrant({ roomJoin: true, room: roomName });
  return at.toJwt();
}

module.exports = {
  generateToken,
};
