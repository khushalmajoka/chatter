const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatId: String,
    senderId: String,
    text: String,
  },
  {
    timestamps: true,
  }
);

const messageModel = new mongoose.model("message", messageSchema);

module.exports = messageModel;
