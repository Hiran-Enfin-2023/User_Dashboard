const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io")

const server = http.createServer(app);
app.use(cors());

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
});


io.on("connection",(socket)=>{
    console.log(`user connected ${socket.id}`);

    socket.on("join_room",(data)=>{
        socket.join(data)
        console.log(`user with socket ID ${socket.id} joined the room data: ${data}`);
    })

    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data)
    })
    socket.on("disconnected",()=>{
        console.log(`user disconnected ${socket.id}`);
    })
})

server.listen(5001,()=>{
    console.log(`Socket server connected to port 5001`);
})