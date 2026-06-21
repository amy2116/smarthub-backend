const express = require("express");
const router = express.Router();

const channels = [
  {
    id: "general",
    name: "General Discussion",
  },
  {
    id: "programming",
    name: "Programming Help",
  },
  {
    id: "academic",
    name: "Academic Help",
  },
  {
    id: "events",
    name: "Campus Events",
  },
  {
    id: "lostfound",
    name: "Lost & Found",
  },
];

router.get("/", (req, res) => {
  res.json(channels);
});

module.exports = router;