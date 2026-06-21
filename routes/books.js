const express = require("express");
const router = express.Router();

const Book = require("../models/Book");

router.get("/", async (req, res) => {
  const books = await Book.find();

  res.json(books);
});


router.post("/", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    fileUrl: req.body.fileUrl, // IMPORTANT
  });

  await book.save();
  res.json(book);
});

module.exports = router;