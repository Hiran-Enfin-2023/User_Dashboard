import React, { useEffect, useState } from 'react'
import ChatBox from '../../components/chatBox/ChatBox'
import { useParams } from 'react-router-dom'
import io from "socket.io-client";

function MeetingPage() {

    const socket = io.connect("http://localhost:5001")
    const slug = useParams();

    const [users, setUsers] = useState();
    const [room, setRoom] = useState(slug);

    const joinRoom = () => {
        if (room !== "") {
            socket.emit("join_room", slug)
        }
    }


    useEffect(() => {
        joinRoom()
    }, [])
    console.log(slug);
    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <div style={{ height: "100%", width: "100%", display: "flex", backgroundColor: "#101010" }} >
                <div style={{ width: "75%", backgroundColor: "white", margin: "15px", borderRadius: "15px" }} className="meeting__area">
                    Video
                </div>
                <div style={{ width: "25%", backgroundColor: "white", margin: "15px", borderRadius: "15px" }} className="message__area">
                    <ChatBox />
                </div>
            </div>
        </div>
    )
}

export default MeetingPage