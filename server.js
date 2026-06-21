const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.use("/api/announcements", require("./routes/announcements"));
app.use("/api/clubs", require("./routes/clubs"));
app.use("/api/books", require("./routes/books"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/discussions", require("./routes/discussions"));
app.use("/books", express.static("uploads/books"));
app.use("/files", express.static("uploads"));

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Student Connected");

  socket.on("joinChannel", (channelId) => {
    socket.join(channelId);
  });

  socket.on("sendMessage", (data) => {
    io.to(data.channelId).emit(
      "receiveMessage",
      data
    );
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});