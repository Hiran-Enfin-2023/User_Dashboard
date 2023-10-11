import { Button, NativeSelect } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import MeetingPage from '../meetingPage/MeetingPage'
import "./JoinMeeting.css"
import { AiFillAudio, AiOutlineAudioMuted } from "react-icons/ai"
import { FaVideo, FaVideoSlash } from "react-icons/fa"
import { BsFillMicMuteFill } from "react-icons/bs"
import { HiMiniSpeakerWave } from "react-icons/hi2"
import { LuScreenShare } from "react-icons/lu"
import FormControl from '@mui/material/FormControl';
import { BiVideo } from "react-icons/bi"
import Select from "react-select"
import { useSelector } from 'react-redux'
import ProgressBar from 'react-bootstrap/ProgressBar';
import Swal from 'sweetalert2'

function JoinMeeting() {


    const user = useSelector(store => store.authentication.user)
    const videoRef = useRef(null)
    const audioRef = useRef(null)
    const volumeMeterEl = useRef(null)
    const [join, setJoin] = useState(false)
    const [stream, setStream] = useState() //for setting the stream
    const [audioEnable, setAudioEnable] = useState(true) //to enable and disable audio
    const [videoEnable, setVideoEnable] = useState(true); //to enable and disable video

    const [audioOut, setAudioOut] = useState([])
    const [audioIn, setAudioIn] = useState([])
    const [video, setVideo] = useState([])
    const [selectAudioInput, setSelectAudioInput] = useState([]) // to select audio input 
    const [selectAudioOut, setSelectAudioOut] = useState([]) // to select audio output 
    const [selectVideoInput, setSelectVideoInput] = useState([]) //for select video ;

    const [audioStream, setAudioStream] = useState(null);
    const [audioContext, setAudioContext] = useState(null);
    const [analyser, setAnalyser] = useState(null);
    const [volumeLevel, setVolumeLevel] = useState(0);



    const audioInputHandleChange = (e) => {
        setAudioIn([e])
    }

    const audioOutputHandleChange = (e) => {
        setAudioOut([e]);
    }

    const videoHandleChange = (e) => {
        setVideo([e]);
    }



    function handleError(error) {
        console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
    }

    const gotDevices = (info) => {

        info?.map((device) => {
            if (device.kind === "audioinput") {
                const options = {
                    value: device.deviceId,
                    label: device.label
                }
                setSelectAudioInput((items) => [...items, options])
            }
            if (device.kind === "audiooutput") {
                const options = {
                    value: device.deviceId,
                    label: device.label
                }
                setSelectAudioOut((items) => [...items, options])
            }

            if (device.kind === "videoinput") {
                const options = {
                    value: device.deviceId,
                    label: device.label
                }
                setSelectVideoInput((items) => [...items, options])
            }
        })
    }

    const getDeviceList = () => {
        navigator.mediaDevices.enumerateDevices().then().then(gotDevices).catch(handleError)

    }


    // const getVideo = () => {
    //     console.log(audioIn,video);
    //     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
    //         setStream(stream)
    //         videoRef.current.srcObject = stream;

    //     })

    // }

    const gotStreams = async (stream) => {
        window.stream = stream;
        videoRef.current.srcObject = window.stream
        setStream(stream)
        const context = new AudioContext();
        const analyserNode = context.createAnalyser();
        const sourceNode = context.createMediaStreamSource(stream);

        analyserNode.fftSize = 256; // Adjust this for the desired accuracy
        sourceNode.connect(analyserNode);
        analyserNode.connect(context.destination);

        setAudioStream(stream);
        setAudioContext(context);
        setAnalyser(analyserNode);
    }


    const updateVolumeLevel = () => {
        if (analyser) {
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyser.getByteFrequencyData(dataArray);

            // Calculate the average volume level
            const sum = dataArray.reduce((acc, value) => acc + value, 0);
            const avgVolume = sum / bufferLength;

            setVolumeLevel(avgVolume);
        }
    };


    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(gotStreams)
    }


    //@video ON & OFF
    const toggelVideo = () => {
        stream.getTracks().forEach((track) => {
            if (track.kind === "video") {
                track.enabled = !track.enabled;
                setVideoEnable(prev => !prev)

            }
        })
    }

    //@ audio btn ON & OFF
    const toggleAudio = () => {
        stream.getTracks().forEach((track) => {
            if (track.kind === "audio") {
                track.enabled = !track.enabled;
                setAudioEnable(prev => !prev)
            }
        })
    }


    //@desc presenting the screen
    const presentScreen = () => {
        const options = { audio: false, video: true, cursor: true };

        navigator.mediaDevices.getDisplayMedia(options).then().catch(handleError)
    }


    const joinMeeting = ()=>{
        if(audioIn && audioOut && video === 0){
            Swal.fire({
                
                text: 'Please select device to continue',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        }else{
            setJoin(!join)
        }
    }

    useEffect(() => {
        getVideo();
        getDeviceList();
    }, [])

    useEffect(() => {

        if (audioContext && analyser) {
            const intervalId = setInterval(() => {
                updateVolumeLevel();
            }, 10); 
        }


    }, [audioContext, analyser]);


    return (
        <div>
            {
                join ? (<MeetingPage />) : (
                    <div className="video__main">

                        <div className="video-wrapper">

                            <div className="video_container">


                                <div className="video-div">

                                    <video className='video-view' ref={videoRef} autoPlay src="" />

                                    <div className="join__user__name">
                                        <h6>{user?.name}</h6>
                                    </div>

                                    <div className="audio-meter w-25">

                                        <ProgressBar style={{ height: "5px" }} ref={volumeMeterEl} now={volumeLevel} variant="success" />


                                    </div>

                                    <div className="audio-video-btn">
                                        <Button className='audio-btn audio-clx-btn' onClick={toggleAudio} >
                                            {
                                                audioEnable ?
                                                    <AiFillAudio className='audio-btn-icon' /> :

                                                    <BsFillMicMuteFill className='audio-btn-icon' />
                                            }

                                        </Button>

                                        <Button className='video-btn video-clx-btn' onClick={toggelVideo}  >
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
                                    <div className="join-btn-div d-flex">
                                        <Button onClick={joinMeeting} style={{ margin: "15px", backgroundColor: "#6200ee", color: "white", padding: "15px", borderRadius: "25px" }} >
                                            Join Now
                                        </Button>
                                        <Button onClick={presentScreen} style={{ margin: "15px", border: ".5px solid lightblue", borderRadius: "25px", display: "flex", justifyContent: "space-between" }}>
                                            <LuScreenShare className='mr-2' />
                                            Present
                                        </Button>
                                    </div>


                                </div>
                            </div>

                            {/* -------------------------------------------- */}

                            <div className="setting-audio-video">

                                <div className="select-audio">
                                    <div className="audio-select ml-2">
                                        <AiFillAudio className='audio-btn-icon' />
                                    </div>
                                    <div className='ml-4'>
                                        <Select options={selectAudioInput} value={audioIn} onChange={audioInputHandleChange} id='selector' />
                                    </div>
                                </div>
                                <div className="select-speaker">
                                    <div className="speaker-select ml-2">
                                        <HiMiniSpeakerWave />
                                    </div>
                                    <div className='ml-4'>
                                        <Select options={selectAudioOut} value={audioOut} onChange={audioOutputHandleChange} id='selector' />
                                    </div>
                                </div>
                                <div className="select-video">
                                    <div className="video-select ml-2">
                                        <BiVideo />
                                    </div>
                                    <div className='ml-4'>
                                        <Select options={selectVideoInput} value={video} onChange={videoHandleChange} id='selector' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default JoinMeeting