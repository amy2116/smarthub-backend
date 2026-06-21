const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: String,
  fileUrl: String, // link to uploaded PDF
});

module.exports = mongoose.model("Book", BookSchema);