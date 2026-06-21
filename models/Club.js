const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema({
  name: String,
  description: String,

  links: {
    telegram: String,
    linkedin: String,
    youtube: String,
    tiktok: String,
  },
});

module.exports = mongoose.model("Club", ClubSchema);