import React, { useEffect, useState } from 'react'
import ChatBox from '../../components/chatBox/ChatBox'
import { useParams } from 'react-router-dom'
import io from "socket.io-client";
import axiosInstance from '../../axios';

function MeetingPage() {


    const socket = io.connect("http://localhost:3001")

    const slug = useParams();

    const [user, setUser] = useState();
    const currentUser = async () => {
        const res = await axiosInstance.get("/auth/validate_user");
        setUser(res.data.name)
    }

    const joinRoom = () => {
        console.log(slug.slug);
        socket.emit("join_room", slug.slug)
    }


    useEffect(() => {
        currentUser()
        joinRoom()
    }, [])

    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <div style={{ height: "100%", width: "100%", display: "flex", backgroundColor: "#101010" }} >
                {/* <div style={{ width: "75%", backgroundColor: "white", margin: "10px", borderRadius: "15px" }} className="meeting__area">
                    Video
                </div> */}
                <div style={{  backgroundColor: "white", margin: "10px 10px 10px 1px", borderRadius: "15px" }} className="message__area">
                    <ChatBox socket={socket} room={slug} user={user} />
                </div>
            </div>
        </div>
    )
}

export default MeetingPage