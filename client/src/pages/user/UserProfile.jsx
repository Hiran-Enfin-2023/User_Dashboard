import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { Button } from '@mui/material'
import Form from 'react-bootstrap/Form';

import "./UserProfile.css"
import axiosInstance from '../../axios';
import { IoLockClosed, IoMail } from 'react-icons/io5';
import { useDispatch, useSelector } from "react-redux"

import { validateUser } from '../../services/validateUser';
import { stillOnline } from '../../redux/auth/authSlice';
function UserProfile() {

    const dispatch = useDispatch()
    const userData = useSelector((store) => store.authentication)
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("")

    console.log("Line 16 profile", userData);
    const [data, setData] = useState([])
    const [id, setId] = useState("");





    const [inputValue, setInputValue] = useState({
        name: "",
        email: "",
        phoneNumber: ""
    })

    const setValue = (e) => {
        const { name, value } = e.target;

        setInputValue((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }    


    const activeUser = async () => {
        validateUser().then((res) => {
            setData(res)
            setId(res._id)
            dispatch(stillOnline(res))
        })
 

    }


    const onImageChange = (e) => {
        setImage(e.target.files[0])
        // console.log(e.target.files[0]);
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("user_image", image);
        const res = await axiosInstance.patch(`/auth/image_upload/${id}`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
        // console.log(res.data.finalData);
        dispatch(stillOnline(res.data.finalData))

    }


    const updateProfile = async () => {
        const { name, email, phoneNumber } = inputValue;
        const res = await axiosInstance.put(`/auth/update/profile/${id}`, {
            name, email, phoneNumber
        });

        // console.log(res.data);
    }



    useEffect(() => {
        activeUser();


        if (image) {
            setPreview(URL.createObjectURL(image))
        }
    }, [image])
    return (
        <div>
            <div className="header mb-5">

                <Header />
            </div>

            <div className="profile__body mt-3 d-flex">
                <div style={{ height: "450px", width: "450px", border: "1px solid #DCDCDC", margin: "50px", borderRadius: "10px" }} className="profile">
                    <div style={{ borderBottom: "1px solid #DCDCDC", padding: "10px" }}>
                        <h5>Profile</h5>
                    </div>
                    <div style={{ padding: "20px 50px" }}>
                        <h5>Profile picture</h5>
                        <img style={{ height: "150px", width: "150px", borderRadius: "10px" }} src={preview ? preview : `http://localhost:5000/uploads/${data.imagePath}`} alt="" />

                        <div className="name-div mt-3">
                            <h5>{data.name}</h5>
                        </div>

                        <div className="btn-div mt-4 d-flex ">
                            <Form.Control name='file' filename={image} onChange={onImageChange} id='uploadBtn' type='file' style={{ width: "100%", color: "black", border: ".5px solid #DCDCDC" }} />
                        </div>
                    </div>
                    <div className="save-profile d-flex justify-content-center">
                        <Button style={{ border: "1px solid #DCDCDC", width: "70%", color: "black" }} onClick={onSubmit}>
                            Save
                        </Button>
                    </div>
                </div>
                <div className="email-password__delete-acc mt-3">
                    <div className="email__password" style={{ height: "350px", width: "450px", border: "1px solid #DCDCDC", margin: "35px 50px", borderRadius: "10px" }}>

                        <div style={{ borderBottom: "1px solid #DCDCDC", padding: "15px" }}>
                            <h6>Updata Profile</h6>
                        </div>
                        <div style={{ padding: "20px 20px" }} className="user-form ">
                            <Form>
                                <Form.Control onChange={setValue} name='name' value={inputValue.name} placeholder={data.name} />
                                <Form.Control onChange={setValue} name='email' value={inputValue.email} placeholder={data.email} className='mt-3' />
                                <Form.Control onChange={setValue} name='phoneNumber' value={inputValue.phoneNumber} placeholder={data.phoneNumber} className='mt-3' />
                            </Form>

                            <div className="email-password-btn mt-5">
                                <Button style={{ border: "1px solid #DCDCDC", }} onClick={updateProfile}>  Update</Button>

                            </div>
                        </div>
                    </div>
                    <div className="delete__acc">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile