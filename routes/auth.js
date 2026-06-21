const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Auth route working");
});
/* REGISTER */

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    console.log("Register request:", req.body);

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      console.log("Username already exists");
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    console.log("User saved");

    res.status(201).json({

    message:"Registered Successfully"

    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/* LOGIN */

router.post("/login", async (req, res) => {
  try {
    const { username, password } =
      req.body;

    const user =
      await User.findOne({username: username });

    if (!user) {
      return res
        .status(400)
        .json({
          message: "User not found",
        });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res
        .status(400)
        .json({
          message: "Wrong Password",
        });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      "smarthubsecret"
    );

    res.json({
      token,
      user,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;