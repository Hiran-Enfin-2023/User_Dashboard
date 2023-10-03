const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
require("dotenv").config();
const cookieParse = require("cookie-parser");
const connectToDB = require("./config/db");
const authRouter = require("./router/userRoute");
const meetingRouter = require("./router/meetingRoute");
const cors = require("cors");

app.use(cors());
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
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
