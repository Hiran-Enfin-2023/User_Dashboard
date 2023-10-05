import { Button, NativeSelect } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import MeetingPage from '../meetingPage/MeetingPage'
import "./JoinMeeting.css"
import { AiFillAudio, AiOutlineAudioMuted } from "react-icons/ai"
import { FaVideo, FaVideoSlash } from "react-icons/fa"
import { BsFillMicMuteFill } from "react-icons/bs"

import FormControl from '@mui/material/FormControl';

function JoinMeeting() {
    const videoRef = useRef(null)
    const [join, setJoin] = useState(false)
    const [stream, setStream] = useState()
    const [audioEnable, setAudioEnable] = useState(true)
    const [videoEnable, setVideoEnable] = useState(true);
    const [audioInput, setAudioInput] = useState('')

    const audioHandleChange = (e) => {
        setAudioInput(e.target.value)
    }


    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream)
            videoRef.current.srcObject = stream
        }).catch((err) => {
            console.log(err);
        })
    }


    const toggelVideo = () => {
        // console.log(stream.getTracks());
        stream.getTracks().forEach((track) => {
            if (track.kind === "video") {
                track.enabled = !track.enabled;
                setVideoEnable(prev => !prev)

            }
        })
    }

    const toggleAudio = () => {
        stream.getTracks().forEach((track) => {
            if (track.kind === "audio") {
                track.enable = !track.enabled;
                setAudioEnable(prev => !prev)
            }
        })
    }
    useEffect(() => {
        getVideo()
    }, []);


    return (
        <div>
            {
                join ? (<MeetingPage />) : (
                    <div className="video__main">

                        <div className="video-wrapper">

                            <div className="video_container">

                                <div className="video-div">

                                    <video className='video-view' ref={videoRef} autoPlay src="" />


                                    <div className="audio-video-btn">
                                        <Button className='audio-btn' onClick={toggleAudio} >
                                            {
                                                audioEnable ?
                                                    <AiFillAudio className='audio-btn-icon' /> :

                                                    <BsFillMicMuteFill className='audio-btn-icon' />
                                            }

                                        </Button>

                                        <Button className='video-btn' onClick={toggelVideo}  >
                                            {
                                                videoEnable ?
                                                    <FaVideo className='video-btn-icon' /> : <FaVideoSlash className='video-btn-icon' />
                                            }
                                        </Button>
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} className="join-div">

                                    <div className="ready-to-join-div mb-3">
                                        <h2 style={{ color: "black" }}>Ready to Join?</h2>

                                    </div>
                                    <div className="join-btn-div">
                                        <Button style={{ backgroundColor: "#6200ee", color: "white", padding: "15px", borderRadius: "25px" }} onClick={() => setJoin(!join)}>
                                            Join Now
                                        </Button>
                                    </div>


                                </div>
                            </div>

                            {/* -------------------------------------------- */}

                            <div className="setting-audio-video">

                                <div className="select-audio">
                                    <div className="audio-select ml-4">
                                        <AiFillAudio className='audio-btn-icon' />
                                    </div>
                                    <FormControl className='ml-4' fullWidth>
                                        <NativeSelect
                                            defaultValue={"Default"}
                                            style={{textDecoration: 'none'}}
                                            inputProps={{
                                                name: 'mic',
                                                id: 'uncontrolled-native',
                                            }}
                                        >
                                            <option value={10}>Default</option>
                                            <option value={20}>Twenty</option>
                                            <option value={30}>Thirty</option>
                                        </NativeSelect>
                                    </FormControl>
                                </div>
                                <div className="select-speaker">
                                    <FormControl fullWidth>
                                        <NativeSelect
                                            defaultValue={"Default"}
                                            inputProps={{
                                                name: 'mic',
                                                id: 'uncontrolled-native',
                                            }}
                                        >
                                            <option value={10}>Default</option>
                                            <option value={20}>Twenty</option>
                                            <option value={30}>Thirty</option>
                                        </NativeSelect>
                                    </FormControl>
                                </div>
                                <div className="select-video">
                                    <FormControl fullWidth>
                                        <NativeSelect
                                            defaultValue={"Default"}
                                            inputProps={{
                                                name: 'mic',
                                                id: 'uncontrolled-native',
                                            }}
                                        >
                                            <option value={10}>Default</option>
                                            <option value={20}>Twenty</option>
                                            <option value={30}>Thirty</option>
                                        </NativeSelect>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default JoinMeeting