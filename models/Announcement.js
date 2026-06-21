const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema(
  {
    title: String,
    desc: String,

    category: {
      type: String, // e.g. "exam", "event", "general"
      default: "general",
    },

    campus: {
      type: String, // e.g. "Main Campus", "East Campus"
      default: "Main",
    },

    fileUrl: String, // uploaded file link (PDF/image)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", AnnouncementSchema);