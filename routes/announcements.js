const express = require("express");
const router = express.Router();
const multer = require("multer");
const Announcement = require("../models/Announcement");

/* ================= FILE STORAGE ================= */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/announcements/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ================= GET WITH FILTER ================= */
router.get("/", async (req, res) => {
  try {
    const { campus, category } = req.query;

    let filter = {};

    if (campus) filter.campus = campus;
    if (category) filter.category = category;

    const data = await Announcement.find(filter).sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= CREATE ANNOUNCEMENT WITH FILE ================= */
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const newAnnouncement = new Announcement({
      title: req.body.title,
      desc: req.body.desc,
      category: req.body.category,
      campus: req.body.campus,

      fileUrl: req.file
        ? `http://10.4.111.62:5000/files/announcements/${req.file.filename}`
        : null,
    });

    await newAnnouncement.save();
    res.json(newAnnouncement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;