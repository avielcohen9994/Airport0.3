const { io } = require("socket.io-client");

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected to server with ID: " + socket.id);
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});

module.exports = { socket };
