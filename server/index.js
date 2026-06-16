const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running");
});
//const Message = require("./models/Message");
//mongoose.connect(
 // "YOUR_MONGODB_CONNECTION_STRING")
//.then(() => console.log("MongoDB Connected"))
//.catch((err) => console.log(err));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  let currentRoom = "";

  socket.on("join_room", (room) => {
    if (currentRoom) {
      socket.leave(currentRoom);
    }
console.log("🚀 Joined room:", room);
    currentRoom = room;
    socket.join(room);

    console.log(`${socket.id} joined ${room}`);
  });

  socket.on("send_message", (data) => {
console.log("📩 Message:", data);
  //await Message.create({
    //username: data.username,
    //room: data.room,
    //message: data.message,
    //time: data.time
  //});

  io.to(data.room).emit("receive_message", data);
});

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server running on port 3001");
});