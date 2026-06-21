const express = require("express");
const router = express.Router();

const Club = require("../models/Club");

router.get("/", async (req, res) => {
  const clubs = await Club.find();

  res.json(clubs);
});

router.post("/", async (req, res) => {
  const newClub = new Club(req.body);

  await newClub.save();

  res.json(newClub);
});

module.exports = router;