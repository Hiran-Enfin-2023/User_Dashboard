const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
require("dotenv").config();
const cors = require("cors");
const cookieParse = require("cookie-parser");
const connectToDB = require("./config/db");
const authRouter = require("./router/userRoute");
const http = require("http");
const meetingRouter = require("./router/meetingRoute");
const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/redis-adapter");
const { createClient } = require("redis");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});


app.use(express.json());
app.use(cookieParse());
connectToDB();

app.use("/api/auth/", authRouter);
app.use("/api/meeting/", meetingRouter);
app.use("/uploads", express.static("./uploads"))
app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room.slug).emit("receive_message", data);
    console.log(data.room.slug);
  });

  socket.on("is typing", (data) => {
    console.log(data);
    socket.broadcast.emit("typing", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});


server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
