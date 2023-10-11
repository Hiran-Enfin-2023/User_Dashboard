import { Button } from '@mui/material';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import "./RejoinPage.css"
function RejoinPage() {
    const navigate = useNavigate();
    const params = useParams()



    console.log(params);


    const rejoin = () => {
        navigate(`/meeting/${params.slug}`)
    }

    const returnToHome = () => {
        navigate('/')
    }

    useEffect(()=>{
        setTimeout(()=>{
            returnToHome();
        },30000)
    })
    return (
        <div style={{ height: "100vh", backgroundColor: "white" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap:"15px", marginTop: "50px" }} className="wrapper">
                
                    <CountdownCircleTimer
                        className="timer"
                        isPlaying
                        size={50}
                        duration={30}
                        strokeWidth={5}
                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                        colorsTime={[30, 20, 10, 0]}>
5
                    </CountdownCircleTimer>
               

                <div style={{ display: "flex", gap: "10px" }} className="btns">
                    <Button style={{ border: "1px solid lightblue", padding: "10px" }} onClick={rejoin}>Rejoin</Button>
                    <Button style={{ backgroundColor: "#00BFFF", color: "white", padding: "10px" }} onClick={returnToHome}>Return to Home</Button>
                </div>
            </div>
        </div>
    )
}

export default RejoinPage