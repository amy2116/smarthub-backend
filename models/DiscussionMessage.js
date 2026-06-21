const mongoose = require("mongoose");

const DiscussionMessageSchema = new mongoose.Schema({
  channelId: {
    type: String,
    required: true,
  },

  studentName: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "DiscussionMessage",
  DiscussionMessageSchema
);