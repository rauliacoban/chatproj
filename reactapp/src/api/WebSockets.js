export default function getChatSocket(
  roomName,
  user,
  code
) {
  const chatSocket = new WebSocket(
    "ws://" +
      window.location.host +
      "/chat/ws/chat/" +
      roomName +
      "/" +
      user +
      "/" +
      code +
      "/"
  );
  return chatSocket;
}
