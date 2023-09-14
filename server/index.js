const express = require("express");
const app = express();
const PORT = 4000;
require("dotenv").config()
const cookieParse = require("cookie-parser");
const connectToDB = require("./config/db");
const authRouter = require("./router/userRoute")
const cors = require("cors")


app.use(cors())
app.use(express.json());
app.use(cookieParse())
connectToDB()

app.use("/api/auth/", authRouter)
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
})