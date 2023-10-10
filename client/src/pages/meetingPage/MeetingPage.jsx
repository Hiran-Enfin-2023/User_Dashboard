import React, { useEffect, useState } from 'react'
import ChatBox from '../../components/chatBox/ChatBox'
import { useParams } from 'react-router-dom'
import io from "socket.io-client";
import axiosInstance from '../../axios';
import { Button } from '@mui/material';
import "./MeetingPage.css"
import { BsFillMicFill, BsHandbag, BsFillPeopleFill,BsFillChatLeftTextFill } from "react-icons/bs"
import { BiSolidVideo } from "react-icons/bi"
import { FaHandPaper } from "react-icons/fa"
import { ImPhoneHangUp } from "react-icons/im"
const socket = io.connect("http://localhost:5000", { transports: ["websocket"] })
function MeetingPage() {



    const slug = useParams();

    const [user, setUser] = useState();

    const [showParticipants, setShowParticipants] = useState();
    const [showChat, setShowChat] = useState(false);
    const currentUser = async () => {
        const res = await axiosInstance.get("/auth/validate_user");
        setUser(res.data.name)
    }

    const joinRoom = () => {
        // console.log(slug.slug);
        socket.emit("join_room", slug.slug)
    }


    useEffect(() => {
        currentUser()
        joinRoom()
    }, [])

    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <div style={{ height: "100%" }} className="meetingWrapper">
                <div style={{ height: "85%", width: "100%", display: "flex", backgroundColor: "#101010" }} >
                    <div style={{ flex: "3", backgroundColor: "white", margin: "15px", borderRadius: "15px" }} className="meeting__area">

                        <div className="video__call__container">
                            <div className="user1">
                                
                            </div>
                            <div className="user1">
                            
                            </div>
                            {/* <div className="user1">
                                R
                            </div>
                            <div className="user1">
                                R
                            </div>
                            <div className="user1">
                                R
                            </div> */}



                        </div>
                    </div>

                    {
                        showChat ? (
                            <div style={{ backgroundColor: "white", flex: "1", margin: "10px 10px 10px 1px", borderRadius: "15px" }} className="message__area">
                                <ChatBox socket={socket} room={slug} user={user} />
                            </div>
                        ) : (
                            null
                        ) ||

                            showParticipants ? (
                            <div style={{ backgroundColor: "white", flex: "1", margin: "10px 10px 10px 1px", borderRadius: "15px" }} className="message__area">
                                {/* <ChatBox socket={socket} room={slug} user={user} /> */}
                                Participants
                            </div>
                        ) : (
                            null
                        )

                    }

                </div>

                {/* footer  */}


                <div style={{ height: "15%", display:"flex" }} className="footer">
                    <div style={{gap:"10px"}} className="call-controls">
                        <Button style={{backgroundColor:"#696969", color:"white", borderRadius:"50%", height:"60px"}} className="control-btn">{<BsFillMicFill style={{height:"20px", width:"20px"}} />}</Button>
                        <Button style={{backgroundColor:"#696969", color:"white", borderRadius:"50%", height:"60px"}} className="control-btn">{<BiSolidVideo style={{height:"20px", width:"20px"}} />}</Button>
                        <Button style={{backgroundColor:"#696969", color:"yellow", borderRadius:"50%", height:"60px"}} className="control-btn">{<FaHandPaper style={{height:"20px", width:"20px"}} />}</Button>
                        <Button style={{backgroundColor:"#696969", color:"red", borderRadius:"50%", height:"60px"}} className="control-btn">{<ImPhoneHangUp style={{height:"30px", width:"40px"}} />}</Button>

                    </div>
                    <div className="controls">
                        <button style={{backgroundColor:"#696969", color:"red", borderRadius:"50%", border:"none", height:"40px", width:"40px"}} className='chat__btn' onClick={() => { setShowChat(!showChat) }}>
                            <BsFillChatLeftTextFill />
                        </button>
                        <button style={{backgroundColor:"#696969", color:"red", borderRadius:"50%", border:"none", height:"40px", width:"40px"}} className='participants__btn' onClick={() => { setShowParticipants(!showParticipants) }}>
                            <BsFillPeopleFill/>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MeetingPage