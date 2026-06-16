const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  username: String,
  room: String,
  message: String,
  time: String,
});

module.exports = mongoose.model("Message", MessageSchema);