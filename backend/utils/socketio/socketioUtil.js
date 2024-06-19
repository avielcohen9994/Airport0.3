const express = require('express');
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconncted", socket.id);
  });
});

module.exports = { app, io, server };



// const getIo = () => {
//   if (!io) {
//   throw new Error('socket not initialized');
// }
// return io
// };

// const setupSocketIo = (server) => {
// io.on('connection', (socket) => {
//     console.log('user connected', socket.id)
//  socket.on('disconnect', () => {
//     console.log('user disconncted', socket.id)
//  })
// })
// }

