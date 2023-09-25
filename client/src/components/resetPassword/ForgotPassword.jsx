import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import {BsShieldLockFill} from "react-icons/bs"
import axiosInstance from '../../axios';

function ForgotPassword() {
    const [email, setEmail] = useState("")
    
    const setValue = (e) => {
        setEmail(e.target.value)
    }

    const forgottPassword = async()=>{
        try {
            const res = await axiosInstance.post("/auth/password/forgot/", {
                email
            })

            if(res.data.success){
                alert("Reset mail send")
            }
        } catch (error) {
            console.log(error);
        }
        
    }



    return (
        <div className='d-flex justify-content-center pt-5 bg-light'>
            <div style={{ width: "400px",  boxShadow:"0px 0px 20px 1px #959595", marginTop:"40px", padding: "10px" }} className="form d-flex justify-content-center">
                <Form style={{ width: "100%",textAlign: "center" }}>

                    <div className="logo">
                        <BsShieldLockFill style={{height:"100px",width:"70px"}}/>
                    </div>
                    <div className="title">

                        <h5>Troble with login</h5>
                    </div>
                    <div className="sub-title">
                        Enter Email address, and will send  <br /> you link to get bak into your account
                    </div>
                    <Form.Group style={{padding:"15px"}}>
                        <Form.Control onChange={setValue} name="email" value={email} placeholder='enter your email' />
                    </Form.Group>
                    <div style={{ width: "100%" }} className="btn ">

                        <Button onClick={forgottPassword} style={{ width: "100%", backgroundColor: "#1E90FF", color: "white" }}>Send Link</Button>
                    </div>

                    <div className='or mt-2'>
                        <div className="or-line d-flex justify-content-center">

                            <h6>Or</h6>

                        </div>
                        <div className="new-account">
                            <Button>
                                <Link to="/register">
                                    Create New Account
                                </Link>
                            </Button>
                        </div>

                        <hr style={{ backgroundColor: "black" }} />

                        <div className="back-to-login">
                            <Button>
                                <Link to="/login">
                                    Back to login
                                </Link>
                            </Button>
                        </div>
                    </div>

                </Form>
            </div>

        </div>
    )
}

export default ForgotPassword