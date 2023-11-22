export default function getChatSocket(
  roomName,
  user,
  code
) {
  console.log("\n     Creating new websocket! " + window.location.host + " " + roomName)
  const chatSocket = new WebSocket(
    "ws://" +
      window.location.host +
      "/chat/ws/group/" +
      roomName +
      "/"
  );
  return chatSocket;
}
